"use client";

export default function UniformInfo() {
  return (
    <div className="bg-blue-50 rounded-xl shadow-md border border-blue-200 p-6 space-y-6">
      {/* Key Properties */}
      <div>
        <h2 className="text-lg font-bold mb-3">💡 Key Properties</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Support:</strong> The distribution is defined between{" "}
            <code>a</code> and <code>b</code>.
          </li>
          <li>
            <strong>PDF:</strong> <code>f(x) = 1 / (b - a)</code> for{" "}
            <code>a ≤ x ≤ b</code>, and 0 otherwise.
          </li>
          <li>
            <strong>CDF:</strong> <code>F(x) = (x - a) / (b - a)</code> for{" "}
            <code>a ≤ x ≤ b</code>.
          </li>
          <li>
            <strong>Mean:</strong> <code>(a + b) / 2</code>
          </li>
          <li>
            <strong>Variance:</strong> <code>(b - a)² / 12</code>
          </li>
          <li>
            The distribution is symmetric between <code>a</code> and{" "}
            <code>b</code>.
          </li>
        </ul>
      </div>

      {/* Applications */}
      <div>
        <h2 className="text-lg font-bold mb-3">🚀 Applications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Modeling random events with equal probability in a range.</li>
          <li>Simulation of random numbers in Monte Carlo methods.</li>
          <li>Quality control when outcomes are equally likely.</li>
          <li>Representing uncertainty in ranges (min/max values known).</li>
        </ul>
      </div>
    </div>
  );
}
