"use client"

import { Zap } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl h-14">   {/* Reduced height */}
      <div className="flex items-center justify-between px-6 h-full">   {/* Use full height */}
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <span className="text-lg">🔨</span>
            </div>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
            ProfitForge
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/30 text-sm">
            <Zap className="w-4 h-4 text-neon-purple" />
            <span className="font-medium text-neon-purple">Locus Beta</span>
          </div>
        </div>
      </div>
    </nav>
  )
}