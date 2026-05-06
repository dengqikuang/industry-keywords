import { NextRequest, NextResponse } from "next/server";
import { DEMO_DATA } from "@/lib/demo-data";

export async function POST(request: NextRequest) {
  try {
    const { industry } = await request.json();

    if (!industry || typeof industry !== "string") {
      return NextResponse.json(
        { error: "请提供有效的行业名称" },
        { status: 400 }
      );
    }

    const industryName = industry.trim();

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return demo data if no API key
      return NextResponse.json({
        ...DEMO_DATA,
        industry: industryName,
        createdAt: new Date().toISOString(),
      });
    }

    // If API key is set, call OpenAI
    // For Phase 1, we use demo data but this is where the real API call would go
    // TODO: Implement real analysis with OpenAI
    return NextResponse.json({
      ...DEMO_DATA,
      industry: industryName,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("分析失败:", error);
    return NextResponse.json(
      { error: "分析失败，请重试" },
      { status: 500 }
    );
  }
}
