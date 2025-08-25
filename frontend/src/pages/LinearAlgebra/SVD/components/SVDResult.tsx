"use client";

type SVDResultProps = {
  matrix?: (string | number)[][];
  singularValues?: number[];
  U?: number[][];
  Sigma?: number[][];
  Vt?: number[][];
  steps?: string[];
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

const SVDResult = ({
  matrix,
  singularValues,
  U,
  Sigma,
  Vt,
  steps,
  error,
  explanation,
}: SVDResultProps) => {
  // Inicial: nada enviado aún
  if (typeof matrix === "undefined") {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

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

      {/* ⚠️ Error (si el backend lo envía) */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-yellow-800">
            ⚠️ Error
          </h3>
          <p className="text-gray-700 mb-2">{error}</p>
          {explanation && <p className="text-gray-600">{explanation}</p>}
        </div>
      )}

      {/* Bloques listos para cuando devuelvas el resto */}
      {singularValues && singularValues.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">Singular Values</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {singularValues.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border text-sm bg-gray-50"
              >
                σ{i + 1} = {fmt(s)}
              </span>
            ))}
          </div>
        </>
      )}

      {U && U.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4 mb-2">U</h3>
          <div className="inline-block mb-4">
            {U.map((row, i) => (
              <div key={i} className="flex justify-center">
                {row.map((v, j) => (
                  <div
                    key={j}
                    className="w-16 h-10 flex items-center justify-center border border-gray-300"
                  >
                    {fmt(v)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {Sigma && Sigma.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4 mb-2">Σ</h3>
          <div className="inline-block mb-4">
            {Sigma.map((row, i) => (
              <div key={i} className="flex justify-center">
                {row.map((v, j) => (
                  <div
                    key={j}
                    className="w-16 h-10 flex items-center justify-center border border-gray-300"
                  >
                    {fmt(v)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {Vt && Vt.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4 mb-2">Vᵀ</h3>
          <div className="inline-block">
            {Vt.map((row, i) => (
              <div key={i} className="flex justify-center">
                {row.map((v, j) => (
                  <div
                    key={j}
                    className="w-16 h-10 flex items-center justify-center border border-gray-300"
                  >
                    {fmt(v)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {steps && steps.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">Steps</h3>
          <ol className="list-decimal pl-6 text-left space-y-1">
            {steps.map((s, i) => (
              <li key={i} className="text-gray-700">
                {s}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default SVDResult;
