"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { AnalysisResult } from "@/lib/types";

interface Props {
  graph: AnalysisResult["graph"];
}

const DIMENSION_COLORS: Record<string, string> = {
  实体层: "#FF6B6B",
  术语层: "#4ECDC4",
  政策层: "#45B7D1",
  资本层: "#96CEB4",
  趋势层: "#FFEAA7",
  产业链层: "#DDA0DD",
  对比层: "#98D8C8",
};

export function D3Graph({ graph }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 600;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M 0,-5 L 10,0 L 0,5")
      .attr("fill", "#999");

    const g = svg.append("g");

    // Zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initial center
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2));

    // Nodes
    const nodes = graph.nodes.map((n) => ({
      ...n,
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
    }));

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    // Links
    const links = graph.links
      .map((l) => ({
        source: nodeMap.get(l.source as string)!,
        target: nodeMap.get(l.target as string)!,
        relation: l.relation,
      }))
      .filter((l) => l.source && l.target);

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide(30));

    // Links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)");

    // Link labels
    const linkLabel = g
      .append("g")
      .selectAll("text")
      .data(links)
      .join("text")
      .attr("fill", "#999")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .text((d) => d.relation);

    // Nodes
    const node = g
      .append("g")
      .selectAll<SVGGElement, typeof nodes[0]>("g")
      .data(nodes)
      .join("g")
      .call(
        d3
          .drag<SVGGElement, typeof nodes[0]>()
          .on("start", (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Node circles
    node
      .append("circle")
      .attr("r", 16)
      .attr("fill", (d) => DIMENSION_COLORS[d.dimension] || "#888")
      .attr("fill-opacity", 0.85)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer");

    // Node labels
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 32)
      .attr("font-size", 11)
      .attr("fill", "#333")
      .attr("font-weight", "500")
      .text((d) => d.word);

    // Tooltip
    const tooltip = d3
      .select(container)
      .append("div")
      .style(
        "position",
        "absolute",
      )
      .style("background", "white")
      .style("border", "1px solid #e5e7eb")
      .style("border-radius", "12px")
      .style("padding", "12px")
      .style("box-shadow", "0 4px 12px rgba(0,0,0,0.1)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("max-width", "260px")
      .style("z-index", "10");

    node
      .on("mouseenter", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<div style="font-weight:600;color:${
              DIMENSION_COLORS[d.dimension] || "#333"
            }">${d.word}</div>
             <div style="margin-top:4px;font-size:12px;color:#666">${
               d.definition
             }</div>
             <div style="margin-top:6px;font-size:11px;color:#999">维度: ${
               d.dimension
             }</div>`
          );
      })
      .on("mousemove", (event) => {
        const [mx, my] = d3.pointer(event, container);
        tooltip
          .style("left", `${mx + 15}px`)
          .style("top", `${my - 10}px`);
      })
      .on("mouseleave", () => {
        tooltip.style("opacity", 0);
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      linkLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [graph]);

  return (
    <div ref={containerRef} className="relative rounded-2xl bg-gray-50 overflow-hidden border border-gray-200">
      <svg ref={svgRef} className="w-full" />
      <div className="absolute bottom-4 right-4 rounded-lg bg-white px-3 py-2 text-xs text-gray-500 shadow">
        🖱️ 拖拽节点 · 滚轮缩放 · hover 看详情
      </div>
    </div>
  );
}
