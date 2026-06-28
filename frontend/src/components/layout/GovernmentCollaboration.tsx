import { motion } from "framer-motion";
import { Building2, Handshake, Landmark, ShieldCheck } from "lucide-react";

const partnerPhotos = [
  {
    name: "United Nations Nepal",
    role: "Development coordination and SDG alignment",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80",
    badge: "UN",
  },
  {
    name: "International Labour Organization",
    role: "Labour market standards and decent work policy",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    badge: "ILO",
  },
  {
    name: "Government of Nepal",
    role: "National policy ownership and public service delivery",
    image:
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=900&q=80",
    badge: "GON",
  },
  {
    name: "Migration & Development Partners",
    role: "Evidence sharing with IOM, universities, and research agencies",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    badge: "IOM+",
  },
];

const governanceItems = [
  { label: "Policy steering", value: "Ministry-led", icon: Landmark },
  { label: "Data safeguards", value: "Gov-grade", icon: ShieldCheck },
  { label: "Partner reviews", value: "Quarterly", icon: Handshake },
];

export function GovernmentCollaboration() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mt-8 overflow-hidden rounded-xl border border-border/50 bg-card"
    >
      <div className="border-b border-border/50 bg-secondary/30 px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-border/50 bg-background/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              Government collaboration network
            </div>
            <h2 className="text-lg font-semibold tracking-tight">
              Coordinated with national and international labour partners
            </h2>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">
              The platform presents migration, labour, and talent intelligence
              in a format suitable for ministries, UN agencies, labour
              organizations, universities, and development partners.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {governanceItems.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border/50 bg-background/60 p-3"
              >
                <item.icon className="mb-2 h-4 w-4 text-accent" />
                <p className="text-xs font-semibold">{item.value}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-border/50 sm:grid-cols-2 xl:grid-cols-4">
        {partnerPhotos.map((partner) => (
          <article key={partner.name} className="bg-card">
            <div className="relative h-36 overflow-hidden">
              <img
                src={partner.image}
                alt={`${partner.name} collaboration visual`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-900">
                {partner.badge}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold">{partner.name}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {partner.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
