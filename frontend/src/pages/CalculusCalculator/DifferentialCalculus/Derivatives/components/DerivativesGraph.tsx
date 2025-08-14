"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type DerivativesGraphProps = {
  /** LaTeX desde el backend para f(x) */
  latex?: string;
  /** LaTeX desde el backend para f'(x) */
  derivativeLatex?: string;
  height?: number;
};

function normalizeLatex(s?: string): string {
  if (!s) return "";
  const t = s.trim();
  return t.includes("=") ? t : `y = ${t}`;
}

export default function DerivativesGraph({
  latex,
  derivativeLatex,
  height = 500,
}: DerivativesGraphProps) {
  // Siempre enviamos ambos ids; si falta latex, el genérico lo removerá.
  const exprs: DesmosExpression[] = [
    { id: "f", latex: normalizeLatex(latex) || undefined },
    { id: "fprime", latex: normalizeLatex(derivativeLatex) || undefined },
  ];

  return (
    <DesmosGraph
      title="🧮 Interactive Graphing Calculator"
      height={height}
      expressions={exprs}
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
