import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeSelector } from "@/components/ai-prediction/ModeSelector";
import { ManualPredictionForm } from "@/components/ai-prediction/ManualPredictionForm";
import { PredictionResultDashboard } from "@/components/ai-prediction/PredictionResultDashboard";
import { CSVUploadZone } from "@/components/ai-prediction/CSVUploadZone";
import { BatchPredictionResults } from "@/components/ai-prediction/BatchPredictionResults";
import { PredictionService } from "@/services/predictionService";
import { CSVService } from "@/services/csvService";
import type {
  ManualPredictionFormData,
  PredictionResult,
  CSVValidationResult,
  BatchPredictionResult,
} from "@/types/prediction";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader } from "lucide-react";

export function BrainDrainPrediction() {
  const [mode, setMode] = useState<"manual" | "batch" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [manualResult, setManualResult] = useState<PredictionResult | null>(
    null,
  );
  const [processingTime, setProcessingTime] = useState(0);
  const [error, setError] = useState<string>("");

  // Batch prediction states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] =
    useState<CSVValidationResult | null>(null);
  const [batchResults, setBatchResults] = useState<BatchPredictionResult[]>([]);
  const [batchProgress, setBatchProgress] = useState(0);
  const [totalBatchItems, setTotalBatchItems] = useState(0);
  const [abortSignal, setAbortSignal] = useState<AbortSignal | undefined>();

  const handleSelectMode = (selectedMode: "manual" | "batch") => {
    setMode(selectedMode);
    setManualResult(null);
    setBatchResults([]);
    setError("");
  };

  const handleBackToModeSelection = () => {
    setMode(null);
    setManualResult(null);
    setBatchResults([]);
    setSelectedFile(null);
    setValidationResult(null);
    setError("");
  };

  const handleManualPredictionSubmit = async (
    data: ManualPredictionFormData,
  ) => {
    setIsLoading(true);
    setError("");
    const startTime = performance.now();

    try {
      const result = await PredictionService.predictBrainDrain(data);
      const endTime = performance.now();
      setProcessingTime(Math.round(endTime - startTime));
      setManualResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleValidationResult = (result: CSVValidationResult) => {
    setValidationResult(result);
  };

  const handleStartBatchPrediction = async () => {
    if (!selectedFile || !validationResult?.isValid) {
      setError("Please upload and validate a CSV file first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { data: csvData } = await CSVService.parseCSV(selectedFile);
      setTotalBatchItems(csvData.length);
      setBatchProgress(0);

      const controller = new AbortController();
      setAbortSignal(controller.signal);

      const results = await PredictionService.predictBatch(
        csvData,
        (processed, _total) => {
          setBatchProgress(processed);
        },
        controller.signal,
      );

      setBatchResults(
        results.map((r, idx) => ({
          rowIndex: idx,
          predictions: r.prediction,
          inputData: csvData[idx],
        })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Batch prediction failed");
    } finally {
      setIsLoading(false);
      setAbortSignal(undefined);
    }
  };

  const handleCancelBatchPrediction = () => {
    if (abortSignal instanceof AbortController) {
      abortSignal.abort();
    }
    setIsLoading(false);
    setBatchProgress(0);
  };

  return (
    <div className="min-h-screen space-y-6 py-8">
      {/* Header with back button */}
      <AnimatePresence mode="wait">
        {mode && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handleBackToModeSelection}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Modes
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!mode ? (
          // Mode Selection
          <motion.div
            key="mode-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ModeSelector
              onSelectMode={handleSelectMode}
              selectedMode={mode || undefined}
            />
          </motion.div>
        ) : mode === "manual" && !manualResult ? (
          // Manual Prediction Form
          <motion.div
            key="manual-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">
                Manual Brain Drain Prediction
              </h2>
              <p className="text-muted-foreground">
                Fill in the form below with individual data to get a detailed
                migration risk assessment.
              </p>
            </div>
            <ManualPredictionForm
              onSubmit={handleManualPredictionSubmit}
              isLoading={isLoading}
              error={error}
            />
          </motion.div>
        ) : mode === "manual" && manualResult ? (
          // Manual Prediction Results
          <motion.div
            key="manual-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  Your Brain Drain Risk Assessment
                </h2>
                <p className="text-muted-foreground">
                  Detailed analysis based on your personal data
                </p>
              </div>
              <Button
                onClick={() => setManualResult(null)}
                variant="outline"
                className="gap-2"
              >
                New Prediction
              </Button>
            </div>
            <PredictionResultDashboard
              result={manualResult}
              processingTime={processingTime}
            />
          </motion.div>
        ) : mode === "batch" && batchResults.length === 0 ? (
          // Batch Upload and Configuration
          <motion.div
            key="batch-setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">CSV Batch Prediction</h2>
              <p className="text-muted-foreground">
                Upload a CSV file to predict brain drain risk for multiple
                individuals
              </p>
            </div>

            <CSVUploadZone
              onFileSelect={handleFileSelect}
              onValidationResult={handleValidationResult}
              isValidating={isLoading}
            />

            {/* Start Batch Prediction */}
            {validationResult?.isValid && selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-accent/30 space-y-4"
              >
                <p className="font-semibold text-foreground">
                  Ready to process {validationResult.stats.totalRows} records
                </p>
                <Button
                  onClick={handleStartBatchPrediction}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Processing Batch...
                    </>
                  ) : (
                    "🚀 Start Batch Prediction"
                  )}
                </Button>
              </motion.div>
            )}

            {/* Batch Progress */}
            {isLoading && totalBatchItems > 0 && (
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Processing Predictions</h3>
                    <span className="text-sm text-muted-foreground">
                      {batchProgress} / {totalBatchItems}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(batchProgress / totalBatchItems) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCancelBatchPrediction}
                  variant="outline"
                  className="w-full"
                >
                  Cancel Processing
                </Button>
              </Card>
            )}

            {error && (
              <Card className="p-4 border-destructive/30 bg-destructive/10 text-destructive">
                {error}
              </Card>
            )}
          </motion.div>
        ) : (
          // Batch Results
          <motion.div
            key="batch-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div></div>
              <Button
                onClick={handleBackToModeSelection}
                variant="outline"
                className="gap-2"
              >
                New Prediction
              </Button>
            </div>
            <BatchPredictionResults
              results={batchResults}
              fileName={selectedFile?.name || "predictions"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
