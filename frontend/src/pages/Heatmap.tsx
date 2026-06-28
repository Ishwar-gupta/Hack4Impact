import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Banknote,
  BriefcaseBusiness,
  CalendarClock,
  Filter,
  Layers,
  MapPin,
  Radio,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

const dummyDistricts = [
  {
    name: "Kathmandu",
    coordinates: [27.7172, 85.324],
    risk: "Red",
    value: 84,
    province: "Bagmati",
    outflow: "124k",
    expectedMigration: "18,450",
    topProfessions: ["Software Engineers", "Nurses", "Doctors"],
    economicLoss: "NPR 3.2 Billion",
    reasons: ["Salary", "Political Instability", "Career Growth"],
    shortageYears: [2027, 2028, 2029, 2030],
    intervention: "Launch tech and health retention grants within 90 days",
    confidence: 93,
  },
  {
    name: "Pokhara",
    coordinates: [28.2096, 83.9856],
    risk: "Orange",
    value: 65,
    province: "Gandaki",
    outflow: "58k",
    expectedMigration: "9,780",
    topProfessions: ["Hospitality Managers", "Civil Engineers", "Nurses"],
    economicLoss: "NPR 1.4 Billion",
    reasons: ["Foreign Study", "Salary", "Limited Specialization"],
    shortageYears: [2028, 2029, 2030],
    intervention: "Expand provincial fellowship placements in tourism and care",
    confidence: 87,
  },
  {
    name: "Biratnagar",
    coordinates: [26.4525, 87.2718],
    risk: "Yellow",
    value: 45,
    province: "Koshi",
    outflow: "41k",
    expectedMigration: "6,260",
    topProfessions: ["Industrial Technicians", "Accountants", "Lab Technicians"],
    economicLoss: "NPR 860 Million",
    reasons: ["Industrial Wages", "Career Growth", "Family Networks"],
    shortageYears: [2029, 2030],
    intervention: "Tie industrial tax incentives to skilled job retention",
    confidence: 79,
  },
  {
    name: "Lumbini",
    coordinates: [27.484, 83.276],
    risk: "Green",
    value: 20,
    province: "Lumbini",
    outflow: "19k",
    expectedMigration: "3,210",
    topProfessions: ["Teachers", "Paramedics", "Hotel Staff"],
    economicLoss: "NPR 410 Million",
    reasons: ["Seasonal Jobs", "Education", "Family Networks"],
    shortageYears: [2030],
    intervention: "Monitor school and clinic vacancy growth quarterly",
    confidence: 72,
  },
  {
    name: "Janakpur",
    coordinates: [26.7288, 85.923],
    risk: "Orange",
    value: 60,
    province: "Madhesh",
    outflow: "49k",
    expectedMigration: "8,940",
    topProfessions: ["Doctors", "Nurses", "Construction Supervisors"],
    economicLoss: "NPR 1.1 Billion",
    reasons: ["Salary", "Border Mobility", "Political Instability"],
    shortageYears: [2028, 2029, 2030],
    intervention: "Prioritize hospital staffing incentives and local contracts",
    confidence: 84,
  },
];

const heatmapStats = [
  { label: "High risk districts", value: "14", icon: AlertTriangle },
  { label: "Avg risk score", value: "68.4", icon: TrendingUp },
  { label: "Live signals", value: "312", icon: Radio },
  { label: "Map layers", value: "4", icon: Layers },
];

const layerFilters = ["Brain drain", "Migration volume", "Youth risk", "Remittance dependency"];

const provinceRanking = [
  { name: "Bagmati", score: 82 },
  { name: "Gandaki", score: 69 },
  { name: "Madhesh", score: 61 },
  { name: "Koshi", score: 48 },
];

const getColor = (risk: string) => {
  switch (risk) {
    case "Red":
      return "#DC2626";
    case "Orange":
      return "#F97316";
    case "Yellow":
      return "#FACC15";
    case "Green":
      return "#22C55E";
    default:
      return "#2563EB";
  }
};

