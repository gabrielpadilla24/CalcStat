"use client";

import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type IntegralsResultProps = {
  /** f(x) en LaTeX que viene del input (MathQuill) */
  original: string;
  /** Resultado devuelto por el backend (texto) */
  integral: string;
  /** Opcional si luego el backend lo envía en LaTeX */
  integralLatex?: string;
  /** Opcional: pasos / tipo si luego los envías */
  steps?: string[];
  tipo?: string;
  originalLatex?: string; // si quisieras sobreescribir el original en LaTeX
};

const IntegralsResult: React.FC<IntegralsResultProps> = ({
  original,
  integral,
  integralLatex,
  steps,
  tipo,
  originalLatex,
}) => {
  const hasResult = Boolean(original && (integral || integralLatex));

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[600px] mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        ∫ Integrals Result
      </h2>

      {!hasResult ? (
        <p className="text-gray-500 italic">
          Enter an expression and compute its integral to see the result here.
        </p>
      ) : (
        <>
          {/* Original */}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Function:</span>
            <StaticMathField>{originalLatex ?? original}</StaticMathField>
          </div>

          {/* Integral */}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Integral:</span>
            {integralLatex ? (
              <StaticMathField>{integralLatex}</StaticMathField>
            ) : (
              <span className="px-2 py-1 bg-slate-50 border rounded text-slate-700">
                {integral}
              </span>
            )}
          </div>

          {/* Opcionales (cuando los tengas en backend) */}
          {tipo && (
            <div className="mb-3 text-sm text-gray-700">
              <strong>Type:</strong> {tipo}
            </div>
          )}

          {steps && steps.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">🪜 Steps:</h3>
              <ol className="list-decimal ml-6 space-y-1">
                {steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IntegralsResult;
