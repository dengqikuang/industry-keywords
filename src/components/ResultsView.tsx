"use client";

import { useState } from "react";
import type { AnalysisResult, Dimension } from "@/lib/types";
import { KeywordGrid } from "./KeywordGrid";
import { D3Graph } from "./D3Graph";
import { SummaryCards } from "./SummaryCards";

interface Props {
  result: AnalysisResult;
  onBack: () => void;
}

type Tab = "grid" | "graph" | "summary";

const TAB_CONFIG: Record<Tab, { label: string; icon: string }> = {
  grid: { label: "关键词", icon: "📋" },
  graph: { label: "关系图", icon: "🕸️" },
  summary: { label: "摘要", icon: "📊" },
};

export function ResultsView({ result, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("grid");
  const [selectedDim, setSelectedDim] = useState<Dimension["name"] | "全部">(
    "全部"
  );

  const dims = result.dimensions;
  const totalKeywords = dims.reduce((acc, d) => acc + d.keywords.length, 0);

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Sticky glass header */}
      <div
        className="sticky top-0 z-20 border-b"
        style={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          {/* Top row: breadcrumb + tabs */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: back + title */}
            <div>
              <button
                onClick={onBack}
                className="mb-1 flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-secondary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-tertiary)")
                }
              >
                <span>←</span>
                <span>新建分析</span>
              </button>
              <h1
                className="text-2xl font-bold"
                style={{ letterSpacing: "-0.02em" }}
              >
                {result.industry}
              </h1>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                {totalKeywords} 个关键词 · {dims.length} 个维度
              </p>
            </div>

            {/* Right: tab pills */}
            <div
              className="flex rounded-xl p-1"
              style={{
                background: "var(--bg-base)",
                border: "1px solid var(--border)",
              }}
            >
              {(Object.keys(TAB_CONFIG) as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    background:
                      activeTab === tab
                        ? "var(--bg-surface)"
                        : "transparent",
                    color:
                      activeTab === tab
                        ? "var(--text-primary)"
                        : "var(--text-tertiary)",
                    boxShadow:
                      activeTab === tab
                        ? "var(--shadow-sm)"
                        : "none",
                  }}
                >
                  <span>{TAB_CONFIG[tab].icon}</span>
                  <span>{TAB_CONFIG[tab].label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dimension filter pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDim("全部")}
              className="badge transition-all"
              style={{
                background:
                  selectedDim === "全部"
                    ? "var(--text-primary)"
                    : "var(--bg-elevated)",
                color:
                  selectedDim === "全部"
                    ? "var(--text-inverse)"
                    : "var(--text-secondary)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              全部
              <span
                style={{
                  background:
                    selectedDim === "全部"
                      ? "rgba(255,255,255,0.2)"
                      : "var(--border)",
                  color:
                    selectedDim === "全部"
                      ? "white"
                      : "var(--text-tertiary)",
                  borderRadius: "9999px",
                  padding: "0 6px",
                  fontSize: 10,
                }}
              >
                {totalKeywords}
              </span>
            </button>
            {dims.map((dim) => (
              <button
                key={dim.name}
                onClick={() => setSelectedDim(dim.name)}
                className="badge transition-all"
                style={{
                  background:
                    selectedDim === dim.name
                      ? dim.color
                      : `${dim.color}18`,
                  color:
                    selectedDim === dim.name
                      ? "white"
                      : dim.color,
                  cursor: "pointer",
                }}
              >
                {dim.icon} {dim.name}
                <span
                  style={{
                    background:
                      selectedDim === dim.name
                        ? "rgba(255,255,255,0.25)"
                        : `${dim.color}30`,
                  color:
                    selectedDim === dim.name
                      ? "white"
                      : dim.color,
                    padding: "0 6px",
                    fontSize: 10,
                  }}
                >
                  {dim.keywords.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        {activeTab === "grid" && (
          <KeywordGrid dims={dims} selectedDim={selectedDim} />
        )}
        {activeTab === "graph" && <D3Graph graph={result.graph} />}
        {activeTab === "summary" && (
          <SummaryCards dims={dims} industry={result.industry} />
        )}
      </div>
    </div>
  );
}
