import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

type LimitsResultProps = {
  original: string; // LaTeX: \lim_{x\to\infty}(\cdots)
  limit: string; // LaTeX: \infty, 0, 5, etc.
};

const LimitsResult: React.FC<LimitsResultProps> = ({ original, limit }) => {
  const hasResult = Boolean(original && limit);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[600px] mx-auto text-gray-800 h-[280px]">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📏 Limit Result
      </h2>

      {!hasResult ? (
        <p className="text-gray-500 italic">
          Enter a function above to compute its limit.
        </p>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Limit expression:</span>
            <StaticMathField>{original}</StaticMathField>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Approximate value:</span>
            <span className="text-xl">
              <StaticMathField>{limit}</StaticMathField>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default LimitsResult;
