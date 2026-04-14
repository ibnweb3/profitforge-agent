"use client"

import { TrendingUp, DollarSign, Coins, ArrowRight } from "lucide-react"

interface MetricsRowProps {
  isVisible: boolean
}

export function MetricsRow({ isVisible }: MetricsRowProps) {
  if (!isVisible) return null

  const metrics = [
    {
      label: "AI Generation Cost",
      value: "0.20",
      unit: "USDC",
      icon: Coins,
      color: "text-muted-foreground",
      bgColor: "bg-muted/30"
    },
    {
      label: "Selling Price",
      value: "0.85",
      unit: "USDC",
      icon: DollarSign,
      color: "text-neon-cyan",
      bgColor: "bg-neon-cyan/10"
    },
    {
      label: "Your Profit",
      value: "0.65",
      unit: "USDC",
      icon: TrendingUp,
      color: "text-neon-green",
      bgColor: "bg-neon-green/10",
      highlight: true
    }
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-neon-green" />
          <h3 className="font-semibold text-foreground">Profit Breakdown</h3>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-4 w-full md:w-auto">
              <div className={`flex-1 md:flex-none flex items-center gap-4 p-4 rounded-xl ${metric.bgColor} ${metric.highlight ? 'ring-2 ring-neon-green/30' : ''}`}>
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <div className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value} <span className="text-sm font-normal">{metric.unit}</span>
                  </div>
                </div>
              </div>
              
              {i < metrics.length - 1 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Profit percentage */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Profit Margin:</span>
          <span className="text-lg font-bold text-neon-green">+76%</span>
          <span className="px-2 py-0.5 rounded-full bg-neon-green/20 text-xs font-semibold text-neon-green">
            Excellent ROI
          </span>
        </div>
      </div>
    </div>
  )
}
