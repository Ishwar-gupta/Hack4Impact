import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle2, Play, RefreshCcw, ShieldCheck } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Simulator() {
  const [salaryIncrease, setSalaryIncrease] = useState([10]);
  const [educationInvestment, setEducationInvestment] = useState([5]);
  const [taxIncentives, setTaxIncentives] = useState([0]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Dummy prediction data generator
  const getSimulationData = () => {
    const baseMigration = 850000;
    const reduction =
      salaryIncrease[0] * 10000 +
      educationInvestment[0] * 5000 +
      taxIncentives[0] * 8000;

    return [
      { year: "2024", migrants: baseMigration },
      { year: "2025", migrants: Math.max(0, baseMigration - reduction * 0.5) },
      { year: "2026", migrants: Math.max(0, baseMigration - reduction * 1.2) },
      { year: "2027", migrants: Math.max(0, baseMigration - reduction * 2.0) },
      { year: "2028", migrants: Math.max(0, baseMigration - reduction * 3.1) },
    ];
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1500);
  };

  const policyStrength =
    salaryIncrease[0] * 0.35 +
    educationInvestment[0] * 0.4 +
    taxIncentives[0] * 0.25;
  const projectedReduction = Math.min(48, Math.round(policyStrength));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Policy Simulator
          </h1>
          <p className="text-muted-foreground mt-2">
            Adjust socio-economic policies to forecast their impact on brain
            drain and migration.
          </p>
        </div>
        <Button onClick={handleSimulate} disabled={isSimulating}>
          {isSimulating ? (
            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          Run Simulation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4">
          <ShieldCheck className="mb-3 h-4 w-4 text-accent" />
          <p className="text-2xl font-semibold">{projectedReduction}%</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Potential migration pressure reduction
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <Activity className="mb-3 h-4 w-4 text-accent" />
          <p className="text-2xl font-semibold">
            NPR {Math.max(12, Math.round(policyStrength * 1.8))}B
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Estimated implementation envelope
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <CheckCircle2 className="mb-3 h-4 w-4 text-accent" />
          <p className="text-2xl font-semibold">
            {projectedReduction > 28 ? "High" : "Medium"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Policy readiness rating
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-1 space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-6 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Policy Levers
            </h3>

            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Minimum Salary Increase (%)</Label>
                  <span className="text-sm font-medium">{salaryIncrease}%</span>
                </div>
                <Slider
                  value={salaryIncrease}
                  onValueChange={setSalaryIncrease}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Education Investment (Billion NPR)</Label>
                  <span className="text-sm font-medium">
                    {educationInvestment}B
                  </span>
                </div>
                <Slider
                  value={educationInvestment}
                  onValueChange={setEducationInvestment}
                  max={100}
                  step={5}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Tax Incentives for Returnees (%)</Label>
                  <span className="text-sm font-medium">{taxIncentives}%</span>
                </div>
                <Slider
                  value={taxIncentives}
                  onValueChange={setTaxIncentives}
                  max={30}
                  step={1}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm h-full min-h-[400px]">
            <h3 className="font-semibold mb-4">Forecasted Migration Impact</h3>
            {isSimulating ? (
              <div className="flex h-[300px] items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground animate-pulse">
                  <Activity className="h-8 w-8 mb-4 animate-spin" />
                  <p>Processing AI Simulation Model...</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart
                  data={getSimulationData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorMigrants"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
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
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                    }}
                    formatter={(value) => [
                      new Intl.NumberFormat().format(
                        Math.round(Number(value ?? 0)),
                      ),
                      "Projected Migrants",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="migrants"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorMigrants)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold">Implementation Roadmap</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {["Pilot", "Budget", "District rollout", "Impact audit"].map(
            (step, index) => (
              <div key={step} className="rounded-lg bg-secondary/40 p-4">
                <p className="text-xs text-muted-foreground">Phase {index + 1}</p>
                <p className="mt-1 text-sm font-medium">{step}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
