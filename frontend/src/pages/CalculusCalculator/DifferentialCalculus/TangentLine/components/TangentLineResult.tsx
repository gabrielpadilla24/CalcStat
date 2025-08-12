import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type TangentLineResultProps = {
  original: string;
  derivative: string; // f'(x) o f'(x0) según envíes
  tangent: string; // ecuación de la recta tangente
  my?: string; // info extra (p.ej., m y y0, o (x0, y0))
  originalLatex?: string;
  derivativeLatex?: string;
  tangentLatex?: string;
};

const TangentLineResult: React.FC<TangentLineResultProps> = ({
  original,
  derivative,
  tangent,
  my,
  originalLatex,
  derivativeLatex,
  tangentLatex,
}) => {
  const hasResult = Boolean(original && derivative && tangent);

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
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Derivative:</span>
            <StaticMathField>{derivativeLatex ?? derivative}</StaticMathField>
          </div>

          {/* Recta tangente */}
          <div className="mb-6 flex items-center gap-2">
            <span className="font-semibold">Tangent Line:</span>
            <StaticMathField>{tangentLatex ?? tangent}</StaticMathField>
          </div>

          {/* Info extra (m, y0, x0...) */}
          {my && (
            <div className="mb-2 p-4 rounded-md bg-blue-50 border border-blue-200 text-blue-900">
              <div className="font-semibold mb-1">Details (slope & point):</div>
              {/* Intentamos renderizar como LaTeX; si no es LaTeX, MathQuill lo mostrará como texto */}
              <div className="text-lg">
                <StaticMathField>{my}</StaticMathField>
              </div>
            </div>
          )}

          {/* Nota educativa pequeña */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              The tangent line at <em>x = x₀</em> has slope <em>m = f'(x₀)</em>{" "}
              and passes through the point <em>(x₀, f(x₀))</em>, i.e.
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
