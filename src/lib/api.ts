import { AnalysisResult, DIMENSION_CONFIG } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_LLM_API_KEY || "";
const API_BASE = process.env.NEXT_PUBLIC_LLM_API_BASE || "https://api.minimaxi.com/v1";

export async function generateIndustryAnalysis(industry: string): Promise<AnalysisResult> {
  const prompt = `请为"${industry}"行业生成100个关键词，按以下7个维度分类，每个维度10-15个：
1. 实体层（公司/人物/机构）
2. 术语层（核心技术名词）
3. 政策层（法规/补贴/标准）
4. 资本层（投资/并购）
5. 趋势层（正在发生的变化）
6. 产业链层（上下游）
7. 对比层（竞争格局/商业模式）

输出JSON格式（严格JSON，不要markdown代码块）：
{
  "industry": "行业名",
  "dimensions": [
    {"name": "实体层", "keywords": [{"word": "词", "definition": "一句话定义", "related": ["关联词1", "关联词2"]}]},
    {"name": "术语层", "keywords": [{"word": "词", "definition": "一句话定义", "related": ["关联词1"]}]},
    ...
  ],
  "graph": {
    "nodes": [{"id": "词", "dimension": "维度", "word": "词", "definition": "定义", "related": ["关联词"]}],
    "links": [{"source": "词1", "target": "词2", "relation": "上下游|替代|互补|竞争|投资"}]
  }
}`;

  const response = await fetch(`${API_BASE}/text/chatcompletion_v2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "abab6.5s-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  
  // Parse JSON from response (handle potential markdown code blocks)
  let jsonStr = content;
  if (content.includes("```json")) {
    jsonStr = content.split("```json")[1].split("```")[0];
  } else if (content.includes("```")) {
    jsonStr = content.split("```")[1].split("```")[0];
  }
  
  const parsed = JSON.parse(jsonStr.trim());
  
  // Enrich dimensions with icons and colors
  const dimensions = parsed.dimensions.map((dim: any) => ({
    ...dim,
    icon: DIMENSION_CONFIG[dim.name]?.icon || "📌",
    color: DIMENSION_CONFIG[dim.name]?.color || "#888888",
    cssClass: DIMENSION_CONFIG[dim.name]?.cssClass || "",
  }));

  return {
    id: crypto.randomUUID(),
    industry: parsed.industry || industry,
    dimensions,
    graph: parsed.graph || { nodes: [], links: [] },
    createdAt: new Date().toISOString(),
  };
}
