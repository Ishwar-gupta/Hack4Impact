import type {
  CSVValidationResult,
  ManualPredictionFormData,
} from "@/types/prediction";
import { PredictionService } from "./predictionService";

export class CSVService {
  /**
   * Parse CSV file and return data
   */
  static async parseCSV(file: File): Promise<{
    data: ManualPredictionFormData[];
    columns: string[];
    rowCount: number;
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          const lines = text.split("\n").filter((line) => line.trim());

          if (lines.length < 2) {
            reject(
              new Error(
                "CSV file must contain at least headers and one data row",
              ),
            );
            return;
          }

          // Parse header
          const headers = this.parseCSVLine(lines[0]);
          const data: ManualPredictionFormData[] = [];

          // Parse data rows
          for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            const row: ManualPredictionFormData = {};

            headers.forEach((header, index) => {
              let value: unknown = values[index] || null;

              // Type inference
              if (value !== null && value !== "") {
                const strValue = String(value);
                if (strValue.toLowerCase() === "true") value = true;
                else if (strValue.toLowerCase() === "false") value = false;
                else if (!isNaN(Number(strValue)) && strValue !== "")
                  value = Number(strValue);
              }

              row[header] = value;
            });

            data.push(row);
          }

          resolve({
            data,
            columns: headers,
            rowCount: data.length,
          });
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Validate CSV data against expected dataset fields
   */
  static async validateCSV(file: File): Promise<CSVValidationResult> {
    try {
      const { data, columns } = await this.parseCSV(file);
      const expectedFields = PredictionService.getDatasetFields();
      const expectedColumnNames = expectedFields.map((f) => f.name);

      const errors: CSVValidationResult["errors"] = [];
      const warnings: string[] = [];
      let missingValuesCells = 0;
      let duplicateRows = 0;

      // Check for missing columns
      const missingColumns = expectedColumnNames.filter(
        (col) => !columns.includes(col),
      );
      if (missingColumns.length > 0) {
        errors.push({
          type: "missing_column",
          message: `Missing required columns: ${missingColumns.join(", ")}`,
          details: missingColumns,
        });
      }

      // Check for extra columns
      const extraColumns = columns.filter(
        (col) => !expectedColumnNames.includes(col),
      );
      if (extraColumns.length > 0) {
        warnings.push(
          `Extra columns found and will be ignored: ${extraColumns.join(", ")}`,
        );
      }

      // Check data types and missing values
      const seenRows = new Set<string>();
      data.forEach((row, idx) => {
        const rowString = JSON.stringify(row);
        if (seenRows.has(rowString)) {
          duplicateRows++;
        } else {
          seenRows.add(rowString);
        }

        expectedFields.forEach((field) => {
          const value = row[field.name];

          if (value === null || value === "" || value === undefined) {
            if (field.required) {
              errors.push({
                type: "missing_values",
                message: `Missing required value for column "${field.name}" at row ${idx + 2}`,
              });
            }
            missingValuesCells++;
          } else {
            // Type validation
            switch (field.type) {
              case "number":
                if (isNaN(Number(value))) {
                  errors.push({
                    type: "data_type",
                    message: `Invalid number at row ${idx + 2}, column "${field.name}"`,
                  });
                } else if (
                  field.min !== undefined &&
                  Number(value) < field.min
                ) {
                  errors.push({
                    type: "data_type",
                    message: `Value below minimum (${field.min}) at row ${idx + 2}, column "${field.name}"`,
                  });
                } else if (
                  field.max !== undefined &&
                  Number(value) > field.max
                ) {
                  errors.push({
                    type: "data_type",
                    message: `Value above maximum (${field.max}) at row ${idx + 2}, column "${field.name}"`,
                  });
                }
                break;
              case "categorical":
              case "binary":
                if (field.options && !field.options.includes(String(value))) {
                  warnings.push(
                    `Unexpected categorical value "${value}" at row ${idx + 2}, column "${field.name}". Expected one of: ${field.options.join(", ")}`,
                  );
                }
                break;
              case "boolean":
                if (
                  value !== true &&
                  value !== false &&
                  value !== "true" &&
                  value !== "false"
                ) {
                  errors.push({
                    type: "data_type",
                    message: `Invalid boolean at row ${idx + 2}, column "${field.name}"`,
                  });
                }
                break;
              case "date":
                if (isNaN(Date.parse(String(value)))) {
                  errors.push({
                    type: "data_type",
                    message: `Invalid date format at row ${idx + 2}, column "${field.name}"`,
                  });
                }
                break;
            }
          }
        });
      });

      if (duplicateRows > 0) {
        warnings.push(`Found ${duplicateRows} duplicate rows`);
      }

      const isValid = errors.length === 0;

      return {
        isValid,
        errors,
        warnings,
        stats: {
          totalRows: data.length,
          totalColumns: columns.length,
          missingValuesCells,
          duplicateRows,
        },
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [
          {
            type: "encoding",
            message: `Failed to parse CSV: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        warnings: [],
        stats: {
          totalRows: 0,
          totalColumns: 0,
          missingValuesCells: 0,
          duplicateRows: 0,
        },
      };
    }
  }

  /**
   * Parse a single CSV line, handling quoted values
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }

  /**
   * Export predictions to CSV
   */
  static exportToCSV(data: any[], filename: string) {
    if (data.length === 0) {
      console.warn("No data to export");
      return;
    }

    // Get all keys from all objects
    const keys = Array.from(
      new Set(
        data.flatMap((obj) => {
          if (obj.inputData) return Object.keys(obj.inputData);
          if (obj.predictions) {
            return [
              "migrationProbability",
              "riskScore",
              "confidenceScore",
              "status",
              "topFactors",
            ];
          }
          return Object.keys(obj);
        }),
      ),
    );

    // Create CSV header
    const header = keys.join(",");

    // Create CSV rows
    const rows = data.map((obj) => {
      const row = keys.map((key) => {
        let value = obj[key] || "";
        if (obj.inputData && key in obj.inputData) {
          value = obj.inputData[key];
        } else if (obj.predictions && key in obj.predictions) {
          value = obj.predictions[key];
        }

        if (typeof value === "string" && value.includes(",")) {
          value = `"${value}"`;
        }
        return value;
      });
      return row.join(",");
    });

    const csv = [header, ...rows].join("\n");
    this.downloadFile(csv, filename, "text/csv");
  }

  /**
   * Export predictions to JSON
   */
  static exportToJSON(data: any[], filename: string) {
    const json = JSON.stringify(data, null, 2);
    this.downloadFile(json, filename, "application/json");
  }

  /**
   * Helper to download file
   */
  private static downloadFile(
    content: string,
    filename: string,
    mimeType: string,
  ) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
