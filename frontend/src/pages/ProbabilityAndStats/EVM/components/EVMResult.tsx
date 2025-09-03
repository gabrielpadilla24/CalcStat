"use client";

type Props = {
  expectedValue?: number;
  variance?: number;
  moments?: { order: number; value: number }[];
  error?: string;
};

export default function EVMResult({
  expectedValue,
  variance,
  moments,
  error,
}: Props) {
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ Error</h2>
        <p className="text-yellow-700">{error}</p>
      </div>
    );
  }

  if (expectedValue === undefined && variance === undefined) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No results yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6 text-center">Computed Results</h2>

      <div className="space-y-3 text-gray-800">
        <p>
          <strong>E[X]:</strong> {expectedValue?.toFixed(5)}
        </p>
        <p>
          <strong>Var(X):</strong> {variance?.toFixed(5)}
        </p>
      </div>

      {moments && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Moments</h3>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            {moments.map((m) => (
              <li key={m.order}>
                Order {m.order}: {m.value.toFixed(5)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
