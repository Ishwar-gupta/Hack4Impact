import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MigrationTrendChart } from "@/components/charts/MigrationTrendChart";
import { TopDestinationsChart } from "@/components/charts/TopDestinationsChart";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Briefcase,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  MapPin,
  Clock,
  Database,
  Activity,
  ShieldCheck,
  GraduationCap,
  PlaneTakeoff,
  Cpu,
  Target,
} from "lucide-react";

// ─── Animated Counter ───
function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1.5,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    startTime.current = performance.now();
    ref.current = requestAnimationFrame(animate);

    function animate(now: number) {
      const elapsed = (now - startTime.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    }

    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);

  return (
    <span>
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

// ─── Live Ticker ───
const tickerItems = [
  { label: "Real-time data feed", value: "Active", color: "text-green-500" },
  { label: "API latency", value: "24ms", color: "text-accent" },
  { label: "Active sessions", value: "1,247", color: "text-accent" },
  { label: "Models loaded", value: "7/7", color: "text-green-500" },
];

const kpis = [
  {
    title: "Total Migration (2024)",
    value: 850000,
    raw: "850,000",
    trend: "+13.3%",
    trendUp: true,
    icon: Users,
    alert: false,
    color: "accent",
    description: "Year-over-year increase in outbound migration",
  },
  {
    title: "Brain Drain Index",
    value: 78.4,
    raw: "78.4 / 100",
    trend: "+4.2%",
    trendUp: true,
    icon: AlertTriangle,
    alert: true,
    color: "destructive",
    description: "National brain drain severity index",
  },
  {
    title: "Remittance Impact",
    value: 9.2,
    suffix: "B",
    raw: "$9.2B",
    trend: "+2.1%",
    trendUp: true,
    icon: TrendingUp,
    alert: false,
    color: "accent",
    description: "Total remittance contribution to GDP",
  },
  {
    title: "Skilled Labor Loss",
    value: 24.5,
    suffix: "%",
    raw: "24.5%",
    trend: "+6.8%",
    trendUp: true,
    icon: Briefcase,
    alert: true,
    color: "destructive",
    description: "Percentage of skilled workforce abroad",
  },
];

// ─── Mini stat items ───
const miniStats = [
  { label: "Districts Monitored", value: "77", icon: MapPin },
  { label: "Data Points", value: "12.4M", icon: Database },
  { label: "Last Updated", value: "2 min ago", icon: Clock },
];

const sectorRisks = [
  { sector: "Health workers", risk: 84, icon: ShieldCheck, color: "bg-red-500" },
  { sector: "Engineering", risk: 71, icon: Briefcase, color: "bg-orange-500" },
  { sector: "IT graduates", risk: 68, icon: Cpu, color: "bg-yellow-500" },
  { sector: "Research talent", risk: 59, icon: GraduationCap, color: "bg-blue-500" },
];

const districtWatchlist = [
  { name: "Kathmandu", signal: "Visa application surge", score: 91 },
  { name: "Chitwan", signal: "Nursing outflow rising", score: 86 },
  { name: "Kaski", signal: "Graduate retention drop", score: 79 },
  { name: "Morang", signal: "Industrial skill gap", score: 72 },
];

const modelStatus = [
  { label: "Migration forecast", value: "94.2%", state: "Stable" },
  { label: "Risk classifier", value: "91.8%", state: "Retrained" },
  { label: "Policy simulator", value: "88.6%", state: "Calibrating" },
];

const actionQueue = [
  "Deploy retention grant pilot in health sector districts",
  "Review Australia and Gulf visa trend anomaly",
  "Publish provincial workforce risk bulletin",
];

// ─── Particles ───
function Particles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Dashboard() {
  const [tickerIndex, setTickerIndex] = useState(0);

  // Rotate ticker items
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-full space-y-6 pb-2">
      {/* ─── Animated Background Grid ─── */}
      <div className="absolute inset-0 animated-grid opacity-30 pointer-events-none" />

      {/* ─── Top: Title + Live Ticker ─── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                National Intelligence Feed
              </span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="gradient-text">Executive Dashboard</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time brain drain analytics & migration intelligence for Nepal
          </p>
        </motion.div>

        {/* Live Ticker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 px-4 py-2 rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm"
        >
          <Activity className="h-3.5 w-3.5 text-accent animate-pulse shrink-0" />
          <div className="relative h-4 overflow-hidden w-[180px]">
            {tickerItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  idx === tickerIndex
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -20 }
                }
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center gap-2 text-xs"
              >
                <span className="text-muted-foreground">{item.label}:</span>
                <span className={`font-semibold ${item.color}`}>
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── KPI Cards ─── */}
      <div className="relative z-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`futuristic-card ${kpi.alert ? "glow-danger" : ""} group cursor-default`}
          >
            {/* Corner accents */}
            <div className="corner-accent tl" />
            <div className="corner-accent br" />

            {/* Content */}
            <div className="relative p-5 z-10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                    {kpi.title}
                  </p>
                </div>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    kpi.alert
                      ? "bg-destructive/10 text-destructive"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <kpi.icon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={`text-3xl font-bold tracking-tight ${
                    kpi.alert ? "glow-text-danger" : ""
                  }`}
                >
                  {kpi.alert ? (
                    kpi.raw
                  ) : kpi.suffix ? (
                    <>
                      <AnimatedCounter
                        value={kpi.value}
                        suffix={kpi.suffix}
                        decimals={1}
                      />
                    </>
                  ) : (
                    <AnimatedCounter value={kpi.value} />
                  )}
                </span>
                {!kpi.alert && !kpi.suffix && (
                  <span className="text-xs text-muted-foreground">
                    migrants
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 mt-2">
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    kpi.trendUp ? "text-green-500" : "text-destructive"
                  }`}
                >
                  {kpi.trendUp ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {kpi.trend}
                </span>
                <span className="text-xs text-muted-foreground">
                  vs last year
                </span>
              </div>

              <p className="text-[10px] text-muted-foreground/60 mt-2.5 leading-tight">
                {kpi.description}
              </p>
            </div>

            {/* Data stream overlay */}
            <div className="absolute inset-0 data-stream pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* ─── Mini Stats Row ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 flex flex-wrap gap-4"
      >
        {miniStats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/40 backdrop-blur-sm px-4 py-2.5"
          >
            <stat.icon className="h-4 w-4 text-accent/70" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ─── Charts Section ─── */}
      <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Migration Trends */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-4 futuristic-card"
        >
          <div className="corner-accent tl" />
          <div className="corner-accent br" />
          <div className="relative p-5 z-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-sm tracking-tight">
                  Migration Trends
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  7-year historical overview
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-accent hover:text-accent/80 transition-default cursor-pointer">
                View Full Report <ChevronRight className="h-3 w-3" />
              </div>
            </div>
            <MigrationTrendChart />
          </div>
        </motion.div>

        {/* Top Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-span-3 futuristic-card"
        >
          <div className="corner-accent tl" />
          <div className="corner-accent br" />
          <div className="relative p-5 z-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-sm tracking-tight">
                  Top Destinations
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Current fiscal year
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-accent hover:text-accent/80 transition-default cursor-pointer">
                Details <ChevronRight className="h-3 w-3" />
              </div>
            </div>
            <TopDestinationsChart />
          </div>
        </motion.div>
      </div>

      {/* Feature Operations Section */}
      <div className="relative z-10 grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="futuristic-card lg:col-span-2"
        >
          <div className="corner-accent tl" />
          <div className="corner-accent br" />
          <div className="relative z-10 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">
                  Sector Risk Command Center
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Live intervention priority by skilled workforce segment
                </p>
              </div>
              <Target className="h-4 w-4 text-accent" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {sectorRisks.map((sector) => (
                <div
                  key={sector.sector}
                  className="rounded-lg border border-border/30 bg-secondary/20 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <sector.icon className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">{sector.sector}</span>
                    </div>
                    <span className="text-sm font-bold">{sector.risk}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${sector.color}`}
                      style={{ width: `${sector.risk}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="futuristic-card"
        >
          <div className="corner-accent tl" />
          <div className="corner-accent br" />
          <div className="relative z-10 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">
                  AI Model Health
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Accuracy and refresh state
                </p>
              </div>
              <Cpu className="h-4 w-4 text-accent" />
            </div>
            <div className="space-y-3">
              {modelStatus.map((model) => (
                <div
                  key={model.label}
                  className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/20 px-3 py-2.5"
                >
                  <div>
                    <p className="text-xs font-medium">{model.label}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {model.state}
                    </p>
                  </div>
                  <span className="font-mono text-sm text-accent">
                    {model.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="futuristic-card"
        >
          <div className="relative z-10 p-5">
            <div className="mb-4 flex items-center gap-2">
              <PlaneTakeoff className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold">District Watchlist</h3>
            </div>
            <div className="space-y-3">
              {districtWatchlist.map((district) => (
                <div
                  key={district.name}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-border/30 bg-secondary/20 p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{district.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {district.signal}
                    </p>
                  </div>
                  <span className="rounded-md bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                    {district.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="futuristic-card"
        >
          <div className="relative z-10 p-5">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h3 className="text-sm font-semibold">Recommended Actions</h3>
            </div>
            <div className="space-y-3">
              {actionQueue.map((action, index) => (
                <div
                  key={action}
                  className="flex items-start gap-3 rounded-lg border border-border/30 bg-secondary/20 p-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/10 text-[10px] font-bold text-accent">
                    {index + 1}
                  </span>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Stats Strip ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10 flex items-center justify-between rounded-lg border border-border/20 bg-card/30 backdrop-blur-sm px-5 py-3 text-[10px] text-muted-foreground"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
          System operational — all data feeds synced
        </span>
        <span className="hidden sm:flex items-center gap-2">
          <Database className="h-3 w-3" />
          Data refresh:{" "}
          <span className="text-foreground/70 font-mono">30s</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          AI models:{" "}
          <span className="text-foreground/70 font-mono">ACTIVE</span>
        </span>
      </motion.div>

      {/* Floating particles */}
      <Particles />
    </div>
  );
}
