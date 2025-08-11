import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type CriticalPointsResultProps = {
  original: string;
  firstDerivative: string;
  secondDerivative: string;
  criticalPoints: string[];
  inflectionPoints: string[];
  classification: string;
  absoluteExtrema?: {
    max: string | null;
    min: string | null;
  };
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <h3 className="font-semibold mb-1">{children}</h3>;

const CriticalPointsResult: React.FC<CriticalPointsResultProps> = ({
  original,
  firstDerivative,
  secondDerivative,
  criticalPoints,
  inflectionPoints,
  classification,
  absoluteExtrema,
}) => {
  const hasResult =
    original &&
    firstDerivative &&
    secondDerivative &&
    (criticalPoints.length > 0 || inflectionPoints.length > 0);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full text-gray-800">
      <h2 className="text-2xl font-bold mb-6">Results</h2>

      {!hasResult && (
        <p className="text-gray-500 italic">
          Enter a function above to compute its critical points.
        </p>
      )}

      {hasResult && (
        <>
          {/* Function & Derivatives */}
          <div className="mb-6">
            <SectionTitle>Function & Derivatives</SectionTitle>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span>f(x):</span>
                <StaticMathField>{original}</StaticMathField>
              </div>
              <div className="flex items-center gap-2">
                <span>f'(x):</span>
                <StaticMathField>{firstDerivative}</StaticMathField>
              </div>
              <div className="flex items-center gap-2">
                <span>f''(x):</span>
                <StaticMathField>{secondDerivative}</StaticMathField>
              </div>
            </div>
          </div>

          {/* Critical Points */}
          {criticalPoints.length > 0 && (
            <div className="mb-6">
              <SectionTitle>Critical Points</SectionTitle>
              <ul className="list-disc list-inside space-y-1">
                {criticalPoints.map((point, idx) => (
                  <li key={idx}>
                    <StaticMathField>{point}</StaticMathField>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Inflection Points */}
          {inflectionPoints.length > 0 && (
            <div className="mb-6">
              <SectionTitle>Inflection Points</SectionTitle>
              <ul className="list-disc list-inside space-y-1">
                {inflectionPoints.map((point, idx) => (
                  <li key={idx}>
                    <StaticMathField>{point}</StaticMathField>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Second Derivative Test */}
          <div className="mb-6">
            <SectionTitle>Second Derivative Test</SectionTitle>
            <p className="text-gray-700">{classification || "—"}</p>
          </div>

          {/* Absolute Extrema */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <SectionTitle>Absolute Max</SectionTitle>
              <p className="text-gray-700">{absoluteExtrema?.max ?? "—"}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <SectionTitle>Absolute Min</SectionTitle>
              <p className="text-gray-700">{absoluteExtrema?.min ?? "—"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CriticalPointsResult;
