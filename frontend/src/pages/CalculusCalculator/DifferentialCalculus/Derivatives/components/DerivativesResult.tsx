import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type DerivativesResultProps = {
  expression: string;
  derivative: string;
};

const toLatex = (expr: string): string => {
  return expr
    .replace(/\*\*/g, "^") // 2**2 → 2^2
    .replace(/\*/g, " "); // 2*x → 2x
};

const DerivativesResult: React.FC<DerivativesResultProps> = ({
  expression,
  derivative,
}) => {
  if (!expression || !derivative) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8 max-w-xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🧮 Derivative Result
      </h2>

      <p className="mb-4">
        <span className="font-semibold">Original Expression:</span>{" "}
        <StaticMathField>{toLatex(expression)}</StaticMathField>
      </p>

      <p>
        <span className="font-semibold">Derivative:</span>{" "}
        <StaticMathField>{toLatex(derivative)}</StaticMathField>
      </p>
    </div>
  );
};

export default DerivativesResult;
