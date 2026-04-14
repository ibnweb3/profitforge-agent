"use client"

import { Zap } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl h-14">
      <div className="flex items-center justify-between px-6 h-full">
        
        {/* Logo with your chosen image */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="ProfitForge Agent" 
            className="w-35 h-12 object-contain" 
          />
        </div>

        {/* Right side - Locus Beta badge */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/30">
            <Zap className="w-4 h-4 text-neon-purple" />
            <span className="text-sm font-medium text-neon-purple">Locus Beta</span>
          </div>
        </div>
      </div>
    </nav>
  )
}