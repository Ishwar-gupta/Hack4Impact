import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const gdpForecast = [
  { year: "2020", gdp: 33.6, remittance: 8.2 },
  { year: "2021", gdp: 36.2, remittance: 8.8 },
  { year: "2022", gdp: 40.1, remittance: 9.0 },
  { year: "2023", gdp: 41.5, remittance: 9.2 },
  { year: "2024", gdp: 43.0, remittance: 9.5 },
  { year: "2025", gdp: 44.8, remittance: 10.1 },
  { year: "2026", gdp: 46.2, remittance: 10.8 },
];

const kpis = [
  {
    title: "GDP (2024 Est.)",
    value: "$43.0B",
    trend: "+3.6% YoY",
    icon: DollarSign,
    positive: true,
    detail: "Steady expansion across services and remittance-linked demand",
  },
  {
    title: "Remittance / GDP Ratio",
    value: "22.1%",
    trend: "+1.3%",
    icon: TrendingUp,
    positive: false,
    detail: "Dependency remains high but improving with diversified inflows",
  },
  {
    title: "Unemployment Rate",
    value: "11.4%",
    trend: "+0.8%",
    icon: TrendingDown,
    positive: false,
    detail: "Youth employment pressure continues to shape migration decisions",
  },
  {
    title: "Fiscal Risk Score",
    value: "62 / 100",
    trend: "Moderate",
    icon: AlertTriangle,
    positive: false,
    detail: "Policy attention needed to buffer external shocks and inflation",
  },
];

const scenarios = [
  { name: "Baseline", gdp: "+3.6%", remittance: "+5.1%", risk: "Moderate" },
  { name: "Retention push", gdp: "+4.4%", remittance: "+2.8%", risk: "Lower" },
  { name: "High outflow", gdp: "+2.7%", remittance: "+7.4%", risk: "High" },
];

export function Economic() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-800 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-slate-200 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Macro-economic outlook
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Economic Forecast
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Track GDP momentum, remittance pressure, and fiscal resilience
              through an integrated policy lens.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">
              Forecast horizon
            </p>
            <p className="mt-1 text-xl font-semibold">2020 — 2026</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <CardDescription className="mt-1 text-xs leading-5">
                  {kpi.detail}
                </CardDescription>
              </div>
              <div
                className={`rounded-full p-2 ${kpi.positive ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
              >
                <kpi.icon
                  className={`h-4 w-4 ${kpi.positive ? "text-emerald-600" : "text-rose-600"}`}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-semibold">{kpi.value}</div>
              <div
                className={`inline-flex items-center gap-1 text-sm ${kpi.positive ? "text-emerald-600" : "text-muted-foreground"}`}
              >
                <ArrowUpRight
                  className={`h-4 w-4 ${kpi.positive ? "rotate-0" : "rotate-45"}`}
                />
                {kpi.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>GDP vs Remittance Inflow (Billion USD)</CardTitle>
          <CardDescription>
            Historical data with AI-driven projections through 2026
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-border/60 bg-slate-50/70 p-3 dark:bg-slate-950/40">
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart
                data={gdpForecast}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorGDP" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorRemittance"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="year"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}B`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value, name) => [
                    `$${Number(value ?? 0).toFixed(1)}B`,
                    name === "gdp" ? "GDP" : "Remittance",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="gdp"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorGDP)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="remittance"
                  stroke="hsl(var(--accent))"
                  fillOpacity={1}
                  fill="url(#colorRemittance)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <Card key={scenario.name} className="border-border/70">
            <CardHeader>
              <CardTitle className="text-base">{scenario.name}</CardTitle>
              <CardDescription>Economic sensitivity scenario</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-secondary/40 p-3">
                <p className="text-xs text-muted-foreground">GDP</p>
                <p className="mt-1 font-semibold">{scenario.gdp}</p>
              </div>
              <div className="rounded-lg bg-secondary/40 p-3">
                <p className="text-xs text-muted-foreground">Remit.</p>
                <p className="mt-1 font-semibold">{scenario.remittance}</p>
              </div>
              <div className="rounded-lg bg-secondary/40 p-3">
                <p className="text-xs text-muted-foreground">Risk</p>
                <p className="mt-1 font-semibold">{scenario.risk}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
