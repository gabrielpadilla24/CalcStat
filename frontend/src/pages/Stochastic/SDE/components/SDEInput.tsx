"use client";

import { useState } from "react";

type SDEData = {
  x0: number;
  mu: string;
  sigma: string;
  T: number;
  N: number;
  M: number;
};

type SDEResponse = {
  params: SDEData;
  chartData: { [key: string]: number | string }[];
};

export default function SDEInput({
  onResult,
}: {
  onResult: (result: SDEResponse) => void;
}) {
  const [x0, setX0] = useState(1);
  const [mu, setMu] = useState("0.05*x");
  const [sigma, setSigma] = useState("0.2*x");
  const [T, setT] = useState(1);
  const [N, setN] = useState(100);
  const [M, setM] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: SDEData = { x0, mu, sigma, T, N, M };

    try {
      const res = await fetch("http://localhost:8000/sde", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) {
        alert("❌ Error: " + data.error);
      } else {
        onResult(data);
      }
    } catch {
      alert("❌ Failed to connect to backend.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-2">
        Enter SDE Parameters
      </h2>

      {/* Initial value x0 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Initial Value (X₀)
        </label>
        <input
          type="number"
          step="0.1"
          value={x0}
          onChange={(e) => setX0(parseFloat(e.target.value))}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Drift μ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Drift μ(t, x)
        </label>
        <input
          type="text"
          value={mu}
          onChange={(e) => setMu(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder='e.g. "0.05*x"'
          required
        />
      </div>

      {/* Volatility σ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Volatility σ(t, x)
        </label>
        <input
          type="text"
          value={sigma}
          onChange={(e) => setSigma(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder='e.g. "0.2*x"'
          required
        />
      </div>

      {/* Time horizon T */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Horizon (T)
        </label>
        <input
          type="number"
          step="0.1"
          value={T}
          onChange={(e) => setT(parseFloat(e.target.value))}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Steps N */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Steps (N)
        </label>
        <input
          type="number"
          value={N}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Trajectories M */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trajectories (M)
        </label>
        <input
          type="number"
          value={M}
          onChange={(e) => setM(parseInt(e.target.value))}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Simulate SDE
      </button>
    </form>
  );
}
