import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type CriticalPointsResultProps = {
  original: string;
  firstDerivative: string;
  secondDerivative: string;
  criticalPoints: string[];
  classification: string;
  absoluteExtrema?: {
    max: string | null;
    min: string | null;
  };
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h3 className="font-semibold mb-2 text-base sm:text-lg text-gray-800">
    {children}
  </h3>
);

const CriticalPointsResult: React.FC<CriticalPointsResultProps> = ({
  original,
  firstDerivative,
  secondDerivative,
  criticalPoints,
  classification,
  absoluteExtrema,
}) => {
  const hasResult =
    original &&
    firstDerivative &&
    secondDerivative &&
    criticalPoints.length > 0;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 w-full text-gray-800">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
        Results
      </h2>

      {!hasResult && (
        <p className="text-gray-500 italic text-center sm:text-left">
          Enter a function above to compute its critical points.
        </p>
      )}

      {hasResult && (
        <div className="space-y-6">
          {/* Function & Derivatives */}
          <div>
            <SectionTitle>Function & Derivatives</SectionTitle>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="shrink-0">f(x):</span>
                <StaticMathField>{original}</StaticMathField>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="shrink-0">f'(x):</span>
                <StaticMathField>{firstDerivative}</StaticMathField>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="shrink-0">f''(x):</span>
                <StaticMathField>{secondDerivative}</StaticMathField>
              </div>
            </div>
          </div>

          {/* Critical Points */}
          {criticalPoints.length > 0 && (
            <div>
              <SectionTitle>Critical Points</SectionTitle>
              <ul className="list-disc list-inside space-y-1">
                {criticalPoints.map((point, idx) => (
                  <li key={idx} className="overflow-x-auto">
                    <StaticMathField>{point}</StaticMathField>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Second Derivative Test */}
          <div>
            <SectionTitle>Second Derivative Test</SectionTitle>
            <p className="text-gray-700 whitespace-pre-line">
              {classification || "—"}
            </p>
          </div>

          {/* Absolute Extrema */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center sm:text-left">
              <SectionTitle>Absolute Max</SectionTitle>
              <p className="text-gray-700 break-words">
                {absoluteExtrema?.max ?? "—"}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center sm:text-left">
              <SectionTitle>Absolute Min</SectionTitle>
              <p className="text-gray-700 break-words">
                {absoluteExtrema?.min ?? "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriticalPointsResult;
