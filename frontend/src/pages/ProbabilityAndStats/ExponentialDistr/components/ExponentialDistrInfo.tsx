"use client";

export default function ExponentialDistrInfo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6 leading-relaxed">
      <h2 className="text-xl font-bold mb-4">💡 Key Properties</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <strong>Rate Parameter (λ):</strong> Average number of events per unit
          time. The mean waiting time is <span className="italic">1/λ</span>.
        </li>
        <li>
          <strong>Memoryless Property:</strong> The probability of an event
          occurring in the future is independent of how much time has already
          passed.
        </li>
        <li>
          <strong>PDF:</strong>{" "}
          <span className="italic">
            f(x) = λ e<sup>−λx</sup>, x ≥ 0
          </span>
        </li>
        <li>
          <strong>CDF:</strong>{" "}
          <span className="italic">
            F(x) = 1 − e<sup>−λx</sup>, x ≥ 0
          </span>
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-4">🚀 Applications</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Modeling waiting times between arrivals (e.g., buses, calls).</li>
        <li>Time until failure of mechanical or electronic systems.</li>
        <li>Modeling radioactive decay or lifetimes of particles.</li>
        <li>Queuing theory and reliability engineering.</li>
      </ul>
    </div>
  );
}
