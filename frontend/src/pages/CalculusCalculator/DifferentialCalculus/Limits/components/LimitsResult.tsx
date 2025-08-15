// src/pages/CalculusCalculator/Limits/components/LimitsResult.tsx
import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type LimitsResultProps = {
  original: string;
  limit: string;
  steps?: string[];
};

const LimitsResult: React.FC<LimitsResultProps> = ({
  original,
  limit,
  steps,
}) => {
  const hasResult = Boolean(original && limit);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[600px] mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📏 Limit Result
      </h2>

      {!hasResult && (
        <p className="text-gray-500 italic">
          Enter a function above to compute its limit.
        </p>
      )}

      {hasResult && (
        <>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Function:</span>
            <StaticMathField>{original}</StaticMathField>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <span className="font-semibold">Limit:</span>
            <StaticMathField>{limit}</StaticMathField>
          </div>

          {steps && steps.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">🪜 Steps:</h3>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="pl-2">
                    {step.startsWith("$") ? (
                      <div className="mt-1 ml-6 text-lg text-gray-800">
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

export default LimitsResult;
