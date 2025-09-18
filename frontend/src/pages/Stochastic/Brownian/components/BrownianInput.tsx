"use client";

import { useState } from "react";

type BrownianResponse = {
  params: {
    x0: number;
    mu: number;
    sigma: number;
    T: number;
    N: number;
    M: number;
  };
  chartData: { [key: string]: number | string }[];
};

export default function BrownianInput({
  onResult,
}: {
  onResult: (result: BrownianResponse) => void;
}) {
  const [x0, setX0] = useState(0);
  const [mu, setMu] = useState(0.0);
  const [sigma, setSigma] = useState(1.0);
  const [T, setT] = useState(1.0);
  const [N, setN] = useState(100);
  const [M, setM] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/brownian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x0, mu, sigma, T, N, M }),
      });

      const data: BrownianResponse = await res.json();
      onResult(data);
    } catch (error) {
      console.error("Error fetching Brownian simulation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md sm:max-w-lg bg-white shadow-md rounded-xl p-6 border border-gray-200 mx-auto"
    >
      <h2 className="text-xl font-semibold mb-6 text-center">
        Simulation Parameters
      </h2>

      <div className="space-y-4">
        {/* Initial Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            X₀ (Initial Value)
          </label>
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Drift */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            μ (Drift)
          </label>
          <input
            type="number"
            value={mu}
            onChange={(e) => setMu(parseFloat(e.target.value))}
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Volatility */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            σ (Volatility)
          </label>
          <input
            type="number"
            value={sigma}
            onChange={(e) => setSigma(parseFloat(e.target.value))}
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            step="0.01"
          />
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            T (Time Horizon)
          </label>
          <input
            type="number"
            value={T}
            onChange={(e) => setT(parseFloat(e.target.value))}
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            step="0.1"
          />
        </div>

        {/* Steps */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            N (Steps)
          </label>
          <input
            type="number"
            value={N}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Trajectories */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            M (Trajectories)
          </label>
          <input
            type="number"
            value={M}
            onChange={(e) => setM(parseInt(e.target.value))}
            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-[#5FBA9B] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#4FAE8D] disabled:opacity-50 transition"
      >
        {loading ? "Simulating..." : "Simulate"}
      </button>
    </form>
  );
}
