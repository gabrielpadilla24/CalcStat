// src/pages/CalculusCalculator/DifferentialCalculus/TangentLine/components/TangentLineResult.tsx
import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type TangentLineResultProps = {
  original: string;
  derivative: string; // f'(x) o f'(x0) según devuelvas
  tangent: string; // ecuación de la recta tangente
  x0: number | null; // punto de evaluación
  m?: number | null; // 🔹 pendiente
  y0?: number | null; // 🔹 y del punto (f(x0) o provista)
  originalLatex?: string;
  derivativeLatex?: string;
  tangentLatex?: string;
};

const TangentLineResult: React.FC<TangentLineResultProps> = ({
  original,
  derivative,
  tangent,
  x0,
  m,
  y0,
  originalLatex,
  derivativeLatex,
  tangentLatex,
}) => {
  // Si tienes placeholders vacíos, puedes relajar esta condición
  const hasResult = Boolean(original && (derivative || tangent));

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[600px] mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📐 Tangent Line Result
      </h2>

      {!hasResult && (
        <p className="text-gray-500 italic">
          Enter a function and compute its tangent line to see the result here.
        </p>
      )}

      {hasResult && (
        <>
          {/* f(x) */}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Function:</span>
            <StaticMathField>{originalLatex ?? original}</StaticMathField>
          </div>

          {/* f'(x) */}
          {derivative && (
            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold">Derivative:</span>
              <StaticMathField>{derivativeLatex ?? derivative}</StaticMathField>
            </div>
          )}

          {/* Recta tangente */}
          {tangent && (
            <div className="mb-6 flex items-center gap-2">
              <span className="font-semibold">Tangent Line:</span>
              <StaticMathField>{tangentLatex ?? tangent}</StaticMathField>
            </div>
          )}

          {/* Detalles numéricos: m y (x0, y0) */}
          {(m != null || (x0 != null && y0 != null)) && (
            <div className="mb-2 p-4 rounded-md bg-blue-50 border border-blue-200 text-blue-900">
              <div className="font-semibold mb-1">Details:</div>
              <div className="space-y-1 text-lg">
                {m != null && (
                  <div>
                    <StaticMathField>{`m = ${m}`}</StaticMathField>
                  </div>
                )}
                {x0 != null && y0 != null && (
                  <div>
                    <StaticMathField>{`(x_0, y_0) = \\left(${x0},\\; ${y0}\\right)`}</StaticMathField>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nota educativa */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              The tangent line at <em>x = x₀</em> has slope <em>m = f′(x₀)</em>{" "}
              and passes through <em>(x₀, f(x₀))</em>:
            </p>
            <div className="mt-1">
              <StaticMathField>{`y - f(x_0) = f'(x_0)\\,(x - x_0)`}</StaticMathField>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TangentLineResult;
