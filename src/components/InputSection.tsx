"use client";

import { useState, KeyboardEvent } from "react";

interface Props {
  onAnalyze: (industry: string) => void;
}

export function InputSection({ onAnalyze }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onAnalyze(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-4 py-24"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Decorative orbs */}
      <div
        className="orb orb-1"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)",
          top: -150,
          right: -100,
        }}
      />
      <div
        className="orb orb-2"
        style={{
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, rgba(244,114,182,0.2), transparent 70%)",
          bottom: -80,
          left: -80,
          animationDelay: "-4s",
        }}
      />
      <div
        className="orb orb-3"
        style={{
          width: 240,
          height: 240,
          background:
            "radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)",
          top: "35%",
          left: "3%",
          animationDelay: "-6s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Animated badge */}
        <div className="animate-in mb-6 flex justify-center">
          <span
            className="badge"
            style={{
              background: "rgba(99,102,241,0.08)",
              color: "var(--brand-from)",
              border: "1px solid rgba(99,102,241,0.15)",
              animation: "fadeSlideUp 0.5s ease-out both",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--brand-from)" }}
            />
            Phase 1 · 演示版
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-in delay-1 mb-3 text-5xl font-bold tracking-tight"
          style={{
            letterSpacing: "-0.03em",
            animation: "fadeSlideUp 0.5s ease-out 0.05s both",
          }}
        >
          <span className="text-gradient">行业关键词</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>深度分析</span>
        </h1>

        <p
          className="animate-in delay-2 mb-12 text-base"
          style={{
            color: "var(--text-secondary)",
            animation: "fadeSlideUp 0.5s ease-out 0.1s both",
          }}
        >
          输入任意行业名称，AI 梳理 100+ 关键词
          <br />
          八大维度拆解 · 可视化知识图谱呈现
        </p>

        {/* Input card */}
        <div
          className="animate-in delay-3 rounded-2xl p-2"
          style={{
            background: "var(--bg-surface)",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--border)",
            animation: "fadeSlideUp 0.5s ease-out 0.15s both",
          }}
        >
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="新能源汽车、医疗AI、短剧营销…"
              className="input-glow w-full rounded-xl border-0 bg-transparent px-6 py-5 text-center text-lg outline-none"
              style={{
                color: "var(--text-primary)",
                background: "transparent",
              }}
              autoFocus
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="btn-gradient mt-1 w-full rounded-xl py-4 text-base font-semibold text-white"
            style={{ letterSpacing: "0.02em" }}
          >
            开始分析
          </button>
        </div>

        {/* Feature hints */}
        <div
          className="animate-in delay-4 mt-10 flex justify-center gap-8"
          style={{ animation: "fadeSlideUp 0.5s ease-out 0.2s both" }}
        >
          {[
            { icon: "🧠", label: "AI 智能分析" },
            { icon: "🕸️", label: "知识图谱" },
            { icon: "⚡", label: "2 分钟出结果" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--text-tertiary)" }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
