// src/components/InflectionPointsGraph.tsx
"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type Props = {
  latex?: string; // f(x) en LaTeX (backend.original)
  // ✅ ya no graficamos derivadas
  inflectionPoints?: { x: string; y: string }[]; // exactos en LaTeX
  inflectionPointsCoords?: string[]; // numéricos "(x, y)"
  height?: number;
};

const normalizeFunc = (s?: string) =>
  s ? (s.includes("=") ? s.trim() : `y = ${s.trim()}`) : "";

/** "(a, b)" | "a, b" -> "(a, b)" limpio (sin paréntesis duplicados/espacios) */
const normalizeCoordsString = (s: string) => {
  const stripped = s.trim().replace(/^\(/, "").replace(/\)$/, "");
  const [x, y] = stripped.split(",").map((t) => t.trim());
  if (!x || !y) return "";
  return `(${x}, ${y})`;
};

/** (x_latex, y_latex) -> "(x_latex, y_latex)" (sin \left ... \right para Desmos) */
const toPointLatex = (x: string, y: string) => `(${x}, ${y})`;

export default function InflectionPointsGraph({
  latex,
  inflectionPoints = [],
  inflectionPointsCoords = [],
  height = 500,
}: Props) {
  // 1) f(x)
  const exprs: DesmosExpression[] = [
    { id: "f", latex: normalizeFunc(latex) || undefined },
  ];

  // 2) Confirmed points (prefer exact LaTeX; fallback numeric)
  const exact = (inflectionPoints ?? []).map((pt) => toPointLatex(pt.x, pt.y));
  const numeric = (inflectionPointsCoords ?? [])
    .map(normalizeCoordsString)
    .filter(Boolean);

  const pointsToPlot = exact.length ? exact : numeric;

  pointsToPlot.forEach((ptLatex, i) => {
    exprs.push({
      id: `infl-${i + 1}`,
      latex: ptLatex, // Desmos interpreta "(x, y)" como un punto
    });
  });

  return (
    <DesmosGraph
      title="f(x) with inflection points"
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
