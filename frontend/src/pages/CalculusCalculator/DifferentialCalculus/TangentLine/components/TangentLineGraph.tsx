"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type TangentLineGraphProps = {
  /** f(x) en LaTeX devuelto por el backend (data.original) */
  latex?: string;
  /** y = ... de la recta tangente (data.fxTangent) */
  tangentLatex?: string;
  /** Punto de tangencia */
  x0?: number;
  y0?: number;
  height?: number;
};

function normalizeFuncLatex(s?: string): string {
  if (!s) return "";
  let t = s.trim();

  // quitar $...$ si viniera con delimitadores
  if (
    (t.startsWith("$$") && t.endsWith("$$")) ||
    (t.startsWith("$") && t.endsWith("$"))
  ) {
    t = t.replace(/^\${1,2}|\${1,2}$/g, "");
  }

  // asegurar lado izquierdo
  if (!t.includes("=")) t = `y = ${t}`;
  return t;
}

function fmt(n?: number, digits = 6): string | undefined {
  if (typeof n !== "number" || !isFinite(n)) return undefined;
  // recorta ceros finales
  let s = n.toFixed(digits);
  s = s.replace(/\.?0+$/, "");
  return s;
}

export default function TangentLineGraph({
  latex,
  tangentLatex,
  x0,
  y0,
  height = 500,
}: TangentLineGraphProps) {
  const exprs: DesmosExpression[] = [
    { id: "f", latex: normalizeFuncLatex(latex) || undefined },
    { id: "tangent", latex: normalizeFuncLatex(tangentLatex) || undefined },
  ];

  const sx = fmt(x0);
  const sy = fmt(y0);
  if (sx && sy) {
    // Desmos acepta "(x, y)" para puntos
    exprs.push({ id: "point", latex: `(${sx}, ${sy})` });
  }

  return (
    <DesmosGraph
      title="📐 Tangent Line Graph"
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
