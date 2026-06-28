import { Bell, User, Moon, Sun, LogIn, Activity, Menu } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { CommandMenu } from "@/components/common/CommandMenu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type NavbarProps = {
  onMenuClick?: () => void;
};

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative flex h-16 items-center justify-between border-b border-border/50 bg-card/70 backdrop-blur-xl px-4 sm:px-6 overflow-hidden"
    >
      {/* Horizontal scan line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      {/* Left: Mobile menu + Logo + Command Menu */}
      <div className="relative z-10 flex flex-1 items-center gap-3 sm:gap-6 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg border border-border/30 bg-secondary/30 p-2 text-muted-foreground transition-default hover:border-accent/40 hover:text-foreground"
          aria-label="Open sidebar navigation"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/30">
            <Activity className="h-4 w-4 text-accent" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-base tracking-tight">
            <span className="gradient-text">NTIBDP</span>
          </span>
        </div>

        <div className="hidden md:block w-72 lg:w-80">
          <CommandMenu />
        </div>
      </div>

      {/* Center: Live status */}
      <div className="relative z-10 hidden xl:flex items-center gap-2 px-4">
        <span className="live-dot" />
        <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
          System Live
        </span>
        <span className="text-[10px] text-muted-foreground/50 font-mono">
          v2.4.1
        </span>
      </div>

      {/* Right: Actions */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground transition-default border border-border/30 hover:border-accent/40 bg-secondary/30 hover:bg-secondary/60"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground transition-default border border-border/30 hover:border-accent/40 bg-secondary/30 hover:bg-secondary/60"
          aria-label="Notifications"
        >
          <span className="absolute top-1.5 right-1.5 block h-1.5 w-1.5 rounded-full bg-destructive ring-1 ring-card" />
          <Bell className="h-4 w-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-foreground border border-border/30 hover:border-accent/40 bg-secondary/30 hover:bg-secondary/60 transition-default"
        >
          <LogIn className="h-3.5 w-3.5" />
          Log In
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground border border-accent/30 shadow-lg shadow-accent/10 hover:shadow-accent/25 transition-default"
          aria-label="Profile"
        >
          <User className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.header>
  );
}
