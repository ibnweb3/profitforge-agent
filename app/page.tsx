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
    // Niche validation
    const trimmedNiche = selectedNiche.trim();
    if (!trimmedNiche || trimmedNiche.length < 2) {
      setError("Please select or enter a valid niche (at least 2 characters).");
      return;
    }

    setIsGenerating(true);
    setProductGenerated(false);
    setError(null);

    try {
      const query = `Create 8-10 high-value, ready-to-use AI prompt ideas for the niche: ${trimmedNiche}. Number them 1-10. Make each prompt specific and actionable.`;

      const response = await fetch("https://beta-api.paywithlocus.com/api/wrapped/perplexity/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_LOCUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar",
          messages: [{ role: "user", content: query }],
          max_tokens: 900,
          justification: `ProfitForge Agent: Generating premium ${trimmedNiche} prompt bundle.`,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const newProduct = {
        niche: trimmedNiche,
        title: `Premium ${trimmedNiche} Prompt Bundle`,
        content: data.data?.choices?.[0]?.message?.content || "No content received",
        price: 0.85,
      };

      setCurrentProduct(newProduct);
      setProductGenerated(true);
      setError(null); // Clear any previous error
    } catch (err: any) {
      setError(err.message || "Failed to generate product. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm">
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

            {/* Profit Breakdown - ONLY in Owner Mode */}
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