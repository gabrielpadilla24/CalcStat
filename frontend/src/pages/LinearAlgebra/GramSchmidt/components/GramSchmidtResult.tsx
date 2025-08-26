"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type GramSchmidtResultProps = {
  vectores?: string; // LaTeX del conjunto de vectores ingresados
  ortonormal?: string; // luego se usará para los ortonormales
  pasos?: string[]; // luego se usará para los pasos intermedios
  error?: string;
  explanation?: string;
};

const GramSchmidtResult = ({
  vectores,
  //ortonormal,
  //pasos,
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

  // ✅ Mostrar solo los vectores ingresados
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Input Vectors</h2>
      <div className="flex justify-center">
        <BlockMath math={vectores} />
      </div>
    </div>
  );
};

export default GramSchmidtResult;
