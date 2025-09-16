"use client";

import { useState } from "react";

type QVData = {
  process: string;
  mode: string;
  T?: number;
  N?: number;
  M?: number;
  a?: number;
  b?: number;
  mu?: number;
  sigma?: number;
};

type QVResponse = {
  mode: string;
  params: QVData;
  formula: string;
  qv_formula?: string;
  qv_value?: string;
  steps?: string[];
  chartData?: { [key: string]: number | string }[];
  trajectoriesShown?: number;
  trajectoriesTotal?: number;
};

export default function QVInput({
  onResult,
}: {
  onResult: (result: QVResponse) => void;
}) {
  const [process, setProcess] = useState("Brownian motion");
  const [mode, setMode] = useState<"analytical" | "montecarlo">("analytical");

  // parámetros
  const [T, setT] = useState<number | undefined>(undefined);
  const [N, setN] = useState<number | undefined>(undefined);
  const [M, setM] = useState<number | undefined>(undefined);
  const [a, setA] = useState<number | undefined>(undefined);
  const [b, setB] = useState<number | undefined>(undefined);
  const [mu, setMu] = useState<number | undefined>(undefined);
  const [sigma, setSigma] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: QVData = { process, mode, T, N, M, a, b, mu, sigma };

    try {
      const res = await fetch("http://localhost:8000/quadratic-variation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) {
        alert("⚠️ " + data.error);
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
        Quadratic Variation
      </h2>

      {/* Process selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Process
        </label>
        <select
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="Brownian motion">Xₜ = Wₜ</option>
          <option value="Scaled Brownian motion">Xₜ = aWₜ</option>
          <option value="Shifted Brownian motion">Xₜ = aWₜ + b</option>
          <option value="Geometric Brownian motion">
            Xₜ = exp((μ - ½σ²)t + σWₜ)
          </option>
        </select>
      </div>

      {/* Toggle switch */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Mode</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("analytical")}
            className={`px-3 py-1 rounded-md font-medium ${
              mode === "analytical"
                ? "bg-[#5FBA9B] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Analytical
          </button>
          <button
            type="button"
            onClick={() => setMode("montecarlo")}
            className={`px-3 py-1 rounded-md font-medium ${
              mode === "montecarlo"
                ? "bg-[#5FBA9B] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Monte Carlo
          </button>
        </div>
      </div>

      {/* Extra params only for Monte Carlo */}
      {mode === "montecarlo" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Horizon (T)
            </label>
            <input
              type="number"
              step="0.1"
              value={T ?? ""}
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full border rounded-md p-2"
              placeholder="e.g. 1"
            />
            <small className="text-gray-500">
              Must be a positive number (≤ 10 recommended)
            </small>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Steps (N)
            </label>
            <input
              type="number"
              value={N ?? ""}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full border rounded-md p-2"
              placeholder="e.g. 500"
            />
            <small className="text-gray-500">
              Must be ≤ 5000 (too large may slow the app)
            </small>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trajectories (M)
            </label>
            <input
              type="number"
              value={M ?? ""}
              onChange={(e) => setM(parseInt(e.target.value))}
              className="w-full border rounded-md p-2"
              placeholder="e.g. 50"
            />
            <small className="text-gray-500">
              Must be ≤ 200 (too many may slow the frontend)
            </small>
          </div>
        </div>
      )}

      {/* Parameters a, b, mu, sigma (opcional para procesos específicos) */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            a
          </label>
          <input
            type="number"
            value={a ?? ""}
            onChange={(e) => setA(parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            b
          </label>
          <input
            type="number"
            value={b ?? ""}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            μ
          </label>
          <input
            type="number"
            value={mu ?? ""}
            onChange={(e) => setMu(parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 0.05"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            σ
          </label>
          <input
            type="number"
            value={sigma ?? ""}
            onChange={(e) => setSigma(parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 0.2"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Compute Quadratic Variation
      </button>
    </form>
  );
}
