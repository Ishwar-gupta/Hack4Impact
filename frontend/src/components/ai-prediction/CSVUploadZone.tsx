import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Upload, X, Check, AlertCircle } from "lucide-react";
import { CSVService } from "@/services/csvService";
import type { CSVValidationResult } from "@/types/prediction";

interface CSVUploadZoneProps {
  onFileSelect: (file: File) => void;
  onValidationResult: (result: CSVValidationResult) => void;
  isValidating?: boolean;
}

export function CSVUploadZone({
  onFileSelect,
  onValidationResult,
  isValidating = false,
}: CSVUploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] =
    useState<CSVValidationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const validateAndProcessFile = async (file: File) => {
    // Validate file type
    if (!file.name.endsWith(".csv")) {
      const result: CSVValidationResult = {
        isValid: false,
        errors: [
          {
            type: "encoding",
            message: "Invalid file type. Please upload a CSV file.",
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
      setValidationResult(result);
      onValidationResult(result);
      return;
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      const result: CSVValidationResult = {
        isValid: false,
        errors: [
          {
            type: "encoding",
            message: `File size exceeds 50MB limit. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
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
      setValidationResult(result);
      onValidationResult(result);
      return;
    }

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    try {
      const result = await CSVService.validateCSV(file);
      clearInterval(progressInterval);
      setUploadProgress(100);
      setSelectedFile(file);
      setValidationResult(result);
      onValidationResult(result);
      onFileSelect(file);
    } catch (error) {
      clearInterval(progressInterval);
      const result: CSVValidationResult = {
        isValid: false,
        errors: [
          {
            type: "encoding",
            message: `Error processing file: ${error instanceof Error ? error.message : "Unknown error"}`,
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
      setValidationResult(result);
      onValidationResult(result);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDrag(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadProgress(0);
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleReplaceFile = () => {
    setSelectedFile(null);
    setValidationResult(null);
    setUploadProgress(0);
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValidationResult(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {!selectedFile ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="relative"
        >
          <Card
            className={`relative border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
              ${
                isDragActive
                  ? "border-accent bg-accent/10 scale-105"
                  : "border-border/50 hover:border-accent/50 bg-card/40"
              }
            `}
          >
            {/* Animated background */}
            <div
              className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                isDragActive ? "opacity-10" : ""
              } bg-gradient-to-br from-blue-500 to-cyan-500 pointer-events-none`}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isValidating}
              className="relative w-full p-12 text-center space-y-4"
            >
              <motion.div
                animate={
                  isDragActive
                    ? { scale: 1.2, rotate: 5 }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Upload
                  className={`w-12 h-12 mx-auto transition-colors duration-300 ${
                    isDragActive ? "text-accent" : "text-muted-foreground"
                  }`}
                />
              </motion.div>

              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  {isDragActive
                    ? "Drop your CSV file here"
                    : isValidating
                      ? "Validating CSV file..."
                      : "Drag & drop CSV file"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or <span className="text-accent font-medium">browse</span> to
                  select
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Supported format: CSV • Max file size: 50MB
              </p>
            </button>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card className="border-border/30 bg-card/40 backdrop-blur-sm p-6 space-y-4">
            {/* File Info */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <Upload className="w-4 h-4 text-accent" />
                  {selectedFile.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={handleRemoveFile}
                className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Upload Progress */}
            {uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Processing file...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                </div>
              </div>
            )}

            {/* Validation Result */}
            {validationResult && (
              <AnimatePresence>
                {validationResult.isValid ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <p className="font-medium text-green-700">
                          CSV validation successful!
                        </p>
                        <div className="grid grid-cols-4 gap-3 text-sm text-muted-foreground mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Rows
                            </p>
                            <p className="font-semibold text-foreground">
                              {validationResult.stats.totalRows}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Columns
                            </p>
                            <p className="font-semibold text-foreground">
                              {validationResult.stats.totalColumns}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Missing Values
                            </p>
                            <p className="font-semibold text-foreground">
                              {validationResult.stats.missingValuesCells}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Duplicates
                            </p>
                            <p className="font-semibold text-foreground">
                              {validationResult.stats.duplicateRows}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <p className="font-medium text-red-700">
                          Validation failed
                        </p>
                        {validationResult.errors.map((error, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-muted-foreground"
                          >
                            • {error.message}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Warnings */}
                {validationResult.warnings.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 space-y-2"
                  >
                    <p className="font-medium text-yellow-700 text-sm">
                      Warnings:
                    </p>
                    {validationResult.warnings.map((warning, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        • {warning}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Actions */}
            {validationResult?.isValid && (
              <div className="flex gap-3 pt-4 border-t border-border/20">
                <button
                  onClick={handleReplaceFile}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  Choose Different File
                </button>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
