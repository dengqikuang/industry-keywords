export interface Keyword {
  word: string;
  definition: string;
  related: string[];
}

export interface Dimension {
  name: string;
  icon: string;
  color: string;
  cssClass: string;
  keywords: Keyword[];
}

export interface GraphNode {
  id: string;
  dimension: string;
  word: string;
  definition: string;
  related: string[];
}

export interface GraphLink {
  source: string;
  target: string;
  relation: string;
}

export interface AnalysisResult {
  id: string;
  industry: string;
  dimensions: Dimension[];
  graph: {
    nodes: GraphNode[];
    links: GraphLink[];
  };
  createdAt: string;
}

export const DIMENSION_CONFIG: Record<string, { icon: string; color: string; cssClass: string }> = {
  "实体层": { icon: "🏢", color: "#FF6B6B", cssClass: "dim-entity" },
  "术语层": { icon: "📖", color: "#4ECDC4", cssClass: "dim-term" },
  "政策层": { icon: "📜", color: "#45B7D1", cssClass: "dim-policy" },
  "资本层": { icon: "💰", color: "#96CEB4", cssClass: "dim-capital" },
  "趋势层": { icon: "📈", color: "#FFEAA7", cssClass: "dim-trend" },
  "产业链层": { icon: "🔗", color: "#DDA0DD", cssClass: "dim-chain" },
  "对比层": { icon: "⚖️", color: "#98D8C8", cssClass: "dim-compare" },
};
