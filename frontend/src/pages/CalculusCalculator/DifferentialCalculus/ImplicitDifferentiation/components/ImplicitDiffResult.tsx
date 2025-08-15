// src/pages/CalculusCalculator/ImplicitDifferentiation/components/ImplicitDiffResult.tsx
import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type ImplicitDiffResultProps = {
  original: string; // F(x, y) = 0 (texto o LaTeX)
  implicit: string; // dy/dx (texto o LaTeX)
  steps?: string[]; // opcional
};

const ImplicitDiffResult: React.FC<ImplicitDiffResultProps> = ({
  original,
  implicit,
  steps,
}) => {
  const hasResult = Boolean(original && implicit);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[600px] mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🧩 Implicit Differentiation
      </h2>

      {!hasResult && (
        <p className="text-gray-500 italic">
          Enter an implicit equation above to compute <em>dy/dx</em>.
        </p>
      )}

      {hasResult && (
        <>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Original equation:</span>
            {/* Si viene LaTeX, se renderiza; si no, muestra el texto */}
            <StaticMathField>{original}</StaticMathField>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <span className="font-semibold">Implicit derivative (dy/dx):</span>
            <StaticMathField>{implicit}</StaticMathField>
          </div>

          {steps && steps.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">🪜 Steps:</h3>
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className="pl-2">
                    {step.startsWith("$") ? (
                      <div className="mt-1 ml-6 text-lg text-gray-800">
                        {/* Si envías pasos como "$<latex>", renderizamos sin el prefijo */}
                        <StaticMathField>{step.slice(1)}</StaticMathField>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-base text-gray-800">
                        <span className="mt-1">•</span>
                        <p>{step}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImplicitDiffResult;
