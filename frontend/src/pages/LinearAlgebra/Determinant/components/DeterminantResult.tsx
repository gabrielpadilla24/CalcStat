"use client";

type DeterminantResultProps = {
  matrix?: number[][];
};

const DeterminantResult = ({ matrix }: DeterminantResultProps) => {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  // ⚠️ Caso matriz NO cuadrada (n ≠ m)
  if (rows !== cols) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">
          ⚠️ Determinant Not Defined
        </h2>
        <p className="text-gray-700 mb-3">
          The determinant is only defined for <strong>square matrices</strong>{" "}
          (where the number of rows equals the number of columns).
        </p>
        <p className="text-gray-700 mb-6">
          In mathematics, the determinant represents properties such as{" "}
          <em>volume scaling</em> and <em>invertibility</em> of a linear
          transformation. These concepts only make sense for transformations
          from <code>ℝⁿ → ℝⁿ</code>. For non-square matrices (e.g. 2x3, 4x2),
          the mapping goes from <code>ℝᵐ → ℝⁿ</code>, where volume and
          invertibility cannot be defined in the same space — hence the
          determinant does not exist.
        </p>

        {/* Mostrar la matriz enviada */}
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">
          Matrix Received ({rows} x {cols})
        </h3>
        <div className="inline-block">
          {matrix.map((row, i) => (
            <div key={i} className="flex justify-center">
              {row.map((val, j) => (
                <div
                  key={j}
                  className="w-12 h-12 flex items-center justify-center border border-gray-300 bg-white"
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ Caso cuadrada (n = m)
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Matrix Received ({rows} x {cols})
      </h2>
      <div className="inline-block">
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
    </div>
  );
};

export default DeterminantResult;
