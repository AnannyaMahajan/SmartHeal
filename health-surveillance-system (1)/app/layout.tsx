import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import Navigation from "@/components/navigation"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "HealthGuard AI - Smart Health Surveillance System",
  description:
    "Next-generation AI-powered disease surveillance and early warning system for rural communities. Real-time monitoring, outbreak prediction, and community health management.",
  keywords: ["health surveillance", "AI", "disease prevention", "water quality", "rural health", "outbreak prediction"],
  authors: [{ name: "HealthGuard AI Team" }],
  generator: "v0.app",
  openGraph: {
    title: "HealthGuard AI - Smart Health Surveillance",
    description: "AI-powered disease surveillance and prevention platform",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense
          fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Loading HealthGuard AI...</p>
              </div>
            </div>
          }
        >
          <Navigation />
          <main className="md:ml-72 min-h-screen">{children}</main>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
