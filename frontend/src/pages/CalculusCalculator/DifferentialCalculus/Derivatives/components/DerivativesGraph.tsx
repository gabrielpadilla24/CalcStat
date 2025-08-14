"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type DerivativesGraphProps = {
  latex?: string; // LaTeX desde el backend
  height?: number;
};

function normalizeLatex(latex?: string): string {
  if (!latex) return "";
  const trimmed = latex.trim();
  return trimmed.includes("=") ? trimmed : `y = ${trimmed}`;
}

export default function DerivativesGraph({
  latex,
  height = 500,
}: DerivativesGraphProps) {
  const toPlot = normalizeLatex(latex);
  const expr: DesmosExpression = { id: "main", latex: toPlot || undefined };

  return (
    <DesmosGraph
      title="🧮 Interactive Graphing Calculator"
      height={height}
      expressions={expr}
      ui={{
        expressions: true,
        expressionsCollapsed: true,
        keypad: false,
        settingsMenu: false,
        zoomButtons: true,
        expressionsTopbar: true,
        border: false,
      }}
    />
  );
}
