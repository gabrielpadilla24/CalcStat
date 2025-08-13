"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type DerivativesGraphProps = {
  /** Ej: "x^2 + 2x + 1" o "y=x^2+2". Si viene sin "y=", se lo añadimos. */
  expression?: string;
  /** LaTeX listo para Desmos, ej: "y = x^{2} + 2x + 1" */
  latex?: string;
  height?: number;
};

export default function DerivativesGraph({
  expression,
  latex,
  height = 500,
}: DerivativesGraphProps) {
  const toPlot =
    (latex && latex.trim()) ||
    (expression && expression.trim()
      ? expression.trim().startsWith("y=")
        ? expression.trim()
        : `y=${expression.trim()}`
      : "");

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
