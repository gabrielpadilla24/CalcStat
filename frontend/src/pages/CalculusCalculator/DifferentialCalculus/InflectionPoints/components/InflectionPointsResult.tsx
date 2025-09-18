// src/pages/CalculusCalculator/DifferentialCalculus/InflectionPoints/components/InflectionPointsResult.tsx
"use client";

import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";
addStyles();

type InflectionPointsResultProps = {
  original: string;
  originalLatex?: string;
  firstDerivative: string;
  firstDerivativeLatex?: string;
  secondDerivative: string;
  secondDerivativeLatex?: string;

  secondDerivativeZeros?: string[];
  secondDerivativeSingularities?: string[];

  // 👉 confirmados
  inflectionPoints?: { x: string; y: string }[];
  inflectionPointsCoords?: string[];
};

const InflectionPointsResult: React.FC<InflectionPointsResultProps> = ({
  original,
  originalLatex,
  firstDerivative,
  firstDerivativeLatex,
  secondDerivative,
  secondDerivativeLatex,
  secondDerivativeZeros = [],
  secondDerivativeSingularities = [],
  inflectionPoints = [],
  inflectionPointsCoords = [],
}) => {
  const hasResult = Boolean(original && firstDerivative && secondDerivative);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-[600px] mx-auto text-gray-800">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
        📈 Inflection / Concavity Result
      </h2>

      {!hasResult ? (
        <p className="text-gray-500 italic">
          Enter a function above to compute its derivatives.
        </p>
      ) : (
        <>
          {/* f(x) */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-semibold">Function:</span>
            <StaticMathField>{originalLatex ?? original}</StaticMathField>
          </div>

          {/* f'(x) */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-semibold">First Derivative:</span>
            <StaticMathField>
              {firstDerivativeLatex ?? firstDerivative}
            </StaticMathField>
          </div>

          {/* f''(x) */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="font-semibold">Second Derivative:</span>
            <StaticMathField>
              {secondDerivativeLatex ?? secondDerivative}
            </StaticMathField>
          </div>

          {/* 🔎 Candidatos */}
          <div className="mt-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              🔎 Inflection Candidates
            </h3>

            {/* Zeros */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Where f''(x) = 0:
              </p>
              {secondDerivativeZeros.length ? (
                <div className="flex flex-wrap gap-3 mt-2">
                  {secondDerivativeZeros.map((z, i) => (
                    <div
                      key={`zero-${i}`}
                      className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1"
                    >
                      <span className="text-xs text-emerald-700">x =</span>
                      <StaticMathField>{z}</StaticMathField>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">— none —</p>
              )}
            </div>

            {/* Singularities */}
            <div>
              <p className="text-sm font-medium text-gray-700">
                Where f''(x) does not exist:
              </p>
              {secondDerivativeSingularities.length ? (
                <div className="flex flex-wrap gap-3 mt-2">
                  {secondDerivativeSingularities.map((s, i) => (
                    <div
                      key={`sing-${i}`}
                      className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-1"
                    >
                      <span className="text-xs text-amber-700">x =</span>
                      <StaticMathField>{s}</StaticMathField>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">— none —</p>
              )}
            </div>
          </div>

          {/* ✅ Confirmed */}
          <div className="mt-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              ✅ Inflection Points (confirmed)
            </h3>
            {inflectionPoints.length ? (
              <div className="space-y-3">
                {inflectionPoints.map((pt, i) => {
                  const pointLatex = String.raw`\left(${pt.x},\,${pt.y}\right)`;
                  const numericCoord =
                    inflectionPointsCoords[i] !== undefined
                      ? inflectionPointsCoords[i]
                      : null;
                  return (
                    <div
                      key={`infl-${i}`}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <span className="text-sm text-gray-700">P{i + 1}:</span>
                      <StaticMathField>{pointLatex}</StaticMathField>
                      {numericCoord && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1">
                          <StaticMathField>{numericCoord}</StaticMathField>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">— none —</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InflectionPointsResult;
