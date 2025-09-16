"use client";

import { useState } from "react";

type MartingaleData = {
  process: string;
  mode: string;
  T?: number;
  N?: number;
  M?: number;
  w0?: number;
};

type MartingaleResponse = {
  mode: string;
  params: MartingaleData;
  isMartingale: boolean;
  reason: string;
  chartData?: { [key: string]: number | string }[];
  steps?: string[];
  drift?: string;
  diffusion?: string;
  final?: string;
  partials?: { f_t: string; f_W: string; f_WW: string };
};

export default function MartingaleInput({
  onResult,
}: {
  onResult: (result: MartingaleResponse) => void;
}) {
  const [mode, setMode] = useState<"montecarlo" | "analytical">("montecarlo");
  const [process, setProcess] = useState("exp(0.2*W - 0.5*0.2^2*t)");
  const [T, setT] = useState(1);
  const [N, setN] = useState(100);
  const [M, setM] = useState(5);
  const [w0, setW0] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: MartingaleData = { process, mode, T, N, M, w0 };

    try {
      const res = await fetch("http://localhost:8000/martingale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      onResult(data);
    } catch {
      alert("❌ Failed to connect to backend.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-2">Enter Process</h2>

      {/* Process f(t,W) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Process f(t, W)
        </label>
        <input
          type="text"
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder='e.g. "exp(σ*W - 0.5*σ^2*t)"'
          required
        />
      </div>

      {/* Toggle switch */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Mode</span>
        <div className="flex gap-2">
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
              value={T}
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial W₀
            </label>
            <input
              type="number"
              step="0.1"
              value={w0}
              onChange={(e) => setW0(parseFloat(e.target.value))}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Test Martingale
      </button>
    </form>
  );
}
