"use client"

import { Sparkles, Loader2 } from "lucide-react"

interface HeroSectionProps {
  onForgeProduct: () => void
  isGenerating: boolean
}

export function HeroSection({ onForgeProduct, isGenerating }: HeroSectionProps) {
  return (
    <section className="text-center space-y-3 py-2">
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30">
        <Sparkles className="w-4 h-4 text-neon-cyan" />
        <span className="text-xs text-neon-cyan font-medium">AI-Powered Product Generation</span>
      </div>

      <h1 className="text-3xl font-bold leading-tight">
        Autonomous AI that forges premium products and sends{" "}
        <span className="text-neon-green">real profit</span> to your wallet
      </h1>

      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        One click. Premium prompt bundles. Instant revenue.
      </p>

      <div className="pt-3">
        <button
          onClick={onForgeProduct}
          disabled={isGenerating}
          className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta text-white shadow-xl hover:scale-105 transition-all disabled:opacity-70 w-full max-w-xs mx-auto"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Forging...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🔨 Forge New Product
            </span>
          )}
        </button>
      </div>
    </section>
  )
}