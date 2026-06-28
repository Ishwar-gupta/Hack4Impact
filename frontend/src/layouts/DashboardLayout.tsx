import { Outlet } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Chatbot } from "@/components/chatbot/Chatbot"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="hidden lg:flex" />

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-label="Close sidebar navigation"
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative h-full w-64"
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 z-20 rounded-lg border border-border/30 bg-secondary/50 p-2 text-muted-foreground transition-default hover:text-foreground"
              aria-label="Close sidebar navigation"
            >
              <X className="h-4 w-4" />
            </button>
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </motion.div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
        <Chatbot />
      </div>
    </div>
  )
}
