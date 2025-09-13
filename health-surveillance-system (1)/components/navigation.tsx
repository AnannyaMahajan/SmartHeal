"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, FileText, Droplets, Brain, Bell, BookOpen, Menu, Activity, Shield, Zap, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, description: "System overview & analytics" },
  { name: "Report Case", href: "/report", icon: FileText, description: "Community health reporting" },
  { name: "Water Quality", href: "/water-quality", icon: Droplets, description: "Real-time monitoring" },
  { name: "AI Predictions", href: "/predictions", icon: Brain, description: "Outbreak forecasting" },
  { name: "Alerts", href: "/alerts", icon: Bell, badge: 3, description: "Emergency notifications" },
  { name: "Education", href: "/education", icon: BookOpen, description: "Health resources" },
]

const systemStats = [
  { label: "System Status", value: "Operational", icon: Activity, color: "text-green-500" },
  { label: "AI Accuracy", value: "92.3%", icon: Brain, color: "text-blue-500" },
  { label: "Coverage", value: "15 Communities", icon: Shield, color: "text-purple-500" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background/95 backdrop-blur-sm border-border/50 shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <nav
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 border-r border-sidebar-border backdrop-blur-xl transition-transform duration-300 ease-in-out z-40 shadow-xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  HealthGuard AI
                </h2>
                <p className="text-xs text-sidebar-foreground/70">Smart Surveillance Platform</p>
              </div>
            </div>

            <div className="space-y-2">
              {systemStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-3 w-3 ${stat.color}`} />
                    <span className="text-sidebar-foreground/70">{stat.label}</span>
                  </div>
                  <span className="font-medium text-sidebar-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 space-y-2">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
                Navigation
              </h3>
            </div>

            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-sidebar-primary to-sidebar-primary/90 text-sidebar-primary-foreground shadow-lg scale-[1.02]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:scale-[1.01]",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-sidebar-primary-foreground rounded-r-full" />
                  )}

                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-sidebar-primary-foreground/20"
                        : "bg-sidebar-accent/30 group-hover:bg-sidebar-accent/50",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-2 h-5 px-2 text-xs",
                            isActive
                              ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                              : "bg-destructive text-destructive-foreground",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-xs truncate transition-colors",
                        isActive
                          ? "text-sidebar-primary-foreground/70"
                          : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground/70",
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="p-4 border-t border-sidebar-border/50 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-sidebar-foreground/50">Version 2.1.0</span>
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                <Zap className="mr-1 h-3 w-3" />
                Live
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs h-8 bg-transparent">
                Support
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs h-8 bg-transparent">
                Settings
              </Button>
            </div>

            <p className="text-xs text-sidebar-foreground/40 text-center">© 2024 HealthGuard AI</p>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
