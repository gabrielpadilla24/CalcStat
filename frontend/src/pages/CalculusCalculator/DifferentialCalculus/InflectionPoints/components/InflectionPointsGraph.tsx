// src/components/InflectionPointsGraph.tsx  (o en la carpeta de tu feature)
"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type Props = {
  latex?: string; // f(x) en LaTeX (backend.original)
  firstDerivativeLatex?: string; // f'(x) en LaTeX (backend.first_derivative)
  secondDerivativeLatex?: string; // f''(x) en LaTeX (backend.second_derivative)
  height?: number;
};

const normalize = (s?: string) =>
  s ? (s.includes("=") ? s.trim() : `y = ${s.trim()}`) : "";

export default function InflectionPointsGraph({
  latex,
  firstDerivativeLatex,
  secondDerivativeLatex,
  height = 500,
}: Props) {
  const exprs: DesmosExpression[] = [
    { id: "f", latex: normalize(latex) || undefined },
    { id: "fprime", latex: normalize(firstDerivativeLatex) || undefined },
    { id: "fsecond", latex: normalize(secondDerivativeLatex) || undefined },
  ];

  return (
    <DesmosGraph
      title="f(x), f′(x), f″(x)"
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
