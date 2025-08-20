"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type Equation = { lhs: string; rhs: string };

type EqSystemResultProps = {
  equations?: Equation[];
  latex?: string; // opcional: si el backend lo manda
  error?: string;
  explanation?: string;
};

const toLatex = (eqs: Equation[] = []) => {
  // Genera \begin{cases} ... \end{cases} con cada "lhs = rhs"
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
  latex,
  error,
  explanation,
}: EqSystemResultProps) => {
  // Estado vacío (igual patrón que InverseResult)
  if (!equations || equations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No system submitted yet.</p>
      </div>
    );
  }

  // Construir LaTeX si no vino desde el backend
  const systemLatex = latex || toLatex(equations);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Equations Received ({equations.length})
      </h2>

      {/* Lista de ecuaciones en formato caja (similar a la matriz) */}
      <div className="inline-block mb-6">
        {equations.map((eq, i) => (
          <div key={i} className="flex justify-center items-center mb-2">
            <div className="w-56 h-12 flex items-center justify-center border border-gray-300 px-2">
              {eq.lhs || ""}
            </div>
            <span className="mx-2">=</span>
            <div className="w-24 h-12 flex items-center justify-center border border-gray-300 px-2">
              {eq.rhs || ""}
            </div>
          </div>
        ))}
      </div>

      {/* ⚠️ Caso error */}
      {error ? (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-4 text-yellow-800">
            ⚠️ Error
          </h3>
          <p className="text-gray-700 mb-3">{error}</p>
          {explanation && <p className="text-gray-600">{explanation}</p>}
        </div>
      ) : (
        <>
          {/* LaTeX */}
          {systemLatex && (
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">
                LaTeX Representation
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto">
                <BlockMath math={systemLatex} />
              </div>
            </div>
          )}

          {/* Explicación opcional */}
          {explanation && <p className="text-gray-600 mt-6">{explanation}</p>}
        </>
      )}
    </div>
  );
};

export default EqSystemResult;
