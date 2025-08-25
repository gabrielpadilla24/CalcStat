"use client";

type EigenResultProps = {
  matrix?: string[][] | number[][];
};

const EigenResult = ({ matrix }: EigenResultProps) => {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No matrix submitted yet.</p>
      </div>
    );
  }

  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  // Normaliza a string para render
  const asStr = (v: string | number) => (typeof v === "number" ? String(v) : v);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Matrix Received ({rows} x {cols})
      </h2>

      {/* Matriz original */}
      <div className="inline-block mb-2">
        {matrix.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((val, j) => (
              <div
                key={j}
                className="w-12 h-12 flex items-center justify-center border border-gray-300"
              >
                {asStr(val)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Tip: you can change the size on the left and recalculate.
      </p>
    </div>
  );
};

export default EigenResult;
