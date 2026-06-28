import { Globe, Shield, Brain, Building2 } from "lucide-react";

const team = [
  { name: "Ministry of Labour", role: "Policy & Data Partner" },
  { name: "National Planning Commission", role: "Strategic Guidance" },
  { name: "Central Bureau of Statistics", role: "Data Source" },
  { name: "World Bank Nepal", role: "Research Partner" },
  { name: "UNDP Nepal", role: "Development Advisor" },
];

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="font-bold text-xl tracking-tight text-foreground"
          >
            NTIBDP
          </a>
          <a
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </a>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          About NTIBDP
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          The Nepal Talent Intelligence & Brain Drain Prediction Platform is a
          national-scale AI system designed to monitor, predict, and recommend
          interventions for talent migration from Nepal. Built in collaboration
          with government agencies and international development organizations,
          NTIBDP provides real-time intelligence to policymakers, universities,
          and industry leaders.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-xl border border-border bg-card p-6">
            <Brain className="h-8 w-8 text-foreground mb-3" />
            <h3 className="font-semibold mb-1">Mission</h3>
            <p className="text-sm text-muted-foreground">
              To provide AI-powered insights that enable evidence-based policies
              to retain Nepal's brightest talent.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Globe className="h-8 w-8 text-foreground mb-3" />
            <h3 className="font-semibold mb-1">Scope</h3>
            <p className="text-sm text-muted-foreground">
              Covering all 77 districts and 7 provinces with real-time data
              collection and predictive models.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Shield className="h-8 w-8 text-foreground mb-3" />
            <h3 className="font-semibold mb-1">Standards</h3>
            <p className="text-sm text-muted-foreground">
              Government-grade data security, full WCAG accessibility, and
              enterprise-level performance.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
          Key Partners
        </h2>
        <div className="space-y-3 mb-16">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="font-medium">{member.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {member.role}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Technology Stack</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Built with modern, secure, and scalable technologies.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {[
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "Vite",
              "Recharts",
              "React Leaflet",
              "Redux Toolkit",
              "TanStack Query",
              "Framer Motion",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NTIBDP — Government of Nepal. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}
