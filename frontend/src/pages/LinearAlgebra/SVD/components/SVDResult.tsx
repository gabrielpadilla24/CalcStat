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
  // 1) Estado inicial: no se ha enviado nada aún (matrix es undefined)
  if (typeof matrix === "undefined") {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  // 2) Se envió algo, pero llegó vacío → tratar como matriz de ceros
  if (!matrix || matrix.length === 0 || (matrix[0]?.length ?? 0) === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Matrix Received</h2>
        <p className="text-gray-500 mb-4">
          Empty input → treated as zero matrix.
        </p>
        <div className="inline-block">
          <div className="flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center border border-gray-300">
              0
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center mt-6">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800">
              ⚠️ Error
            </h3>
            <p className="text-gray-700 mb-2">{error}</p>
            {explanation && <p className="text-gray-600">{explanation}</p>}
          </div>
        )}
      </div>
    );
  }

  // 3) Matriz válida (incluye el caso de ceros que envía el input)
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
