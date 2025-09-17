"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export type Step = { text: string; math?: string };

type Props = {
  matrix?: (string | number)[][];
  eigenvalues?: number[];
  eigenvectors?: number[][];
  steps?: Step[];
};

const fmt = (v: unknown) => {
  if (typeof v === "number") {
    const s = v.toFixed(6).replace(/\.?0+$/, "");
    return s === "-0" ? "0" : s;
  }
  if (typeof v === "string") return v;
  return String(v ?? "");
};

const EigenResult = ({ matrix, eigenvalues, eigenvectors, steps }: Props) => {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        Matrix Received ({rows} × {cols})
      </h2>

      {/* Matrix */}
      <div className="flex justify-center mb-6 overflow-x-auto">
        <div className="inline-block">
          {matrix.map((row, i) => (
            <div key={i} className="flex justify-center">
              {row.map((val, j) => (
                <div
                  key={j}
                  className="min-w-[2.5rem] h-12 flex items-center justify-center border border-gray-300 px-2 text-sm sm:text-base"
                >
                  {fmt(val)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Eigenvalues */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">
          Eigenvalues
        </h3>
        {eigenvalues && eigenvalues.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {eigenvalues.map((lam, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border text-xs sm:text-sm bg-gray-50"
              >
                λ{i + 1} = {fmt(lam)}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">(Non Existent)</p>
        )}
      </div>

      {/* Eigenvectors */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 text-center">
          Eigenvectors
        </h3>
        {eigenvectors && eigenvectors.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {eigenvectors.map((vec, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-gray-50 p-2 rounded-lg"
              >
                <div className="text-xs sm:text-sm font-medium mb-1">
                  v{idx + 1}
                </div>
                <div className="inline-block">
                  {vec.map((val, r) => (
                    <div
                      key={r}
                      className="min-w-[3rem] h-10 flex items-center justify-center border border-gray-300 px-1 text-xs sm:text-sm"
                    >
                      {fmt(val)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">(Non Existent)</p>
        )}
      </div>

      {/* Steps */}
      {steps && steps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">
            Steps for Eigenvalues
          </h3>
          <ol className="list-decimal pl-5 sm:pl-6 space-y-4 text-gray-700 text-left">
            {steps.map((s, i) => (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-sm sm:text-base">{s.text}</span>
                {s.math && (
                  <div className="ml-2 sm:ml-4 overflow-x-auto max-w-full">
                    <BlockMath math={s.math} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default EigenResult;
