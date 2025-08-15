"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type LimitsGraphProps = {
  /** LaTeX de f(x) que viene del backend (tal cual lo muestras en el card) */
  latex?: string;
  /** LaTeX del valor del límite (sympy.latex), p. ej. "0", "5", "\\infty", "-\\infty", "\\frac{1}{2}" */
  limitLatex?: string;
  height?: number;
};

/** Si no trae un '=', lo convertimos a y = (...) para que Desmos lo entienda. */
function normalizeLatex(s?: string): string {
  if (!s) return "";
  const t = s.trim();
  return t.includes("=") ? t : `y = ${t}`;
}

/** Verifica si el LaTeX del límite indica infinito o no-numérico. */
function isFiniteLimit(limitLatex?: string): boolean {
  if (!limitLatex) return false;
  const t = limitLatex.trim().toLowerCase();
  // \infty o -\infty (en LaTeX de sympy)
  if (t.includes("\\infty")) return false;
  // casos de “indefinido” comunes
  if (t.includes("undefined") || t.includes("nan")) return false;
  return true;
}

export default function LimitsGraph({
  latex,
  limitLatex,
  height = 500,
}: LimitsGraphProps) {
  const exprs: DesmosExpression[] = [
    // Curva de la función
    { id: "f", latex: normalizeLatex(latex) || undefined },
  ];

  // Si el límite es finito, graficamos y = L como línea horizontal
  if (isFiniteLimit(limitLatex)) {
    // Paréntesis por seguridad si viene como fracción u otra forma
    exprs.push({
      id: "limitLine",
      latex: `y = (${limitLatex})`,
      // si tu wrapper soporta estilos, podrías añadir:
      // color: "#888888", lineStyle: "DASHED",
    });
  }

  return (
    <DesmosGraph
      title="📈 Limits Graph"
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
