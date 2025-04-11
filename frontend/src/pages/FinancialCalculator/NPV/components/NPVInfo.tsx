import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface NPVInfoProps {
  showSubstituted: boolean;
  futureValue: number;
  years: number;
  interestRate: number;
}

const NPVInfo: React.FC<NPVInfoProps> = ({
  showSubstituted,
  futureValue,
  years,
  interestRate,
}) => {
  const generalFormula = String.raw`
      NPV = \frac{FV}{(1 + r)^t}
    `;

  const substitutedFormula = String.raw`
      NPV = \frac{${futureValue}}{(1 + ${interestRate})^{${years}}}
    `;

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl mt-10 shadow text-gray-800 max-w-[1350px] mx-auto">
      <h2 className="text-2xl font-bold mb-4">📐 Formula Breakdown</h2>
      <p className="mb-2">We use the standard Net Present Value formula:</p>
      <div className="bg-gray-100 p-4 rounded text-center text-base overflow-x-auto">
        <BlockMath math={generalFormula} />
      </div>

      {showSubstituted && (
        <>
          <h3 className="text-md font-semibold mt-6 mb-2">
            🔢 With Your Values
          </h3>
          <div className="bg-yellow-50 p-4 rounded text-center border border-yellow-200 overflow-x-auto">
            <BlockMath math={substitutedFormula} />
          </div>
        </>
      )}

      <p className="text-sm text-gray-600 mt-6">
        <strong>Where:</strong> FV = future value, r = interest rate (as
        decimal), t = time in years
      </p>
    </div>
  );
};

export default NPVInfo;
