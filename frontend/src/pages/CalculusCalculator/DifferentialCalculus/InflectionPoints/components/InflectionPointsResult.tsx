// src/pages/CalculusCalculator/DifferentialCalculus/InflectionPoints/components/InflectionPointsResult.tsx
import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type InflectionPointsResultProps = {
  original: string;
  firstDerivative: string;
  secondDerivative: string;
  originalLatex?: string;
  firstDerivativeLatex?: string;
  secondDerivativeLatex?: string;
};

const InflectionPointsResult: React.FC<InflectionPointsResultProps> = ({
  original,
  firstDerivative,
  secondDerivative,
  originalLatex,
  firstDerivativeLatex,
  secondDerivativeLatex,
}) => {
  const hasResult = original && firstDerivative && secondDerivative;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[600px] mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📈 Inflection Points Result
      </h2>

      {!hasResult && (
        <p className="text-gray-500 italic">
          Enter a function above to compute its derivatives.
        </p>
      )}

      {hasResult && (
        <>
          {/* f(x) */}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">f(x):</span>
            <StaticMathField>{originalLatex ?? original}</StaticMathField>
          </div>

          {/* f'(x) */}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">f'(x):</span>
            <StaticMathField>
              {firstDerivativeLatex ?? firstDerivative}
            </StaticMathField>
          </div>

          {/* f''(x) */}
          <div className="mb-6 flex items-center gap-2">
            <span className="font-semibold">f''(x):</span>
            <StaticMathField>
              {secondDerivativeLatex ?? secondDerivative}
            </StaticMathField>
          </div>
        </>
      )}
    </div>
  );
};

export default InflectionPointsResult;
