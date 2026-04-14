"use client";

import { Zap, Hammer, ShoppingCart, Wallet } from "lucide-react";

const steps = [
  { icon: <Zap className="w-6 h-6" />, title: "Select Niche", desc: "Choose your target market" },
  { icon: <Hammer className="w-6 h-6" />, title: "AI Forges", desc: "Agent creates premium bundles" },
  { icon: <ShoppingCart className="w-6 h-6" />, title: "Sell Product", desc: "Customers pay in USDC" },
  { icon: <Wallet className="w-6 h-6" />, title: "Collect Profit", desc: "Profit sent to your wallet" },
];

export function HowItWorks() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center mb-1">How It Works</h2>
      <p className="text-center text-sm text-muted-foreground mb-4">Four simple steps</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step, index) => (
          <div key={index} className="text-center p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
            <div className="mx-auto w-10 h-10 rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 flex items-center justify-center mb-2 border border-neon-cyan/20">
              {step.icon}
            </div>
            <div className="font-semibold text-sm mb-1">{step.title}</div>
            <p className="text-xs text-muted-foreground leading-tight">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}