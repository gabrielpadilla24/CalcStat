import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface NPVInfoProps {
  showSubstituted: boolean;
  futureValue?: number;
  years?: number;
  interestRate: number;
  mode: "single" | "sequence";
}

const NPVInfo: React.FC<NPVInfoProps> = ({
  showSubstituted,
  futureValue,
  years,
  interestRate,
  mode,
}) => {
  const formulaSingle = String.raw`
    NPV = \frac{FV}{(1 + r)^t}
  `;

  const substitutedSingle =
    futureValue && years
      ? String.raw`
        NPV = \frac{${futureValue}}{(1 + ${interestRate}\% )^{${years}}}
      `
      : "";

  const formulaSequence = String.raw`
    NPV = \sum_{t=0}^{n} \frac{CF_t}{(1 + r)^t}
  `;

  return (
    <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl mt-8 shadow text-gray-800 max-w-full sm:max-w-3xl lg:max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        📐 Formula Breakdown
      </h2>

      {mode === "single" && (
        <>
          <p className="mb-2 text-sm sm:text-base">
            We use the Net Present Value formula for a future lump sum:
          </p>
          <div className="bg-gray-100 p-3 sm:p-4 rounded text-center text-base overflow-x-auto">
            <BlockMath math={formulaSingle} />
          </div>

          {showSubstituted && substitutedSingle && (
            <>
              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-2">
                🔢 With Your Values
              </h3>
              <div className="bg-yellow-50 p-3 sm:p-4 rounded text-center border border-yellow-200 overflow-x-auto">
                <BlockMath math={substitutedSingle} />
              </div>
            </>
          )}

          <p className="text-xs sm:text-sm text-gray-600 mt-6">
            <strong>Where:</strong> FV = future value, r = interest rate (as
            decimal), t = time in years
          </p>
        </>
      )}

      {mode === "sequence" && (
        <>
          <p className="mb-2 text-sm sm:text-base">
            We use the Net Present Value formula for multiple cash flows:
          </p>
          <div className="bg-gray-100 p-3 sm:p-4 rounded text-center text-base overflow-x-auto">
            <BlockMath math={formulaSequence} />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-6">
            <strong>Where:</strong> CF<sub>t</sub> = cash flow at year t, r =
            interest rate (as decimal), n = number of years
          </p>
        </>
      )}
    </div>
  );
};

export default NPVInfo;
