"use client"

import { Check, Sparkles, Copy, Star, Loader2 } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  niche: string
  title: string
  content: string
  price?: number
}

export function ProductCard({ 
  niche, 
  title, 
  content, 
  price = 0.85 
}: ProductCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const samplePrompts = [
    { title: "Viral Hook Generator", preview: "Create 10 scroll-stopping social media hooks for [topic] that drive high engagement..." },
    { title: "Content Calendar Architect", preview: "Build a 30-day content plan for [niche] with trending topics..." },
    { title: "Ad Copy Alchemist", preview: "Turn this idea into high-converting ad copy with compelling headlines..." },
  ]

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    try {
      // Simulate real Locus Checkout session creation (reliable for demo)
      await new Promise(resolve => setTimeout(resolve, 1400))

      // Auto download the full bundle
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ProfitForge_${niche.replace(/\s+/g, '_')}_FullBundle.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      alert(`✅ Payment of ${price} USDC successful via Locus Checkout!\n\nFull prompt bundle downloaded.`)

    } catch (err) {
      alert("Checkout failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 neon-border">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-neon-green/20 border border-neon-green/30">
              <span className="text-xs font-semibold text-neon-green">NEW</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">High-value AI prompts based on current trends</p>
        </div>
        
        <div className="flex-shrink-0">
          <div className="relative px-6 py-4 rounded-2xl bg-card border border-neon-cyan/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-cyan">{price}</div>
              <div className="text-sm text-muted-foreground">USDC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-3">
        {["8-10 Premium Prompts", "Copy-Paste Ready", "Trend-Optimized", "Instant Download"].map((feature, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            <Check className="w-4 h-4 text-neon-green" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* Sample Prompts */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-neon-purple" />
          <span>Preview Sample Prompts</span>
        </div>
        
        <div className="grid gap-3">
          {samplePrompts.map((prompt, i) => (
            <div key={i} className="group p-4 rounded-xl bg-muted/30 border border-border hover:border-neon-cyan/30 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-neon-purple/20 text-neon-purple font-medium">#{i + 1}</span>
                    <h4 className="font-semibold">{prompt.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{prompt.preview}</p>
                </div>
                <button
                  onClick={() => handleCopy(prompt.preview, i)}
                  className="flex-shrink-0 p-2 rounded-lg bg-muted/50 hover:bg-neon-cyan/20 transition-colors opacity-0 group-hover:opacity-100"
                >
                  {copiedIndex === i ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Button with Nice Loading */}
      <div className="pt-4">
        <button 
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Locus Checkout Session...
            </>
          ) : (
            <>
              🛒 Pay {price} USDC & Download Full Bundle
            </>
          )}
        </button>
      </div>
    </div>
  )
}