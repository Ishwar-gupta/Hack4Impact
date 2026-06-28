import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Briefcase, ShieldCheck, TrendingUp, Users } from "lucide-react";

const riskSegments = [
  { label: "Medical", value: 86 },
  { label: "Engineering", value: 74 },
  { label: "Technology", value: 69 },
  { label: "Academia", value: 58 },
];

const mitigations = [
  "Fund district-level specialist placement programs",
  "Tie public scholarships to high-quality local career pathways",
  "Create fast-track returnee credential recognition",
];

export function Risk() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Brain Drain Risk Index
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive risk assessment across demographics and sectors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall National Risk
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.4 / 100</div>
            <p className="text-xs text-muted-foreground">Critical Level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Vulnerable Age Group
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 - 25 Years</div>
            <p className="text-xs text-muted-foreground">
              65% of total predicted drain
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Economic Exposure
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Severe</div>
            <p className="text-xs text-muted-foreground">
              High dependency on remittance
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm min-h-[400px] p-6">
        <h3 className="font-semibold leading-none tracking-tight mb-4">
          Risk Distribution by Province
        </h3>
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            {riskSegments.map((segment) => (
              <div key={segment.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{segment.label}</span>
                  <span className="font-semibold">{segment.value}/100</span>
                </div>
                <div className="h-3 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-destructive"
                    style={{ width: `${segment.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border/40 bg-secondary/20 p-4">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <h4 className="text-sm font-semibold">Mitigation Priorities</h4>
            </div>
            <div className="space-y-3">
              {mitigations.map((item, index) => (
                <div key={item} className="flex gap-3 text-xs leading-5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/10 font-semibold text-accent">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="h-4 w-4 text-accent" />
              Employer Pressure Signals
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {["Vacancy duration", "Wage mismatch", "Replacement cost"].map(
              (label) => (
                <div key={label} className="rounded-lg bg-secondary/40 p-4">
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Above national baseline
                  </p>
                </div>
              ),
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Youth Retention Pulse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-accent">42%</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Share of surveyed graduates likely to accept local opportunities
              when compensation, mentorship, and advancement are bundled.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
