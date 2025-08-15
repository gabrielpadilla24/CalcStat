"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type ImplicitDiffGraphProps = {
  /** LaTeX desde el backend para F(x, y) (puede ser implícita o explícita) */
  latex?: string;
  /** LaTeX desde el backend para dy/dx (si no trae '=', se graficará como y = dy/dx) */
  implicitLatex?: string;
  height?: number;
};

function normalizeLatex(s?: string): string {
  if (!s) return "";
  const t = s.trim();
  // Si contiene "=", lo dejamos (Desmos soporta relaciones implícitas).
  // Si no, lo convertimos a una función explícita: y = ...
  return t.includes("=") ? t : `y = ${t}`;
}

export default function ImplicitDiffGraph({
  latex,
  implicitLatex,
  height = 500,
}: ImplicitDiffGraphProps) {
  // Igual que en DerivativesGraph: dos expresiones, si falta una, el componente base la ignora.
  const exprs: DesmosExpression[] = [
    { id: "f", latex: normalizeLatex(latex) || undefined },
    { id: "fprime", latex: normalizeLatex(implicitLatex) || undefined },
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
