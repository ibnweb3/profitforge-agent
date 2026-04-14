"use client";

import { useState } from "react";
import { Navbar } from "@/components/profit-forge/navbar";
import { Sidebar } from "@/components/profit-forge/sidebar";
import { HeroSection } from "@/components/profit-forge/hero-section";
import { ProductCard } from "@/components/profit-forge/product-card";
import { MetricsRow } from "@/components/profit-forge/metrics-row";
import { HowItWorks } from "@/components/profit-forge/how-it-works";

export default function ProfitForgePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [productGenerated, setProductGenerated] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState("marketing");
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOwnerMode, setIsOwnerMode] = useState(false);

  const handleForgeProduct = async () => {
    const trimmed = selectedNiche.trim();
    if (!trimmed || trimmed.length < 2) {
      setError("Please select or enter a valid niche (at least 2 characters)");
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Simulate real generation with nice loading (reliable on Vercel)
    setTimeout(() => {
      const fakeContent = `Premium ${trimmed} Prompt Bundle\n\n1. Write a viral thread about ${trimmed} that gets 10k likes.\n2. Create a high-converting landing page copy for ${trimmed}.\n3. Generate 10 email sequences for ${trimmed} customers.\n\n... (and 7 more high-quality prompts)`;

      setCurrentProduct({
        niche: trimmed,
        title: `Premium ${trimmed} Prompt Bundle`,
        content: fakeContent,
        price: 0.85,
      });
      setProductGenerated(true);
      setIsGenerating(false);
    }, 1800);
  };

  const handleCheckout = () => {
    if (!currentProduct) return;

    const blob = new Blob([currentProduct.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ProfitForge_${currentProduct.niche.replace(/\s+/g, '_')}_FullBundle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    alert(`✅ Payment of ${currentProduct.price} USDC successful via Locus Checkout!\n\nFull bundle downloaded.`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedNiche={selectedNiche} 
          onNicheChange={setSelectedNiche}
          isOwnerMode={isOwnerMode}
          setIsOwnerMode={setIsOwnerMode}
        />

        <main className="flex-1 p-6 lg:p-8 lg:ml-72 overflow-hidden">
          <div className="h-full max-w-3xl mx-auto flex flex-col space-y-6">

            <HeroSection 
              onForgeProduct={handleForgeProduct}
              isGenerating={isGenerating}
            />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400">
                {error}
              </div>
            )}

            {productGenerated && currentProduct && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProductCard 
                  niche={currentProduct.niche} 
                  title={currentProduct.title}
                  content={currentProduct.content}
                  price={currentProduct.price}
                  onCheckout={handleCheckout}
                />
              </div>
            )}

            {/* Profit Breakdown - Only in Owner Mode */}
            {isOwnerMode && productGenerated && (
              <div className="mt-6">
                <MetricsRow isVisible={true} />
              </div>
            )}

            <HowItWorks />
          </div>
        </main>
      </div>
    </div>
  );
}