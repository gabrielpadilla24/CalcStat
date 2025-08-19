"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type InverseResultProps = {
  matrix?: number[][];
  inverse?: string[][]; // viene formateada desde el backend con format_number
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
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  // ⚠️ Caso error
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ Error</h2>
        <p className="text-gray-700 mb-3">{error}</p>
        {explanation && <p className="text-gray-600 mb-6">{explanation}</p>}
      </div>
    );
  }

  // ✅ Caso inversa calculada
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Matrix Received ({rows} x {cols})
      </h2>

      {/* Matriz original */}
      <div className="inline-block mb-6">
        {matrix.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((val, j) => (
              <div
                key={j}
                className="w-12 h-12 flex items-center justify-center border border-gray-300"
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Inversa */}
      <h3 className="text-lg font-semibold text-green-700">Inverse Matrix</h3>

      {inverse && (
        <div className="inline-block mt-4 mb-6">
          {inverse.map((row, i) => (
            <div key={i} className="flex justify-center">
              {row.map((val, j) => (
                <div
                  key={j}
                  className="w-16 h-12 flex items-center justify-center border border-gray-300 px-1"
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* LaTeX */}
      {latex && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">LaTeX Representation</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto">
            <BlockMath math={latex} />
          </div>
        </div>
      )}

      {explanation && <p className="text-gray-600 mt-6">{explanation}</p>}
    </div>
  );
};

export default InverseResult;
