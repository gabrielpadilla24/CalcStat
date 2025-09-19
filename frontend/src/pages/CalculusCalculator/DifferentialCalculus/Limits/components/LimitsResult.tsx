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
    <div className="bg-white shadow-md rounded-xl p-6 w-full text-gray-800">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
        📏 Limit Result
      </h2>

      {!hasResult ? (
        <p className="text-gray-500 italic text-sm sm:text-base">
          Enter a function above to compute its limit.
        </p>
      ) : (
        <>
          {/* Limit expression */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-semibold">Limit expression:</span>
            <StaticMathField>{original}</StaticMathField>
          </div>

          {/* Approximate value */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-semibold">Approximate value:</span>
            <span className="text-lg sm:text-xl">
              <StaticMathField>{limit}</StaticMathField>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default LimitsResult;
