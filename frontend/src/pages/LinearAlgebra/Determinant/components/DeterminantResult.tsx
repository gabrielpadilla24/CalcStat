"use client";

type DeterminantResultProps = {
  matrix?: number[][];
  determinant?: number;
  steps?: string[];
  error?: string;
  explanation?: string;
};

const DeterminantResult = ({
  matrix,
  determinant,
  steps,
  error,
  explanation,
}: DeterminantResultProps) => {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  // ⚠️ Caso error
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ Error</h2>
        <p className="text-gray-700 mb-3">{error}</p>
        {explanation && <p className="text-gray-600 mb-6">{explanation}</p>}
      </div>
    );
  }

  // ✅ Caso cuadrada con determinante
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Matrix Received ({rows} x {cols})
      </h2>
      <div className="inline-block mb-6">
        {matrix.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((val, j) => (
              <div
                key={j}
                className="w-12 h-12 flex items-center justify-center border border-gray-300"
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-green-700">Determinant</h3>
      <p className="text-2xl font-bold text-gray-900 mb-4">{determinant}</p>

      {steps && steps.length > 0 && (
        <div className="text-left mt-6">
          <h4 className="text-md font-semibold mb-2">Steps:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {steps.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeterminantResult;
