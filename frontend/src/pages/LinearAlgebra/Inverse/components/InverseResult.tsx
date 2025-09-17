"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type InverseResultProps = {
  matrix?: string[][];
  inverse?: string[][];
  latex?: string;
  error?: string;
  explanation?: string;
};

const InverseResult = ({
  matrix,
  inverse,
  latex,
  error,
  explanation,
}: InverseResultProps) => {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Matrix Received ({rows} x {cols})
      </h2>

      {/* Original matrix with scroll on mobile */}
      <div className="overflow-x-auto mb-6">
        <div className="inline-block">
          {matrix.map((row, i) => (
            <div key={i} className="flex justify-center">
              {row.map((val, j) => (
                <div
                  key={j}
                  className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center border border-gray-300 text-sm sm:text-base"
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ⚠️ Error case */}
      {error ? (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-4 sm:p-6 text-center">
          <h3 className="text-md sm:text-lg font-semibold mb-4 text-yellow-800">
            ⚠️ Error
          </h3>
          <p className="text-gray-700 mb-3">{error}</p>
          {explanation && <p className="text-gray-600">{explanation}</p>}
        </div>
      ) : (
        <>
          {/* ✅ Inverse Matrix */}
          <h3 className="text-md sm:text-lg font-semibold text-green-700">
            Inverse Matrix
          </h3>
          {inverse && (
            <div className="overflow-x-auto mt-4 mb-6">
              <div className="inline-block">
                {inverse.map((row, i) => (
                  <div key={i} className="flex justify-center">
                    {row.map((val, j) => (
                      <div
                        key={j}
                        className="w-14 sm:w-16 h-10 sm:h-12 flex items-center justify-center border border-gray-300 px-1 text-xs sm:text-sm"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LaTeX */}
          {latex && (
            <div className="mt-6">
              <h4 className="text-sm sm:text-md font-semibold mb-2">
                LaTeX Representation
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 overflow-x-auto">
                <BlockMath math={latex} />
              </div>
            </div>
          )}

          {/* Explanation */}
          {explanation && (
            <p className="text-gray-600 mt-6 text-sm sm:text-base">
              {explanation}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default InverseResult;
