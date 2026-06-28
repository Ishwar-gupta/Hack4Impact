import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart3,
  Brain,
  Building2,
  CheckCircle2,
  Database,
  FileText,
  Globe,
  GraduationCap,
  Map,
  Radar,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    description: "Advanced machine learning models forecast brain drain patterns and migration trends with 94% accuracy.",
  },
  {
    icon: Globe,
    title: "Interactive Nepal Heatmap",
    description: "District-level visualization of talent migration, economic exposure, and risk indices across all 77 districts.",
  },
  {
    icon: TrendingUp,
    title: "Policy Simulator",
    description: "Model the impact of socio-economic policies on brain drain before they are enacted.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Live dashboards with national KPIs, remittance tracking, and employment trend analysis.",
  },
  {
    icon: Shield,
    title: "Government-Grade Security",
    description: "Enterprise-level data protection, role-based access controls, and full audit trails.",
  },
  {
    icon: Users,
    title: "Multi-Stakeholder Access",
    description: "Tailored views for policymakers, universities, industry leaders, and researchers.",
  },
]

const stats = [
  { label: "Districts Covered", value: "77" },
  { label: "Data Points Analyzed", value: "12M+" },
  { label: "Prediction Accuracy", value: "94%" },
  { label: "Active Users", value: "2,400+" },
]

const modules = [
  { title: "National Dashboard", detail: "Executive KPIs, sector risk, data feeds, and recommended action queues.", icon: BarChart3 },
  { title: "District Heatmap", detail: "Map-based monitoring for province, district, youth, and labour risk signals.", icon: Map },
  { title: "Migration Prediction", detail: "Occupation-level forecasts for high-demand talent and departure pathways.", icon: Radar },
  { title: "Economic Forecast", detail: "GDP, remittance, unemployment, and fiscal-risk scenarios in one view.", icon: Database },
  { title: "Policy Simulator", detail: "Adjust levers and compare projected workforce retention outcomes.", icon: Sparkles },
  { title: "Reports Desk", detail: "Generate secure briefs for ministries, universities, and development partners.", icon: FileText },
]

const workflow = [
  "Collect district and labour-market signals",
  "Classify brain-drain pressure with AI models",
  "Simulate policies before implementation",
  "Export official briefs for decision makers",
]

const stakeholders = [
  { name: "Government ministries", value: "National policy command", icon: Building2 },
  { name: "Universities", value: "Graduate retention planning", icon: GraduationCap },
  { name: "Industry councils", value: "Skill-gap forecasting", icon: Users },
]

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-foreground">
            NTIBDP
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Impact</a>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Government-grade AI labour intelligence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Nepal Talent Intelligence &<br />
              <span className="text-[#2563EB]">Brain Drain Prediction</span> Platform
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl leading-relaxed">
              A national decision-support system for predicting, analyzing, and mitigating brain drain across Nepal's 77 districts using AI-driven insights, heatmaps, reports, and policy simulation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Live intelligence</p>
                  <h2 className="mt-1 font-semibold">National Risk Monitor</h2>
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">Online</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Brain Drain Index", "78.4"],
                  ["Skilled Loss", "24.5%"],
                  ["District Alerts", "14"],
                  ["Model Accuracy", "94%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-card p-4">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {["Healthcare migration pressure", "Youth visa pathway surge", "Returnee incentive opportunity"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                    <span className="ml-auto text-xs text-muted-foreground">P{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section id="stats" className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Platform Capabilities</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Enterprise-grade intelligence tools designed for national-level decision making.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Modules */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">One platform, every policy workflow</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Each module is designed for repeat use by analysts, ministries, education leaders, and labour-market planners.
            </p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline">Explore Modules</Button>
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="rounded-xl border border-border bg-card p-5">
              <module.icon className="mb-4 h-5 w-5 text-[#2563EB]" />
              <h3 className="font-semibold">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">From signal to action</h2>
              <p className="mt-3 text-muted-foreground">
                NTIBDP turns scattered labour, migration, education, and economic signals into a clear public-sector decision cycle.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {workflow.map((step, index) => (
                <div key={step} className="rounded-xl border border-border bg-background p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm font-medium leading-6">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {stakeholders.map((stakeholder) => (
            <div key={stakeholder.name} className="rounded-xl border border-border bg-card p-6">
              <stakeholder.icon className="mb-4 h-6 w-6 text-[#2563EB]" />
              <h3 className="text-lg font-semibold">{stakeholder.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{stakeholder.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Ready to take data-driven action?</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Join government agencies, universities, and NGOs already using NTIBDP to combat brain drain.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="mt-8 text-base px-8">
              Access the Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NTIBDP — Government of Nepal</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
