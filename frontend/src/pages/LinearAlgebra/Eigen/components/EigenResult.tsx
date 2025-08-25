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
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Matrix Received ({rows} × {cols})
      </h2>

      {/* Matriz original */}
      <div className="flex justify-center mb-8">
        <div className="inline-block">
          {matrix.map((row, i) => (
            <div key={i} className="flex justify-center">
              {row.map((val, j) => (
                <div
                  key={j}
                  className="w-12 h-12 flex items-center justify-center border border-gray-300"
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
        <h3 className="text-lg font-semibold mb-2 text-center">Eigenvalues</h3>
        {eigenvalues && eigenvalues.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {eigenvalues.map((lam, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border text-sm bg-gray-50"
              >
                λ{i + 1} = {fmt(lam)}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            (Not computed or non‑real)
          </p>
        )}
      </div>

      {/* Eigenvectors (cada uno mostrado como columna) */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-center">Eigenvectors</h3>
        {eigenvectors && eigenvectors.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {eigenvectors.map((vec, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-sm font-medium mb-1">v{idx + 1}</div>
                <div className="inline-block">
                  {vec.map((val, r) => (
                    <div
                      key={r}
                      className="w-16 h-10 flex items-center justify-center border border-gray-300"
                    >
                      {fmt(val)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            (Not computed or non‑real)
          </p>
        )}
      </div>

      {/* Steps: texto normal + LaTeX; sin desbordes horizontales */}
      {steps && steps.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Steps for Eigenvalues
          </h3>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-left">
            {steps.map((s, i) => (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-gray-700 text-base">{s.text}</span>
                {s.math && (
                  <div className="ml-4 overflow-x-auto max-w-full">
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
