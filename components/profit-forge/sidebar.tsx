"use client";

import { Activity, Wallet, ChevronDown, Plus, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  selectedNiche: string;
  onNicheChange: (niche: string) => void;
  isOwnerMode: boolean;
  setIsOwnerMode: (value: boolean) => void;
}

const predefinedNiches = [
  { value: "marketing", label: "🚀 Marketing & Sales", icon: "🎯" },
  { value: "coding", label: "💻 Coding & Dev", icon: "⚡" },
  { value: "writing", label: "✍️ Writing & Content", icon: "📝" },
  { value: "design", label: "🎨 Design & Creative", icon: "🖼️" },
  { value: "business", label: "💼 Business Strategy", icon: "📈" },
  { value: "productivity", label: "⚙️ Productivity", icon: "🔧" },
];

export function Sidebar({ selectedNiche, onNicheChange, isOwnerMode, setIsOwnerMode }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customNiche, setCustomNiche] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCustomNicheSubmit = () => {
    if (customNiche.trim()) {
      onNicheChange(customNiche.trim());
      setShowCustomInput(false);
      setCustomNiche("");
    }
  };

  return (
    <aside className="hidden lg:block fixed left-0 top-[73px] bottom-0 w-72 border-r border-border/50 bg-sidebar/95 backdrop-blur-xl p-5 space-y-5 overflow-hidden z-50">

      {/* Agent Status - Double-click to toggle Owner Mode */}
      <div 
        onDoubleClick={() => setIsOwnerMode(!isOwnerMode)}
        className="glass-card rounded-2xl p-4 space-y-2 cursor-pointer hover:scale-[1.02] transition-transform"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Agent Status</span>
          <Activity className="w-4 h-4 text-neon-cyan" />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-neon-green" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-neon-green animate-ping opacity-75" />
          </div>
          <span className="font-semibold text-neon-green text-sm">Agent Online</span>
        </div>
        <div className="text-xs text-muted-foreground">Ready to forge premium products</div>
        {isOwnerMode && (
          <div className="text-[10px] text-neon-cyan flex items-center gap-1">
            <Lock className="w-3 h-3" /> Owner Mode Active (Double-click to hide)
          </div>
        )}
      </div>

      {/* Niche Selector */}
      <div className="glass-card rounded-2xl p-4 space-y-3 relative z-40">
        <span className="text-xs text-muted-foreground">Select Niche</span>

        <div className="relative z-50">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted/50 border border-border hover:border-neon-cyan/50 transition-all text-sm"
          >
            <span className="flex items-center gap-2">
              <span>🎯</span>
              <span className="font-medium">{selectedNiche}</span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-card border border-border shadow-2xl z-[100]">
              {predefinedNiches.map((niche) => (
                <button
                  key={niche.value}
                  onClick={() => {
                    onNicheChange(niche.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-muted/50 text-sm ${
                    selectedNiche === niche.value ? 'bg-neon-cyan/10 text-neon-cyan' : ''
                  }`}
                >
                  <span>{niche.icon}</span>
                  <span>{niche.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  setShowCustomInput(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-muted/50 text-sm border-t border-border mt-1"
              >
                <Plus className="w-4 h-4" />
                <span>Custom Niche...</span>
              </button>
            </div>
          )}
        </div>

        {showCustomInput && (
          <div className="pt-2">
            <input
              type="text"
              value={customNiche}
              onChange={(e) => setCustomNiche(e.target.value)}
              placeholder="Type niche and press Enter..."
              className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border focus:border-neon-cyan text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleCustomNicheSubmit()}
              autoFocus
            />
            <p className="text-xs text-muted-foreground mt-1 pl-1">Press Enter to add</p>
          </div>
        )}
      </div>

      {/* Owner Info - Only shown when Owner Mode is active */}
      {isOwnerMode && (
        <div className="glass-card rounded-2xl p-4 space-y-3 border border-neon-cyan/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neon-cyan font-medium">OWNER DASHBOARD</span>
            <Lock className="w-4 h-4 text-neon-cyan" />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profit Wallet</span>
              <span className="font-mono text-xs">0x1a2b...9z8y</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Balance</span>
              <span className="font-semibold text-neon-green">124.50 USDC</span>
            </div>
          </div>

          <div className="pt-3 border-t border-border/50">
            <span className="text-xs text-muted-foreground">Your Stats</span>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="text-center p-3 rounded-xl bg-muted/30">
                <div className="text-xl font-bold text-neon-cyan">12</div>
                <div className="text-xs text-muted-foreground">Products</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/30">
                <div className="text-xl font-bold text-neon-green">$89</div>
                <div className="text-xs text-muted-foreground">Profit</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Public placeholder when Owner Mode is off */}
      {!isOwnerMode && (
        <div className="glass-card rounded-2xl p-4 text-center text-xs text-muted-foreground">
          For Admin: Agent profit & stats
        </div>
      )}
    </aside>
  );
}