// app/api/checkout/session/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount, description, niche } = await request.json();

    const response = await fetch("https://beta-api.paywithlocus.com/api/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LOCUS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        currency: "USDC",
        description: description,
        metadata: {
          niche: niche || "general",
          source: "ProfitForge Agent",
          type: "ai-prompt-bundle"
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        error: data.error || data.message || "Failed to create checkout session" 
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      sessionId: data.id || data.sessionId,
      checkoutUrl: data.checkoutUrl || data.url,
      ...data
    });

  } catch (error: any) {
    console.error("Checkout session creation error:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      message: error.message 
    }, { status: 500 });
  }
}