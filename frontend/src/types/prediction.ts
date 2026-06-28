export type FieldType =
  | "number"
  | "text"
  | "categorical"
  | "boolean"
  | "date"
  | "binary"
  | "optional";

export type DatasetField = {
  name: string;
  type: FieldType | string;
  description?: string;
  options?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
  required: boolean;
};

export interface PredictionResult {
  migrationProbability: number;
  riskScore: number;
  confidenceScore: number;
  status: "high_risk" | "medium_risk" | "low_risk";
  topFactors: { name: string; importance: number }[];
  prediction: {
    summary: string;
    aiExplanation: string;
    governmentActions: string[];
    companyActions: string[];
    personalActions: string[];
  };
  featureContribution: { [key: string]: number };
  processingTime: number;
}

export interface BatchPredictionRequest {
  file: File;
  fileName: string;
  rowCount: number;
  columnCount: number;
}

export interface BatchPredictionResult {
  rowIndex: number;
  predictions: PredictionResult;
  inputData: { [key: string]: unknown };
}

export interface CSVValidationResult {
  isValid: boolean;
  errors: {
    type:
      | "missing_column"
      | "extra_column"
      | "data_type"
      | "missing_values"
      | "duplicate_rows"
      | "encoding";
    message: string;
    details?: unknown;
  }[];
  warnings: string[];
  stats: {
    totalRows: number;
    totalColumns: number;
    missingValuesCells: number;
    duplicateRows: number;
  };
}

export interface TalentInsightsData {
  nationalOverview: {
    totalTalent: number;
    atRiskCount: number;
    highDemandSkills: string[];
    avgEducationYears: number;
  };
  districtDistribution: { [district: string]: number };
  educationDistribution: { [education: string]: number };
  professionDistribution: { [profession: string]: number };
  migrationRiskSegmentation: {
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
  };
  skillGapAnalysis: { skill: string; demand: number; supply: number }[];
  employmentInsights: { [status: string]: number };
  migrationTrends: {
    month: string;
    migratedCount: number;
    atRiskCount: number;
  }[];
  governmentOpportunities: { type: string; count: number; impact: string }[];
  futureForecasts: {
    year: number;
    projectedMigration: number;
    skillDemand: number;
  }[];
  policyRecommendations: string[];
}

export interface ManualPredictionFormData {
  [key: string]: unknown;
}
