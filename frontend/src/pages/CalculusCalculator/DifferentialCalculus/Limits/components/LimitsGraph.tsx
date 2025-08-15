"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type LimitsGraphProps = {
  /** LaTeX de f(x) proveniente del backend (`original` en la respuesta) */
  latex?: string;
  /** LaTeX del valor del límite (sympy.latex), p. ej. "0", "5", "\\infty", "-\\infty", "\\frac{1}{2}" */
  limitLatex?: string;
  height?: number;
};

/** Convierte a y = (...) si el LaTeX no tiene '=' */
function normalizeLatex(s?: string): string {
  if (!s) return "";
  const t = s.trim();
  return t.includes("=") ? t : `y = ${t}`;
}

/** Verifica si el límite es finito */
function isFiniteLimit(limitLatex?: string): boolean {
  if (!limitLatex) return false;
  const t = limitLatex.trim().toLowerCase();
  if (t.includes("\\infty")) return false;
  if (t.includes("undefined") || t.includes("nan")) return false;
  return true;
}

export default function LimitsGraph({
  latex,
  limitLatex,
  height = 500,
}: LimitsGraphProps) {
  const exprs: DesmosExpression[] = [];

  // Graficar la función
  if (latex) {
    exprs.push({ id: "f", latex: normalizeLatex(latex) });
  }

  // Graficar la línea horizontal del límite si es finito
  if (isFiniteLimit(limitLatex)) {
    exprs.push({
      id: "limitLine",
      latex: `y = (${limitLatex})`,
    });
  }

  return (
    <DesmosGraph
      title="📈 Limits Graph"
      height={height}
      expressions={exprs}
      ui={{
        expressions: true,
        expressionsCollapsed: false,
        keypad: false,
        settingsMenu: false,
        zoomButtons: true,
        expressionsTopbar: true,
        border: false,
      }}
    />
  );
}
