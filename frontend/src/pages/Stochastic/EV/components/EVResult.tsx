"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type EVData = {
  process: string;
};

type EVResponse = {
  mode: string;
  params: EVData;
  expectation: string;
  variance: string;
  steps: string[];
  formula?: string;
};

export default function EVResult({ result }: { result?: EVResponse }) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center max-w-full">
        <p className="text-gray-500">
          No computation yet. Select a process and compute E[Xₜ], Var(Xₜ).
        </p>
      </div>
    );
  }

  const { expectation, variance, steps, formula } = result;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6 max-w-full">
      <h2 className="text-xl font-semibold text-center mb-4">
        Expectation & Variance
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700 font-medium">Selected process:</p>
        <div className="overflow-x-auto">
          <BlockMath math={`X_t = ${formula}`} />
        </div>

        <p className="text-gray-700 font-medium">Expectation:</p>
        <div className="overflow-x-auto">
          <BlockMath math={`E[X_t] = ${expectation}`} />
        </div>

        <p className="text-gray-700 font-medium">Variance:</p>
        <div className="overflow-x-auto">
          <BlockMath math={`Var(X_t) = ${variance}`} />
        </div>
      </div>

      {steps && steps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mt-6 mb-3">
            Step-by-step derivation
          </h3>
          <div className="space-y-3">
            {steps.map((s, idx) => (
              <div key={idx} className="overflow-x-auto">
                <BlockMath math={s} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
