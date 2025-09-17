"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

export type AbsoluteExtrema = {
  max: string | null; // ej: "(1.23, 4.56)" o null
  min: string | null; // ej: "(-2, 0.5)"  o null
};

type CriticalPointsGraphProps = {
  /** LaTeX desde el backend para f(x), f'(x), f''(x) */
  latex?: string; // original (sympy_latex)
  firstDerivativeLatex?: string; // primera derivada
  secondDerivativeLatex?: string; // segunda derivada
  /** Extremos absolutos formateados como "(x, y)" o null (desde el backend) */
  absoluteExtrema?: AbsoluteExtrema;
  height?: number;
};

function normalizeLatexFunc(s?: string): string {
  if (!s) return "";
  const t = s.trim();
  // Si no trae "=", le agregamos "y = ..."
  return t.includes("=") ? t : `y = ${t}`;
}

/** Convierte "(x, y)" a algo que Desmos entienda como punto.
 *  Si viene con espacios: "( 1.2 ,  3 )" lo normaliza a "(1.2, 3)".
 *  Si no hay punto, retorna undefined.
 */
function toPointLatex(p?: string | null): string | undefined {
  if (!p) return undefined;
  const raw = p.trim();
  // Aceptamos "(x, y)" o "x, y"
  const match = raw.match(
    /^\(?\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*\)?$/
  );
  if (!match) return undefined;
  const x = match[1];
  const y = match[3];
  // Desmos acepta "(x, y)" como punto
  return `(${x}, ${y})`;
}

export default function CriticalPointsGraph({
  latex,
  firstDerivativeLatex,
  secondDerivativeLatex,
  absoluteExtrema,
  height = 500,
}: CriticalPointsGraphProps) {
  const exprs: DesmosExpression[] = [
    { id: "f", latex: normalizeLatexFunc(latex) || undefined },
    {
      id: "fprime",
      latex: normalizeLatexFunc(firstDerivativeLatex) || undefined,
    },
    {
      id: "fsecond",
      latex: normalizeLatexFunc(secondDerivativeLatex) || undefined,
    },
  ];

  const maxPoint = toPointLatex(absoluteExtrema?.max);
  const minPoint = toPointLatex(absoluteExtrema?.min);

  if (maxPoint) exprs.push({ id: "absmax", latex: maxPoint });
  if (minPoint) exprs.push({ id: "absmin", latex: minPoint });

  return (
    <div className="w-full">
      <div className="w-full max-w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
        <DesmosGraph
          title="📎 Critical Points Graph"
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
      </div>
    </div>
  );
}
