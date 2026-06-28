import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PredictionResult } from "@/types/prediction";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Trophy,
  Zap,
} from "lucide-react";

interface PredictionResultDashboardProps {
  result: PredictionResult;
  processingTime: number;
}

const statusColors = {
  high_risk: {
    bg: "from-red-500/10 to-red-500/5",
    border: "border-red-500/30",
    text: "text-red-500",
    badge: "bg-red-500/20 text-red-700",
  },
  medium_risk: {
    bg: "from-yellow-500/10 to-yellow-500/5",
    border: "border-yellow-500/30",
    text: "text-yellow-500",
    badge: "bg-yellow-500/20 text-yellow-700",
  },
  low_risk: {
    bg: "from-green-500/10 to-green-500/5",
    border: "border-green-500/30",
    text: "text-green-500",
    badge: "bg-green-500/20 text-green-700",
  },
};

export function PredictionResultDashboard({
  result,
  processingTime,
}: PredictionResultDashboardProps) {
  const colors = statusColors[result.status];

  // Prepare chart data
  const featureData = result.topFactors.map((factor) => ({
    name: factor.name,
    importance: factor.importance,
  }));

  const riskLevels = [
    { name: "Low Risk", value: 100 - result.riskScore, fill: "#10b981" },
    {
      name: "Moderate Risk",
      value: Math.min(result.riskScore * 0.5, 50),
      fill: "#f59e0b",
    },
    {
      name: "High Risk",
      value: Math.max(result.riskScore * 0.5, 50),
      fill: "#ef4444",
    },
  ];

  const confidenceData = [
    { category: "Confidence", value: result.confidenceScore, fullMark: 100 },
    {
      category: "Migration Prob",
      value: result.migrationProbability,
      fullMark: 100,
    },
    { category: "Risk Score", value: result.riskScore, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Prediction Results</h2>
        <p className="text-muted-foreground">
          Processed in{" "}
          <span className="font-semibold text-accent">{processingTime}ms</span>
        </p>
      </motion.div>

      {/* Main Status Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className={`relative overflow-hidden border-2 bg-gradient-to-br ${colors.bg} ${colors.border} backdrop-blur-xl p-8`}
        >
          {/* Background animation */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className={`absolute inset-0 blur-3xl ${colors.text}`} />
          </div>

          <div className="relative space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}
                >
                  {result.status === "high_risk"
                    ? "⚠️ High Risk"
                    : result.status === "medium_risk"
                      ? "⚡ Medium Risk"
                      : "✅ Low Risk"}
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {result.status === "high_risk" && (
                  <AlertTriangle className={`w-8 h-8 ${colors.text}`} />
                )}
                {result.status === "medium_risk" && (
                  <AlertCircle className={`w-8 h-8 ${colors.text}`} />
                )}
                {result.status === "low_risk" && (
                  <CheckCircle className={`w-8 h-8 ${colors.text}`} />
                )}
              </motion.div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-1"
              >
                <div className="text-sm text-muted-foreground">
                  Migration Probability
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {result.migrationProbability}
                  </span>
                  <span className="text-lg text-muted-foreground">%</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-1"
              >
                <div className="text-sm text-muted-foreground">Risk Score</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {result.riskScore}
                  </span>
                  <span className="text-lg text-muted-foreground">/100</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <div className="text-sm text-muted-foreground">Confidence</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {result.confidenceScore}
                  </span>
                  <span className="text-lg text-muted-foreground">%</span>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs for detailed analysis */}
      <Tabs defaultValue="factors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/30">
          <TabsTrigger value="factors">Top Factors</TabsTrigger>
          <TabsTrigger value="charts">Analytics</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        {/* Top Contributing Factors */}
        <TabsContent value="factors" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Top Influencing Factors
              </h3>
              <div className="space-y-3">
                {result.topFactors.map((factor, idx) => (
                  <motion.div
                    key={factor.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold text-accent">
                          {idx + 1}
                        </div>
                        <span className="font-medium">{factor.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 rounded-full bg-secondary">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${factor.importance}%` }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          />
                        </div>
                        <span className="text-sm font-semibold text-accent w-12 text-right">
                          {factor.importance}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Interactive Charts */}
        <TabsContent value="charts" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Feature Importance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4">Feature Importance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={featureData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,0.8)",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="importance"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Risk Distribution Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4">Risk Composition</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskLevels}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskLevels.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Assessment Profile</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={confidenceData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Confidence Meter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  Prediction Confidence
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Confidence Level
                      </span>
                      <span className="font-semibold text-accent">
                        {result.confidenceScore}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidenceScore}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.confidenceScore > 80
                      ? "High confidence in this prediction"
                      : result.confidenceScore > 60
                        ? "Moderate confidence - consider collecting more data"
                        : "Lower confidence - more data recommended"}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Summary & Explanation */}
        <TabsContent value="summary" className="space-y-4">
          <div className="grid md:grid-cols-1 gap-4 space-y-4">
            {/* Prediction Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Prediction Summary</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {result.prediction.summary}
                </p>
              </Card>
            </motion.div>

            {/* AI Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  AI Explanation
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {result.prediction.aiExplanation}
                </p>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Recommended Actions */}
        <TabsContent value="actions" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Government Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4">Government Actions</h3>
                <ul className="space-y-2">
                  {result.prediction.governmentActions.map((action, idx) => (
                    <motion.li
                      key={action}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-accent font-bold mt-1">→</span>
                      <span className="text-muted-foreground leading-relaxed">
                        {action}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Company Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4">Company Actions</h3>
                <ul className="space-y-2">
                  {result.prediction.companyActions.map((action, idx) => (
                    <motion.li
                      key={action}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-accent font-bold mt-1">→</span>
                      <span className="text-muted-foreground leading-relaxed">
                        {action}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Personal Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4">Personal Actions</h3>
                <ul className="space-y-2">
                  {result.prediction.personalActions.map((action, idx) => (
                    <motion.li
                      key={action}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-accent font-bold mt-1">→</span>
                      <span className="text-muted-foreground leading-relaxed">
                        {action}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
