"use client";

import { useState } from "react";
import type { AnalysisResult, Keyword as KeywordType, Dimension } from "@/lib/types";

interface Props {
  dims: AnalysisResult["dimensions"];
  selectedDim: Dimension["name"] | "全部";
}

export function KeywordGrid({ dims, selectedDim }: Props) {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordType | null>(
    null
  );

  const filteredDims =
    selectedDim === "全部"
      ? dims
      : dims.filter((d) => d.name === selectedDim);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {filteredDims.map((dim, dimIdx) => (
        <div
          key={dim.name}
          className="card-hover rounded-2xl p-5"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
            animation: `fadeSlideUp 0.4s ease-out ${dimIdx * 0.05}s both`,
          }}
        >
          {/* Card header */}
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-base"
              style={{
                background: `${dim.color}18`,
                border: `1px solid ${dim.color}30`,
              }}
            >
              {dim.icon}
            </div>
            <div>
              <h3
                className="font-semibold"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
              >
                {dim.name}
              </h3>
            </div>
            <div
              className="ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                background: `${dim.color}15`,
                color: dim.color,
              }}
            >
              {dim.keywords.length} 个
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {dim.keywords.map((kw) => {
              const isSelected = selectedKeyword?.word === kw.word;
              return (
                <button
                  key={kw.word}
                  onClick={() =>
                    setSelectedKeyword(isSelected ? null : kw)
                  }
                  className="badge transition-all"
                  style={{
                    background: isSelected
                      ? `${dim.color}20`
                      : "var(--bg-base)",
                    color: isSelected ? dim.color : "var(--text-secondary)",
                    border: `1px solid ${
                      isSelected ? `${dim.color}40` : "var(--border)"
                    }`,
                    cursor: "pointer",
                    fontWeight: isSelected ? 500 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.background =
                        `${dim.color}12`;
                      (e.currentTarget as HTMLElement).style.color = dim.color;
                      (e.currentTarget as HTMLElement).style.borderColor =
                        `${dim.color}30`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--bg-base)";
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--border)";
                    }
                  }}
                >
                  {kw.word}
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          {selectedKeyword &&
            dim.keywords.some((k) => k.word === selectedKeyword.word) && (
              <div
                className="mt-4 rounded-xl p-4 text-left"
                style={{
                  background: `${dim.color}08`,
                  border: `1px solid ${dim.color}20`,
                  animation: "fadeSlideUp 0.25s ease-out",
                }}
              >
                <h4
                  className="font-semibold"
                  style={{ color: dim.color, letterSpacing: "-0.01em" }}
                >
                  {selectedKeyword.word}
                </h4>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {selectedKeyword.definition}
                </p>
                {selectedKeyword.related.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      相关：
                    </span>
                    {selectedKeyword.related.map((r) => (
                      <span
                        key={r}
                        className="badge text-xs"
                        style={{
                          background: `${dim.color}10`,
                          color: dim.color,
                          border: "none",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
