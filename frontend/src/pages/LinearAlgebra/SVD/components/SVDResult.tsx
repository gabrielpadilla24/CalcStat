"use client";

type SVDResultProps = {
  matrix?: number[][];
  singularValues?: number[];
  U?: number[][];
  Sigma?: number[][];
  Vt?: number[][];
  /** Pasar si las calculas en backend, se muestran si están: */
  rank?: number;
  conditionNumber?: number;     // Infinity permitido
  reconstructionError?: number; // ||A - UΣVᵀ||_F
  relativeError?: number;       // 0..1
  steps?: string[];
  error?: string;
  explanation?: string;
};

const fmt = (x: number) => {
  if (!isFinite(x)) return "∞";
  const s = x.toFixed(6).replace(/\.?0+$/, "");
  return s === "-0" ? "0" : s;
};

const MatrixGrid = ({
  M,
  caption,
}: {
  M?: number[][];
  caption?: string;
}) => {
  if (!M || M.length === 0) return null;
  return (
    <div className="space-y-2">
      {caption && (
        <div className="text-sm text-gray-600 font-medium">{caption}</div>
      )}
      <div className="inline-block overflow-x-auto rounded-lg border border-gray-200">
        <table className="border-collapse">
          <tbody>
            {M.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                {row.map((v, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 border border-gray-200 text-right font-mono text-sm"
                  >
                    {fmt(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 rounded-md bg-gray-100 border text-sm font-mono">
    {children}
  </span>
);

const Stat = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div className="rounded-lg border border-gray-200 p-4">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="text-xl font-semibold">
      {value !== undefined ? value : "—"}
    </div>
  </div>
);

const SVDResult = ({
  matrix,
  singularValues,
  U,
  Sigma,
  Vt,
  rank,
  conditionNumber,
  reconstructionError,
  relativeError,
  steps,
  error,
  explanation,
}: SVDResultProps) => {
  // Sin datos aún
  if (!matrix || matrix.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-3 text-yellow-800">⚠️ Error</h2>
        <p className="text-yellow-900">{error}</p>
        {explanation && (
          <p className="text-yellow-800 mt-2 text-sm">{explanation}</p>
        )}
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">Singular Value Decomposition</h2>
        <p className="text-gray-500">
          Matrix A of shape ({rows} × {cols})
        </p>
      </div>

      {/* Estadísticas (si llegaron) */}
      {(rank !== undefined ||
        conditionNumber !== undefined ||
        reconstructionError !== undefined ||
        relativeError !== undefined) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Stat label="Rank" value={rank} />
          <Stat
            label="Condition Number"
            value={
              conditionNumber !== undefined ? fmt(conditionNumber) : undefined
            }
          />
          <Stat
            label="‖A − UΣVᵀ‖₍F₎"
            value={
              reconstructionError !== undefined
                ? fmt(reconstructionError)
                : undefined
            }
          />
          <Stat
            label="Relative Error"
            value={
              relativeError !== undefined
                ? `${fmt(relativeError)} (${(relativeError * 100)
                    .toFixed(3)
                    .replace(/\.?0+$/, "")}%)`
                : undefined
            }
          />
        </div>
      )}

      {/* Valores singulares */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Singular Values (s)</h3>
        {singularValues && singularValues.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {singularValues.map((sv, i) => (
              <Badge key={i}>{fmt(sv)}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">—</p>
        )}
      </div>

      {/* Matrices */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Matrices</h3>
        <MatrixGrid M={matrix} caption="A" />
        <MatrixGrid M={U} caption="U" />
        <MatrixGrid M={Sigma} caption="Σ (diag(s))" />
        <MatrixGrid M={Vt} caption="Vᵀ" />
      </div>

      {/* Steps / explicación (si llegan) */}
      {(steps && steps.length > 0) || explanation ? (
        <div className="space-y-3">
          {steps && steps.length > 0 && (
            <>
              <h3 className="text-lg font-semibold">Steps</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                {steps.map((st, idx) => (
                  <li key={idx}>{st}</li>
                ))}
              </ol>
            </>
          )}
          {explanation && (
            <>
              <h3 className="text-lg font-semibold">Explanation</h3>
              <p className="text-sm text-gray-700">{explanation}</p>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SVDResult;
