import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTalentIntelligenceData } from "@/services/predictionService";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Users,
  TrendingUp,
  Zap,
  Target,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Globe,
  Brain,
} from "lucide-react";

export function NepaliTalentIntelligence() {
  const data = useMemo(() => getTalentIntelligenceData(), []);

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg border border-border/30 bg-gradient-to-br ${color} bg-opacity-5 backdrop-blur-sm space-y-3`}
    >
      <div className="flex items-center justify-between">
        <Icon className={`w-5 h-5 ${color.split(" ")[1].replace("to-", "text-")}`} />
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen space-y-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          📊 Nepali Talent Intelligence Dashboard
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Executive intelligence for national talent analytics, migration trends, and strategic
          policy recommendations
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <StatCard
          icon={Users}
          label="Total Talent Pool"
          value={data.nationalOverview.totalTalent}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={AlertTriangle}
          label="At-Risk Talent"
          value={data.nationalOverview.atRiskCount}
          color="from-red-500 to-pink-500"
        />
        <StatCard
          icon={BookOpen}
          label="Avg Education (Years)"
          value={Math.round(data.nationalOverview.avgEducationYears)}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          icon={TrendingUp}
          label="High-Demand Skills"
          value={data.nationalOverview.highDemandSkills.length}
          color="from-green-500 to-emerald-500"
        />
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-secondary/30 overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="skills">Skills & Gaps</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Risk Segmentation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Migration Risk Segmentation
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "High Risk",
                          value: data.migrationRiskSegmentation.highRisk,
                        },
                        {
                          name: "Medium Risk",
                          value: data.migrationRiskSegmentation.mediumRisk,
                        },
                        {
                          name: "Low Risk",
                          value: data.migrationRiskSegmentation.lowRisk,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#ef4444" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#10b981" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* District Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-accent" />
                  District-wise Talent Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(data.districtDistribution).map(([name, value]) => ({
                      name,
                      value,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Employment Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Employment Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={Object.entries(data.employmentInsights).map(([name, value]) => ({
                        name,
                        value,
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((color, idx) => (
                        <Cell key={idx} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Profession Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Top Professions</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(data.professionDistribution)
                      .map(([name, value]) => ({ name, value }))
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 6)}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Education Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Education Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(data.educationDistribution).map(([name, value]) => ({
                      name,
                      value,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }} />
                    <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Talent Overview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4">Talent Overview</h3>
                <div className="space-y-4">
                  {Object.entries(data.educationDistribution).map(([edu, count]) => (
                    <div key={edu} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{edu}</span>
                        <span className="font-semibold text-accent">{count.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{
                            width: `${(count / data.nationalOverview.totalTalent) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Skills & Gaps Tab */}
        <TabsContent value="skills" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Skill Gap Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Skill Gap Analysis
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data.skillGapAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }} />
                    <Legend />
                    <Bar dataKey="demand" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="supply" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* High Demand Skills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  High Demand Skills
                </h3>
                <ul className="space-y-3">
                  {data.nationalOverview.highDemandSkills.map((skill, idx) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent">
                        {idx + 1}
                      </div>
                      <span className="font-medium">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Migration Trends */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Migration Trends (12 months)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.migrationTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }} />
                    <Area type="monotone" dataKey="migratedCount" fill="#3b82f6" stroke="#3b82f6" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* At-Risk Trends */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">At-Risk Talent Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.migrationTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }} />
                    <Line type="monotone" dataKey="atRiskCount" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Future Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Future Workforce Forecast</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.futureForecasts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }} />
                    <Legend />
                    <Line type="monotone" dataKey="projectedMigration" stroke="#3b82f6" strokeWidth={2} name="Projected Migration" />
                    <Line type="monotone" dataKey="skillDemand" stroke="#8b5cf6" strokeWidth={2} name="Skill Demand" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Government Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 border-border/30 bg-card/40 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  Government Opportunities
                </h3>
                <div className="space-y-3">
                  {data.governmentOpportunities.map((opp, idx) => (
                    <motion.div
                      key={opp.type}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{opp.type}</span>
                        <span className="text-sm font-semibold text-accent">{opp.count}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Impact: {opp.impact}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Policy Tab */}
        <TabsContent value="policy" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 border-border/30 bg-card/40 backdrop-blur-sm space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Target className="w-6 h-6 text-accent" />
                  Policy Recommendations
                </h3>
                <p className="text-muted-foreground">
                  Strategic recommendations for government action to retain talent and prevent brain drain
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {data.policyRecommendations.map((rec, idx) => (
                  <motion.div
                    key={rec}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{rec}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
