import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Upload, Zap } from "lucide-react";

interface ModeCard {
  id: "manual" | "batch";
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const modeCards: ModeCard[] = [
  {
    id: "manual",
    title: "Manual Prediction",
    description: "Enter individual data to get personalized brain drain risk assessment",
    icon: <Zap className="w-8 h-8" />,
    features: [
      "Real-time prediction",
      "Detailed AI explanation",
      "Personalized recommendations",
      "Interactive visualizations",
      "Feature importance analysis",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "batch",
    title: "CSV Batch Prediction",
    description: "Upload CSV files for bulk predictions and dataset analysis",
    icon: <Upload className="w-8 h-8" />,
    features: [
      "Process thousands of records",
      "CSV validation & preview",
      "Batch processing progress",
      "Data export (CSV/JSON/Excel)",
      "Statistical analysis",
    ],
    color: "from-purple-500 to-pink-500",
  },
];

interface ModeSelectorProps {
  onSelectMode: (mode: "manual" | "batch") => void;
  selectedMode?: "manual" | "batch";
}

export function ModeSelector({ onSelectMode, selectedMode }: ModeSelectorProps) {
  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          🧠 Brain Drain Prediction Engine
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Analyze migration risks with advanced AI-powered predictions. Choose your analysis mode
          to get started.
        </p>
      </motion.div>

      {/* Mode Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {modeCards.map((mode, idx) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => onSelectMode(mode.id)}
            className="cursor-pointer group"
          >
            <Card className="relative h-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl hover:border-accent/50 transition-colors duration-300">
              {/* Background gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${mode.color} pointer-events-none`}
              />

              {/* Animated border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} rounded-lg blur opacity-20`} />
              </div>

              {/* Content */}
              <div className="relative p-8 space-y-6 h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`inline-flex w-fit p-3 rounded-lg bg-gradient-to-br ${mode.color} text-white`}
                >
                  {mode.icon}
                </motion.div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">{mode.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{mode.description}</p>
                </div>

                {/* Features */}
                <div className="flex-1 space-y-2">
                  {mode.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${mode.color}`} />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 
                    ${
                      selectedMode === mode.id
                        ? `bg-gradient-to-r ${mode.color} text-white shadow-lg shadow-accent/25`
                        : "bg-secondary/50 text-foreground hover:bg-secondary border border-border/50"
                    }
                  `}
                >
                  <span>{selectedMode === mode.id ? "Selected" : "Choose"}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