export function Heatmap() {
  // Fix Leaflet issue with Vite where default icons might not load if we used Markers
  // Since we are using CircleMarkers for a heatmap feel, it's fine.
  const [activeLayer, setActiveLayer] = useState(layerFilters[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(dummyDistricts[0]);

  const shortagePressure =
    selectedDistrict.shortageYears.length >= 4
      ? "Critical"
      : selectedDistrict.shortageYears.length >= 3
        ? "High"
        : selectedDistrict.shortageYears.length >= 2
          ? "Rising"
          : "Watch";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/70 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 animated-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="live-dot" />
              District intelligence map
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Interactive Nepal Heatmap
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Visualize district-level brain drain risk, migration volume,
              youth exposure, and remittance dependency in one operational view.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {layerFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveLayer(filter)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-default ${
                  activeLayer === filter
                    ? "border-accent/40 bg-accent text-accent-foreground"
                    : "border-border/30 bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {heatmapStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-xl border border-border/40 bg-card/70 p-4 backdrop-blur-sm"
          >
            <stat.icon className="mb-3 h-4 w-4 text-accent" />
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="relative min-h-[620px] overflow-hidden rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm">
          <MapContainer
            center={[28.3949, 84.124]}
            zoom={7}
            className="z-0 h-full min-h-[620px] w-full"
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {dummyDistricts.map((district, i) => (
              <CircleMarker
                key={i}
                center={
                  [district.coordinates[0], district.coordinates[1]] as [
                    number,
                    number,
                  ]
                }
                radius={district.value / 3}
                pathOptions={{
                  fillColor: getColor(district.risk),
                  fillOpacity: 0.72,
                  color: selectedDistrict.name === district.name ? "#111827" : "white",
                  weight: selectedDistrict.name === district.name ? 3 : 1,
                }}
                eventHandlers={{
                  click: () => setSelectedDistrict(district),
                }}
              >
                <Tooltip sticky>
                  <div className="p-1">
                    <strong>{district.name}</strong>
                    <br />
                    Province: {district.province}
                    <br />
                    Risk Level:{" "}
                    <span style={{ color: getColor(district.risk) }}>
                      {district.risk}
                    </span>
                    <br />
                    Brain Drain Score: {district.value}/100
                    <br />
                    Estimated Outflow: {district.outflow}
                  </div>
                </Tooltip>
                <Popup minWidth={280} maxWidth={320}>
                  <div className="space-y-4 p-1 text-slate-900">
                    <div>
                      <h3 className="text-lg font-bold">{district.name}</h3>
                      <p className="text-xs text-slate-500">{district.province} Province</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-100 p-3">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">Risk Score</p>
                        <p className="text-xl font-bold">{district.value}%</p>
                      </div>
                      <div className="rounded-lg bg-slate-100 p-3">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">Expected Migration</p>
                        <p className="text-xl font-bold">{district.expectedMigration}</p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Top Profession Leaving
                      </p>
                      <ul className="space-y-1 text-sm">
                        {district.topProfessions.map((profession) => (
                          <li key={profession}>• {profession}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-slate-500">Economic Loss</p>
                      <p className="text-base font-bold">{district.economicLoss}</p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Top Reasons</p>
                      <div className="flex flex-wrap gap-2">
                        {district.reasons.map((reason) => (
                          <span key={reason} className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Predicted Shortage
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {district.shortageYears.map((year) => (
                          <span key={year} className="rounded-md bg-red-50 px-2 py-1 text-center text-xs font-semibold text-red-700">
                            {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="absolute left-4 top-4 z-[1000] flex items-center gap-2 rounded-lg border border-border/40 bg-card/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
            <Filter className="h-3.5 w-3.5 text-accent" />
            Active layer: {activeLayer}
          </div>

          <div className="absolute bottom-6 left-6 z-[1000] rounded-lg border border-border/40 bg-card/95 p-4 shadow-lg backdrop-blur">
            <h4 className="mb-3 text-sm font-semibold">Brain Drain Risk</h4>
            <div className="space-y-2 text-xs">
              {[
                ["#DC2626", "High Risk (>80)"],
                ["#F97316", "Moderate-High (60-80)"],
                ["#FACC15", "Moderate (40-60)"],
                ["#22C55E", "Low Risk (<40)"],
              ].map(([color, label]) => (
                <div key={label} className="flex items-center">
                  <span
                    className="mr-2 h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border/40 bg-card/70 p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold">{selectedDistrict.name} Intelligence</h3>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Click any district marker to update this panel.
                </p>
              </div>
              <span
                className="rounded-md px-2 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: getColor(selectedDistrict.risk) }}
              >
                {selectedDistrict.value}%
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-lg border border-border/30 bg-secondary/20 p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <UsersRound className="h-3.5 w-3.5 text-accent" />
                  Expected Migration
                </div>
                <p className="text-xl font-semibold">{selectedDistrict.expectedMigration}</p>
              </div>
              <div className="rounded-lg border border-border/30 bg-secondary/20 p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Banknote className="h-3.5 w-3.5 text-accent" />
                  Economic Loss
                </div>
                <p className="text-xl font-semibold">{selectedDistrict.economicLoss}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Top Professions Leaving
                </h4>
              </div>
              <div className="space-y-2">
                {selectedDistrict.topProfessions.map((profession) => (
                  <div key={profession} className="rounded-lg bg-secondary/20 px-3 py-2 text-sm">
                    {profession}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Top Reasons
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedDistrict.reasons.map((reason) => (
                  <span key={reason} className="rounded-md border border-border/30 bg-secondary/20 px-2.5 py-1 text-xs">
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/40 bg-card/70 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-semibold">Shortage Forecast</h3>
              </div>
              <span className="rounded-md bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                {shortagePressure}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2027, 2028, 2029, 2030].map((year) => {
                const isShortage = selectedDistrict.shortageYears.includes(year);
                return (
                  <div
                    key={year}
                    className={`rounded-lg border p-3 text-center ${
                      isShortage
                        ? "border-destructive/30 bg-destructive/10 text-destructive"
                        : "border-border/30 bg-secondary/20 text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm font-semibold">{year}</p>
                    <p className="mt-1 text-[10px]">{isShortage ? "Gap" : "Stable"}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg border border-border/30 bg-secondary/20 p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Recommended Action
              </p>
              <p className="mt-1 text-sm leading-5">{selectedDistrict.intervention}</p>
              <p className="mt-2 font-mono text-[10px] text-accent">
                Model confidence: {selectedDistrict.confidence}%
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/40 bg-card/70 p-5">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold">Province Ranking</h3>
            </div>
            <div className="space-y-4">
              {provinceRanking.map((province) => (
                <div key={province.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{province.name}</span>
                    <span className="font-semibold">{province.score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${province.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/40 bg-card/70 p-5">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold">District Signals</h3>
            </div>
            <div className="space-y-3">
              {dummyDistricts.map((district) => (
                <button
                  key={district.name}
                  onClick={() => setSelectedDistrict(district)}
                  className={`w-full rounded-lg border p-3 text-left transition-default ${
                    selectedDistrict.name === district.name
                      ? "border-accent/40 bg-accent/10"
                      : "border-border/30 bg-secondary/20 hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{district.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {district.province} Province
                      </p>
                    </div>
                    <span
                      className="rounded-md px-2 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: getColor(district.risk) }}
                    >
                      {district.value}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Estimated outward pressure: {district.outflow}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
