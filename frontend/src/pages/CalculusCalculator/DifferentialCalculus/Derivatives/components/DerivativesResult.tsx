import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type DerivativesResultProps = {
  expression: string;
  derivative: string;
  steps?: string[];
  rule?: string; // ← NUEVO
};

const toLatex = (expr: string): string => {
  return expr.replace(/\*\*/g, "^").replace(/\*/g, " ");
};

const DerivativesResult: React.FC<DerivativesResultProps> = ({
  expression,
  derivative,
  steps,
  rule,
}) => {
  if (!expression || !derivative) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8 max-w-xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🧮 Derivative Result
      </h2>

      {/* Tipo de regla aplicada */}
      {rule && (
        <div className="mb-4 p-4 rounded-md bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm font-medium">
          🧠 <strong>Rule Applied:</strong> {rule}
        </div>
      )}

      <div className="mb-4 flex items-center gap-2">
        <span className="font-semibold">Original Expression:</span>
        <StaticMathField>{toLatex(expression)}</StaticMathField>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span className="font-semibold">Derivative:</span>
        <StaticMathField>{toLatex(derivative)}</StaticMathField>
      </div>

      {steps && steps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">🪜 Steps:</h3>
          <ul className="list-disc list-inside space-y-1">
            {steps.map((step, index) => (
              <li key={index}>
                {step.includes("^") || step.includes("*") ? (
                  <StaticMathField>{toLatex(step)}</StaticMathField>
                ) : (
                  step
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DerivativesResult;
