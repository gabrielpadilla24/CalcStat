"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type Equation = { lhs: string; rhs: string };

type EqSystemResultProps = {
  equations?: Equation[];
  coeffmatrix?: string; // [A|b] LaTeX
  status?: string; // "Success" | "No unique solution"
  solution?: Record<string, number>;
  solution_latex?: string; // vector solución en LaTeX
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
  error,
  explanation,
}: EqSystemResultProps) => {
  if (!equations || equations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No system submitted yet.</p>
      </div>
    );
  }

  const systemLatex = toLatex(equations);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Equations Received ({equations.length})
      </h2>

      {/* Sistema en formato cases */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto">
        <BlockMath math={systemLatex} />
      </div>

      {/* Matriz aumentada [A|b] */}
      {coeffmatrix && coeffmatrix.trim().length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold mb-3">
            Augmented Matrix [A | b]
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto">
            <BlockMath math={coeffmatrix} />
          </div>
        </div>
      )}

      {/* Solución (si existe) */}
      {solution_latex && solution_latex.trim().length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold mb-3">Solution</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto">
            <BlockMath math={solution_latex} />
          </div>
          {status && (
            <p className="text-sm text-gray-500 mt-2">Status: {status}</p>
          )}
        </div>
      )}

      {/* Si no hay solución única, muestra estado igualmente */}
      {!solution_latex && status && (
        <p className="text-sm text-gray-600 mt-6">Status: {status}</p>
      )}

      {/* (Opcional) Mostrar solución como texto llano */}
      {solution && !solution_latex && (
        <div className="mt-4 text-sm text-gray-700">
          {Object.entries(solution).map(([k, v]) => (
            <div key={k}>
              {k} = {v}
            </div>
          ))}
        </div>
      )}

      {/* ⚠️ Caso error */}
      {error ? (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center mt-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-800">
            ⚠️ Error
          </h3>
          <p className="text-gray-700 mb-3">{error}</p>
          {explanation && <p className="text-gray-600">{explanation}</p>}
        </div>
      ) : (
        <>
          {explanation && <p className="text-gray-600 mt-6">{explanation}</p>}
        </>
      )}
    </div>
  );
};

export default EqSystemResult;
