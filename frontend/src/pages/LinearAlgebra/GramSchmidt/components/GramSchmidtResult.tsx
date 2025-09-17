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
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-4 sm:p-6 text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-yellow-800">
          ⚠️ Error
        </h2>
        <p className="text-gray-700 mb-3 text-sm sm:text-base">{error}</p>
        {explanation && (
          <p className="text-gray-600 text-sm sm:text-base">{explanation}</p>
        )}
      </div>
    );
  }

  // ⚪️ Caso sin datos aún
  if (!vectores) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center">
        <p className="text-gray-500 text-sm sm:text-base">
          No vectors submitted yet.
        </p>
      </div>
    );
  }

  // ✅ Mostrar todo
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Vectores originales */}
      <div className="text-center overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Input Vectors
        </h2>
        <div className="inline-block min-w-full">
          <BlockMath math={vectores} />
        </div>
      </div>

      {/* Vectores ortonormales */}
      {ortonormal && (
        <div className="text-center overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Orthonormal Vectors
          </h2>
          <div className="inline-block min-w-full">
            <BlockMath math={ortonormal} />
          </div>
        </div>
      )}

      {/* Pasos */}
      {pasos && pasos.length > 0 && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
            Step-by-Step Process
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {pasos.map((p, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 text-center overflow-x-auto"
              >
                <div className="inline-block min-w-full">
                  <BlockMath math={p} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GramSchmidtResult;
