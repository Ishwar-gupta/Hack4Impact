import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Clock, GraduationCap, PlaneTakeoff } from "lucide-react"

const predictions = [
  { id: 1, occupation: "Software Engineer", currentDemand: "High", futureRisk: "Critical", predictedLoss: "45%", impact: "High" },
  { id: 2, occupation: "Registered Nurse", currentDemand: "Critical", futureRisk: "Critical", predictedLoss: "62%", impact: "Severe" },
  { id: 3, occupation: "Civil Engineer", currentDemand: "Medium", futureRisk: "High", predictedLoss: "30%", impact: "Medium" },
  { id: 4, occupation: "Data Scientist", currentDemand: "Low", futureRisk: "High", predictedLoss: "50%", impact: "High" },
  { id: 5, occupation: "Medical Doctor", currentDemand: "High", futureRisk: "Critical", predictedLoss: "55%", impact: "Severe" },
]

const migrationInsights = [
  { label: "Fastest rising pathway", value: "Study visa", icon: GraduationCap },
  { label: "Peak departure window", value: "Aug - Oct", icon: Clock },
  { label: "Top vulnerable sector", value: "Healthcare", icon: Briefcase },
  { label: "Projected applications", value: "312k", icon: PlaneTakeoff },
]

export function Migration() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Migration Prediction</h1>
        <p className="text-muted-foreground mt-2">
          AI-driven forecasts on occupational migration trends.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {migrationInsights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border/50 bg-card p-4 shadow-sm"
          >
            <item.icon className="mb-3 h-4 w-4 text-accent" />
            <p className="text-xl font-semibold">{item.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Occupation</TableHead>
              <TableHead>Current Local Demand</TableHead>
              <TableHead>Future Drain Risk</TableHead>
              <TableHead>Predicted Loss (3yr)</TableHead>
              <TableHead>Economic Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictions.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.occupation}</TableCell>
                <TableCell>{row.currentDemand}</TableCell>
                <TableCell>
                  <Badge variant={row.futureRisk === "Critical" ? "destructive" : "default"}>
                    {row.futureRisk}
                  </Badge>
                </TableCell>
                <TableCell>{row.predictedLoss}</TableCell>
                <TableCell>{row.impact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold">Forecast Notes</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Credential recognition", "Salary gap", "Recruiter demand"].map(
              (factor, index) => (
                <div key={factor} className="rounded-lg bg-secondary/40 p-4">
                  <p className="text-xs text-muted-foreground">Driver {index + 1}</p>
                  <p className="mt-1 text-sm font-medium">{factor}</p>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-sm font-semibold">Retention Opportunity</h3>
          <p className="mt-3 text-3xl font-semibold text-accent">18%</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Estimated reduction if targeted grants and returnee placement
            incentives are launched in critical occupations.
          </p>
        </div>
      </div>
    </div>
  )
}
