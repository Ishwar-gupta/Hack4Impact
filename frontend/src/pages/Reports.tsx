import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Download, FileText, Printer, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Reports() {
  const scheduledReports = [
    { title: "Provincial risk digest", cadence: "Weekly", status: "Queued" },
    { title: "Cabinet migration brief", cadence: "Monthly", status: "Ready" },
    { title: "University retention pack", cadence: "Quarterly", status: "Draft" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Export</h1>
          <p className="text-muted-foreground mt-2">
            Generate and download executive summaries and detailed datasets.
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Current View
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Government Executive Summary
            </CardTitle>
            <CardDescription>High-level overview of national metrics, brain drain risk, and economic forecasts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <Download className="mr-2 h-4 w-4" /> Download DOCX
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              University Talent Report
            </CardTitle>
            <CardDescription>Detailed breakdown of graduate retention rates and skill demand matching.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <Download className="mr-2 h-4 w-4" /> Download CSV Raw Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Industry Sector Analysis
            </CardTitle>
            <CardDescription>Forecasts for specific occupational sectors and local market gaps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <Download className="mr-2 h-4 w-4" /> Download Excel Dataset
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarClock className="mr-2 h-5 w-5 text-primary" />
              Scheduled Intelligence Briefs
            </CardTitle>
            <CardDescription>
              Automated reporting packages prepared for stakeholders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {scheduledReports.map((report) => (
              <div
                key={report.title}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
              >
                <div>
                  <p className="text-sm font-medium">{report.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.cadence} distribution
                  </p>
                </div>
                <Badge>{report.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="mr-2 h-5 w-5 text-primary" />
              Distribution
            </CardTitle>
            <CardDescription>
              Last executive package reached 42 authorized recipients.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Ministry dashboard", "University partners", "Industry council"].map(
              (channel) => (
                <div key={channel} className="rounded-lg bg-secondary/40 p-3">
                  <p className="text-sm font-medium">{channel}</p>
                  <p className="text-xs text-muted-foreground">
                    Secure delivery enabled
                  </p>
                </div>
              ),
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
