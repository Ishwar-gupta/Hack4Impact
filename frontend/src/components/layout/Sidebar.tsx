import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/utils/utils";
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Activity,
  FileText,
  Settings,
  Brain,
  ChevronDown,
  Zap,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Heatmap", href: "/heatmap", icon: Map },
  { name: "Migration Prediction", href: "/migration", icon: TrendingUp },
  { name: "Brain Drain Risk", href: "/risk", icon: AlertTriangle },
  { name: "Economic Forecast", href: "/economic", icon: DollarSign },
  { name: "Policy Simulator", href: "/simulator", icon: Activity },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

const aiPredictionHub = [
  { name: "Brain Drain Prediction", href: "/ai-prediction/brain-drain", icon: Zap },
  { name: "Nepali Talent Intelligence", href: "/ai-prediction/talent-intelligence", icon: Users },
];

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    aiHub: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isAiHubActive = aiPredictionHub.some((item) =>
    location.pathname.startsWith(item.href.split("/").slice(0, -1).join("/"))
  );

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative flex h-full w-64 flex-col bg-card/60 backdrop-blur-xl border-r border-border/30 overflow-hidden",
        className,
      )}
    >
      {/* Right edge glow */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-accent/20 via-accent/10 to-transparent pointer-events-none" />

      {/* Logo section */}
      <div className="relative flex h-16 items-center px-6 border-b border-border/20">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/30">
            <Activity className="h-4 w-4 text-accent" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight block leading-tight">
              <span className="gradient-text">NTIBDP</span>
            </span>
            <span className="text-[8px] text-muted-foreground/50 font-mono uppercase tracking-widest">
              Intelligence Platform
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item, idx) => {
          const isActive = location.pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                to={item.href}
                onClick={onNavigate}
                className={cn(
                  "group relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-default overflow-hidden",
                  isActive
                    ? "text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-accent rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 rounded-lg transition-default" />
                )}
                <div className="relative z-10 flex items-center w-full">
                  <item.icon
                    className={cn(
                      "mr-3 h-4 w-4 flex-shrink-0 transition-default",
                      isActive
                        ? "text-accent-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground/60" />
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* AI Prediction Hub Section */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: navigation.length * 0.05 }}
          className="pt-2"
        >
          <button
            onClick={() => toggleSection("aiHub")}
            className={cn(
              "group relative flex items-center px-3 py-2.5 w-full text-sm font-medium rounded-lg transition-default overflow-hidden",
              isAiHubActive || expandedSections.aiHub
                ? "text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {(isAiHubActive || expandedSections.aiHub) && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 bg-accent rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {!(isAiHubActive || expandedSections.aiHub) && (
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 rounded-lg transition-default" />
            )}
            <div className="relative z-10 flex items-center w-full">
              <Brain
                className={cn(
                  "mr-3 h-4 w-4 flex-shrink-0 transition-default",
                  isAiHubActive || expandedSections.aiHub
                    ? "text-accent-foreground"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              <span className="flex-1">🧠 AI Prediction Hub</span>
              <motion.div
                animate={{ rotate: expandedSections.aiHub ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  className={cn(
                    "h-4 w-4",
                    isAiHubActive || expandedSections.aiHub
                      ? "text-accent-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
              </motion.div>
            </div>
          </button>

          {/* AI Prediction Hub Submenu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: expandedSections.aiHub ? 1 : 0,
              height: expandedSections.aiHub ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-2 mt-1 space-y-1">
              {aiPredictionHub.map((item, idx) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group relative flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-default overflow-hidden",
                        isActive
                          ? "text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-submenu"
                          className="absolute inset-0 bg-accent/60 rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {!isActive && (
                        <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 rounded-lg transition-default" />
                      )}
                      <div className="relative z-10 flex items-center w-full">
                        <item.icon
                          className={cn(
                            "mr-2 h-3.5 w-3.5 flex-shrink-0 transition-default",
                            isActive
                              ? "text-accent-foreground"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        <span className="flex-1">{item.name}</span>
                        {isActive && (
                          <span className="h-1 w-1 rounded-full bg-accent-foreground/60" />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </nav>

      {/* Bottom status */}
      <div className="relative border-t border-border/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <span className="text-[10px] text-muted-foreground font-mono">
            System Online
          </span>
        </div>
      </div>
    </motion.div>
  );
}
