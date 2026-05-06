"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { InputSection } from "./InputSection";
import { ResultsView } from "./ResultsView";
import { DemoBanner } from "./DemoBanner";
import { LoadingState } from "./LoadingState";
import type { AnalysisResult } from "@/lib/types";

type View = "input" | "loading" | "results";

export function IndustryKeywordApp() {
  const [view, setView] = useState<View>("input");
  const [industry, setIndustry] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(async (industryName: string) => {
    setIndustry(industryName);
    setView("loading");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: industryName }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "分析失败");
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setView("results");
    } catch (err) {
      console.error("分析失败:", err);
      alert(err instanceof Error ? err.message : "分析失败，请重试");
      setView("input");
    }
  }, []);

  const handleBack = useCallback(() => {
    setView("input");
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoBanner />

      {view === "input" && <InputSection onAnalyze={handleAnalyze} />}

      {view === "loading" && (
        <LoadingState industry={industry} onBack={handleBack} />
      )}

      {view === "results" && result && (
        <ResultsView result={result} onBack={handleBack} />
      )}
    </div>
  );
}
