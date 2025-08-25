"use client";

export type Step = { text: string; math?: string };

type SVDResultProps = {
  matrix?: (string | number)[][];
  singularValues?: number[];
  U?: number[][];
  Sigma?: number[][];
  Vt?: number[][];
  steps?: Step[];
  error?: string;
  explanation?: string;
};

const fmt = (v: unknown) => {
  if (typeof v === "number") {
    const s = v.toFixed(6).replace(/\.?0+$/, "");
    return s === "-0" ? "0" : s;
  }
  if (typeof v === "string") return v;
  return String(v ?? "");
};

const SVDResult = ({ matrix, error, explanation }: SVDResultProps) => {
  // Estado inicial: no se ha enviado nada aún
  if (typeof matrix === "undefined") {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  // A partir de aquí, siempre renderizamos la matriz recibida
  // (si estaba vacía, el input ya la envió como matriz de ceros del tamaño adecuado)
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Matrix Received ({rows} × {cols})
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
                {fmt(val)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ⚠️ Caso error */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-yellow-800">
            ⚠️ Error
          </h3>
          <p className="text-gray-700 mb-2">{error}</p>
          {explanation && <p className="text-gray-600">{explanation}</p>}
        </div>
      )}
    </div>
  );
};

export default SVDResult;
