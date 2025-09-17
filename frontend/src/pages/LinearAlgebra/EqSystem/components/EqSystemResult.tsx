"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type Equation = { lhs: string; rhs: string };

type EqSystemResultProps = {
  equations?: Equation[];
  coeffmatrix?: string; // [A|b] LaTeX
  status?: string;
  solution?: Record<string, number>;
  solution_latex?: string;
  steps?: string[];
  error?: string;
  explanation?: string;
};

const toLatex = (eqs: Equation[] = []) => {
  const lines = eqs
    .filter(
      (e) =>
        (e.lhs?.trim()?.length || 0) > 0 || (e.rhs?.trim()?.length || 0) > 0
    )
    .map((e) => `${e.lhs?.trim() || " "} = ${e.rhs?.trim() || " "}`)
    .join(" \\\\ ");
  return `\\begin{cases} ${lines || "\\, "} \\end{cases}`;
};

const EqSystemResult = ({
  equations,
  coeffmatrix,
  status,
  solution,
  solution_latex,
  steps,
  error,
  explanation,
}: EqSystemResultProps) => {
  if (!equations || equations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center">
        <p className="text-gray-500 text-sm sm:text-base">
          No system submitted yet.
        </p>
      </div>
    );
  }

  const systemLatex = toLatex(equations);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Equations Received ({equations.length})
      </h2>

      {/* Sistema en formato cases */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 overflow-x-auto">
        <BlockMath math={systemLatex} />
      </div>

      {/* Matriz aumentada [A|b] */}
      {coeffmatrix && coeffmatrix.trim().length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="text-md sm:text-lg font-semibold mb-3">
            Augmented Matrix [A | b]
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 overflow-x-auto">
            <BlockMath math={coeffmatrix} />
          </div>
        </div>
      )}

      {/* Solución (si existe) */}
      {solution_latex && solution_latex.trim().length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="text-md sm:text-lg font-semibold mb-3">Solution</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 overflow-x-auto">
            <BlockMath math={solution_latex} />
          </div>
          {status && (
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Status: {status}
            </p>
          )}
        </div>
      )}

      {!solution_latex && status && (
        <p className="text-xs sm:text-sm text-gray-600 mt-6">
          Status: {status}
        </p>
      )}

      {solution && !solution_latex && (
        <div className="mt-4 text-xs sm:text-sm text-gray-700">
          {Object.entries(solution).map(([k, v]) => (
            <div key={k}>
              {k} = {v}
            </div>
          ))}
        </div>
      )}

      {/* Gaussian Elimination Steps */}
      {Array.isArray(steps) && steps.length > 0 && (
        <div className="mt-8 text-left">
          <h3 className="text-md sm:text-lg font-semibold mb-3">
            Gaussian Elimination Steps
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {steps.map((s, i) => (
              <details
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3"
              >
                <summary className="cursor-pointer font-medium">
                  Step {i + 1}
                </summary>
                <pre className="whitespace-pre-wrap text-xs sm:text-sm mt-2">
                  {s}
                </pre>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Error handling */}
      {error ? (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-4 sm:p-6 text-center mt-6">
          <h3 className="text-md sm:text-lg font-semibold mb-4 text-yellow-800">
            ⚠️ Error
          </h3>
          <p className="text-gray-700 mb-3 text-sm sm:text-base">{error}</p>
          {explanation && (
            <p className="text-gray-600 text-sm sm:text-base">{explanation}</p>
          )}
        </div>
      ) : (
        explanation && (
          <p className="text-gray-600 mt-6 text-sm sm:text-base">
            {explanation}
          </p>
        )
      )}
    </div>
  );
};

export default EqSystemResult;
