"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type GramSchmidtResultProps = {
  vectores?: string; // LaTeX del conjunto de vectores ingresados
  ortonormal?: string; // LaTeX del conjunto de vectores ortonormales
  pasos?: string[]; // lista de pasos en LaTeX
  error?: string;
  explanation?: string;
};

const GramSchmidtResult = ({
  vectores,
  ortonormal,
  pasos,
  error,
  explanation,
}: GramSchmidtResultProps) => {
  // ⚠️ Caso error
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ Error</h2>
        <p className="text-gray-700 mb-3">{error}</p>
        {explanation && <p className="text-gray-600">{explanation}</p>}
      </div>
    );
  }

  // ⚪️ Caso sin datos aún
  if (!vectores) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No vectors submitted yet.</p>
      </div>
    );
  }

  // ✅ Mostrar todo
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-8">
      {/* Vectores originales */}
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Input Vectors</h2>
        <BlockMath math={vectores} />
      </div>

      {/* Vectores ortonormales */}
      {ortonormal && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Orthonormal Vectors</h2>
          <BlockMath math={ortonormal} />
        </div>
      )}

      {/* Pasos */}
      {pasos && pasos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Step-by-Step Process
          </h2>
          <div className="space-y-4">
            {pasos.map((p, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center"
              >
                <BlockMath math={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GramSchmidtResult;
