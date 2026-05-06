export function DemoBanner() {
  return (
    <div
      className="relative overflow-hidden py-2.5 text-center text-sm"
      style={{
        background: "linear-gradient(90deg, #f5f3ff 0%, #ede9fe 50%, #fce7f3 100%)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
      }}
    >
      {/* Subtle dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10">
        <span style={{ color: "#7c3aed", fontWeight: 500 }}>🚗</span>
        <span style={{ color: "#6b7280", marginLeft: 6 }}>
          当前演示数据：新能源汽车行业
        </span>
        <span style={{ color: "#a78bfa", margin: "0 8px" }}>·</span>
        <button
          className="font-medium underline underline-offset-2"
          style={{ color: "#7c3aed" }}
          onClick={() => {
            const input = document.querySelector("input") as HTMLInputElement;
            if (input) input.value = "新能源汽车";
            const event = new Event("input", { bubbles: true });
            input?.dispatchEvent(event);
          }}
        >
          切换行业
        </button>
      </div>
    </div>
  );
}
