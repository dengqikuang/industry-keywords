import type { AnalysisResult } from "@/lib/types";

interface Props {
  dims: AnalysisResult["dimensions"];
  industry: string;
}

export function SummaryCards({ dims, industry }: Props) {
  const totalKeywords = dims.reduce((acc, d) => acc + d.keywords.length, 0);
  const totalRelations = dims.reduce(
    (acc, d) => acc + d.keywords.reduce((a, kw) => a + kw.related.length, 0),
    0
  );

  const statCards = [
    {
      label: "关键词总数",
      value: totalKeywords,
      color: "var(--brand-from)",
      bg: "rgba(99,102,241,0.08)",
    },
    {
      label: "分析维度",
      value: dims.length,
      color: "#10B981",
      bg: "rgba(16,185,129,0.08)",
    },
    {
      label: "关联关系",
      value: totalRelations,
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.08)",
    },
    {
      label: "平均关联度",
      value: (totalRelations / Math.max(totalKeywords, 1)).toFixed(1),
      color: "#EC4899",
      bg: "rgba(236,72,153,0.08)",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className="card-hover rounded-2xl p-5"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
              animation: `fadeSlideUp 0.4s ease-out ${i * 0.06}s both`,
            }}
          >
            <div className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div
              className="mt-1 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Dimension breakdown */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h3
          className="mb-5 text-base font-semibold"
          style={{ letterSpacing: "-0.01em" }}
        >
          各维度关键词分布
        </h3>
        <div className="space-y-4">
          {dims.map((dim) => {
            const pct = (dim.keywords.length / totalKeywords) * 100;
            return (
              <div key={dim.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span
                    className="flex items-center gap-2 font-medium"
                    style={{ color: dim.color }}
                  >
                    <span>{dim.icon}</span>
                    <span>{dim.name}</span>
                  </span>
                  <span style={{ color: "var(--text-tertiary)" }}>
                    {dim.keywords.length} 个 · {pct.toFixed(0)}%
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-base)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${dim.color}cc, ${dim.color})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top entities + terms */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[
          {
            dimName: "实体层",
            icon: "🏢",
            label: "核心企业",
            field: "word" as const,
          },
          {
            dimName: "术语层",
            icon: "📖",
            label: "核心术语",
            field: "word" as const,
          },
        ].map(({ dimName, icon, label, field }) => {
          const dim = dims.find((d) => d.name === dimName);
          if (!dim) return null;
          return (
            <div
              key={dimName}
              className="rounded-2xl p-6"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
                <span>{icon}</span>
                <span style={{ letterSpacing: "-0.01em" }}>{label}</span>
              </h3>
              <div className="space-y-2">
                {dim.keywords.slice(0, 6).map((kw) => (
                  <div
                    key={kw.word}
                    className="flex items-start gap-3 rounded-xl p-3"
                    style={{ background: "var(--bg-base)" }}
                  >
                    <div
                      className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: dim.color, marginTop: 8 }}
                    />
                    <div>
                      <div
                        className="font-medium text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {kw.word}
                      </div>
                      <div
                        className="mt-0.5 line-clamp-1 text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {kw.definition}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
