import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { BatchPredictionResult } from "@/types/prediction";
import { CSVService } from "@/services/csvService";
import {
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface BatchPredictionResultsProps {
  results: BatchPredictionResult[];
  fileName: string;
}

export function BatchPredictionResults({
  results,
  fileName,
}: BatchPredictionResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Calculate statistics
  const stats = useMemo(() => {
    const total = results.length;
    const highRisk = results.filter(
      (r) => r.predictions.status === "high_risk",
    ).length;
    const mediumRisk = results.filter(
      (r) => r.predictions.status === "medium_risk",
    ).length;
    const lowRisk = results.filter(
      (r) => r.predictions.status === "low_risk",
    ).length;
    const avgProbability = Math.round(
      results.reduce((sum, r) => sum + r.predictions.migrationProbability, 0) /
        total,
    );
    const avgConfidence = Math.round(
      results.reduce((sum, r) => sum + r.predictions.confidenceScore, 0) /
        total,
    );

    return {
      total,
      highRisk,
      mediumRisk,
      lowRisk,
      avgProbability,
      avgConfidence,
    };
  }, [results]);

  // Filter and paginate results
  const filteredResults = useMemo(() => {
    let filtered = results;

    if (filterStatus) {
      filtered = filtered.filter((r) => r.predictions.status === filterStatus);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((r) =>
        JSON.stringify(r.inputData).toLowerCase().includes(term),
      );
    }

    return filtered;
  }, [results, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Chart data
  const statusDistribution = [
    { name: "High Risk", value: stats.highRisk, fill: "#ef4444" },
    { name: "Medium Risk", value: stats.mediumRisk, fill: "#f59e0b" },
    { name: "Low Risk", value: stats.lowRisk, fill: "#10b981" },
  ];

  const probabilityRanges = useMemo(() => {
    const ranges = [
      { range: "0-20%", count: 0 },
      { range: "20-40%", count: 0 },
      { range: "40-60%", count: 0 },
      { range: "60-80%", count: 0 },
      { range: "80-100%", count: 0 },
    ];

    results.forEach((r) => {
      const prob = r.predictions.migrationProbability;
      if (prob < 20) ranges[0].count++;
      else if (prob < 40) ranges[1].count++;
      else if (prob < 60) ranges[2].count++;
      else if (prob < 80) ranges[3].count++;
      else ranges[4].count++;
    });

    return ranges;
  }, [results]);

  const handleExportCSV = () => {
    const exportData = results.map((r) => ({
      ...r.inputData,
      migration_probability: r.predictions.migrationProbability,
      risk_score: r.predictions.riskScore,
      confidence_score: r.predictions.confidenceScore,
      status: r.predictions.status,
    }));
    CSVService.exportToCSV(exportData, `predictions_${Date.now()}.csv`);
  };

  const handleExportJSON = () => {
    CSVService.exportToJSON(results, `predictions_${Date.now()}.json`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high_risk":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      case "medium_risk":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "low_risk":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold">Batch Prediction Results</h2>
        <p className="text-muted-foreground">
          File: <span className="font-semibold text-accent">{fileName}</span>
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-5 gap-4"
      >
        {[
          {
            label: "Total Records",
            value: stats.total,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "High Risk",
            value: stats.highRisk,
            color: "from-red-500 to-pink-500",
          },
          {
            label: "Medium Risk",
            value: stats.mediumRisk,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "Low Risk",
            value: stats.lowRisk,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Avg Migration %",
            value: stats.avgProbability,
            color: "from-purple-500 to-pink-500",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card
              className={`p-4 border-border/30 bg-gradient-to-br ${stat.color} bg-opacity-5 backdrop-blur-sm`}
            >
              <p className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {stat.value}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="results" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/30">
          <TabsTrigger value="results">Results Table</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        {/* Results Table */}
        <TabsContent value="results" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Search and Filter */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search results..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {[null, "high_risk", "medium_risk", "low_risk"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {status ? status.replace("_", " ").toUpperCase() : "All"}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Table */}
            <Card className="border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/20 hover:bg-transparent">
                    <TableHead className="w-12">Row</TableHead>
                    <TableHead>Migration %</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Top Factor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedResults.map((result, idx) => (
                    <motion.tr
                      key={result.rowIndex}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className="border-border/20 hover:bg-secondary/20 transition-colors"
                    >
                      <TableCell className="font-medium text-muted-foreground">
                        {result.rowIndex + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                              style={{
                                width: `${result.predictions.migrationProbability}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-foreground w-12">
                            {result.predictions.migrationProbability}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {result.predictions.riskScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {result.predictions.confidenceScore}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(result.predictions.status)} border`}
                        >
                          {result.predictions.status === "high_risk"
                            ? "⚠️ High"
                            : result.predictions.status === "medium_risk"
                              ? "⚡ Medium"
                              : "✅ Low"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {result.predictions.topFactors[0]?.name}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredResults.length)}{" "}
                of {filteredResults.length} results
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 text-sm font-medium">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Risk Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Risk Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Probability Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Probability Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={probabilityRanges}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,0.8)",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Export */}
        <TabsContent value="export" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm space-y-4">
              <h3 className="font-semibold">Export Results</h3>
              <p className="text-sm text-muted-foreground">
                Download all predictions in your preferred format
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { label: "CSV", fn: handleExportCSV, icon: "📊" },
                  { label: "JSON", fn: handleExportJSON, icon: "📋" },
                  {
                    label: "Excel",
                    fn: () => handleExportCSV(),
                    icon: "📈",
                    disabled: true,
                  },
                ].map((format) => (
                  <Button
                    key={format.label}
                    onClick={format.fn}
                    disabled={format.disabled}
                    className="flex items-center gap-2 h-auto py-4"
                  >
                    <span>{format.icon}</span>
                    <div className="text-left">
                      <p className="font-semibold text-sm">{format.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {format.disabled ? "Coming soon" : "Download"}
                      </p>
                    </div>
                    {!format.disabled && (
                      <Download className="w-4 h-4 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
