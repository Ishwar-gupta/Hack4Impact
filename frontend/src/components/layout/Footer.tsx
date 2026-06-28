import { motion } from "framer-motion";
import {
  Building2,
  Database,
  ExternalLink,
  FileCheck2,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
} from "lucide-react";

const partnerPhotos = [
  {
    name: "United Nations Nepal",
    short: "UN",
    detail: "SDG alignment and development coordination",
  },
  {
    name: "International Labour Organization",
    short: "ILO",
    detail: "Decent work, labour standards, and employment evidence",
  },
  {
    name: "Government of Nepal",
    short: "GON",
    detail: "National policy ownership and public service delivery",
  },
];

const officialLinks = [
  "Ministry Dashboard",
  "Labour Market Bulletin",
  "Open Data Catalogue",
  "Policy Simulation Desk",
  "District Reports",
  "Public Help Centre",
];

const compliance = [
  { label: "District feeds", value: "77/77", icon: Database },
  { label: "Live status", value: "Online", icon: Radio },
  { label: "Verified exports", value: "Enabled", icon: FileCheck2 },
  { label: "Data safeguards", value: "Active", icon: ShieldCheck },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
    >
      <div className="border-b border-border/60 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 px-5 py-5 text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-100">
                Government of Nepal
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Nepal Talent Intelligence & Brain Drain Prediction Platform
              </h2>
              <p className="mt-2 max-w-3xl text-xs leading-5 text-blue-100/80">
                Official labour intelligence workspace for public policy,
                migration risk monitoring, workforce planning, and coordinated
                development partner action.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-blue-100">
              Public data refresh
            </p>
            <p className="mt-1 text-lg font-semibold">Every 30 seconds</p>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-border/60 lg:grid-cols-[1.05fr_1fr_0.95fr]">
        <section className="bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Collaborating Partners</h3>
          </div>
          <div className="grid gap-3">
            {partnerPhotos.map((partner) => (
              <div
                key={partner.name}
                className="grid grid-cols-[56px_1fr] rounded-lg border border-border/50 bg-secondary/20"
              >
                <div className="flex min-h-20 items-center justify-center border-r border-border/50 bg-background/70 text-sm font-bold text-accent">
                  {partner.short}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold">{partner.name}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {partner.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Official Services</h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {officialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="group flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 px-3 py-2.5 text-xs font-medium transition-default hover:border-accent/40 hover:text-accent"
              >
                {link}
                <ExternalLink className="h-3 w-3 opacity-50 transition-default group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {compliance.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border/50 bg-background/60 p-3"
              >
                <item.icon className="mb-2 h-4 w-4 text-accent" />
                <p className="text-sm font-semibold">{item.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Official Contact</h3>
          </div>
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex gap-3 rounded-lg border border-border/50 bg-secondary/20 p-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>Singha Durbar, Kathmandu, Nepal</span>
            </div>
            <div className="flex gap-3 rounded-lg border border-border/50 bg-secondary/20 p-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>Labour intelligence help desk: +977-01-4200000</span>
            </div>
            <div className="flex gap-3 rounded-lg border border-border/50 bg-secondary/20 p-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>support@ntibdp.gov.np</span>
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-border/50 bg-secondary/20 p-4">
            <p className="text-xs font-semibold">Public Notice</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Partner references are presented as an official collaboration
              structure for policy demonstration and can be connected to
              approved public-sector links during deployment.
            </p>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-3 border-t border-border/60 bg-secondary/30 px-5 py-4 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
        <p>
          &copy; {new Date().getFullYear()} NTIBDP, Government of Nepal. All
          rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          {["Accessibility", "Privacy Policy", "Terms of Use", "Security"].map(
            (item) => (
              <a key={item} href="#" className="hover:text-foreground">
                {item}
              </a>
            ),
          )}
        </div>
      </div>
    </motion.footer>
  );
}
