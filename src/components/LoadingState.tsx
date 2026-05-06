"use client";

import { useState, useEffect } from "react";

interface Props {
  industry: string;
  onBack: () => void;
}

const STEPS = [
  "理解行业结构…",
  "分析实体层（企业/品牌）…",
  "梳理术语层（技术/产品）…",
  "挖掘政策层（法规/标准）…",
  "追踪资本层（投资/并购）…",
  "捕捉趋势层（市场动态）…",
  "还原产业链（上下游）…",
  "构建对比关系…",
  "生成知识图谱…",
];

export function LoadingState({ industry, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setDone(true);
          return s;
        }
        return s + 1;
      });
    }, 2600 / STEPS.length);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-16"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Central card */}
      <div
        className="relative w-full max-w-md rounded-3xl p-10 text-center"
        style={{
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-xl)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Orb behind the spinner */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
            borderRadius: "50%",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        {/* Spinner */}
        <div className="relative mx-auto mb-8 h-16 w-16">
          <div
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: "rgba(99,102,241,0.12)" }}
          />
          <div
            className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent"
            style={{
              animation: "spin 1s linear infinite",
            }}
          />
          <div
            className="absolute inset-2 rounded-full border-4 border-t-purple-400 border-r-transparent border-b-transparent border-l-transparent"
            style={{
              animation: "spin 1.5s linear infinite",
              animationDirection: "reverse",
            }}
          />
        </div>

        {/* Title */}
        <h2
          className="mb-2 text-2xl font-bold"
          style={{ letterSpacing: "-0.02em" }}
        >
          正在分析「{industry}」
        </h2>
        <p className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>
          AI 正在梳理八大维度的关键词知识图谱
        </p>

        {/* Steps */}
        <div
          className="mb-8 space-y-2 rounded-2xl p-4 text-left"
          style={{
            background: "var(--bg-base)",
            border: "1px solid var(--border)",
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm transition-all duration-300"
              style={{
                color:
                  i < step
                    ? "var(--success)"
                    : i === step
                    ? "var(--brand-from)"
                    : "var(--text-tertiary)",
                fontWeight: i === step ? 500 : 400,
              }}
            >
              {i < step ? (
                <span>✓</span>
              ) : i === step ? (
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full"
                  style={{
                    background: "var(--brand-from)",
                    animation: "pulseGlow 1.5s ease-in-out infinite",
                  }}
                />
              ) : (
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
              )}
              <span>{s}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onBack}
          className="text-sm transition-colors"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "var(--text-secondary)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "var(--text-tertiary)")
          }
        >
          ← 取消
        </button>
      </div>
    </div>
  );
}
