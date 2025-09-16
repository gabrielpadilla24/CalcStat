"use client";

import { useState } from "react";

type GirsanovData = {
  mu: number;
  mu_tilde: number;
  sigma: number;
  T?: number;
  N?: number;
  M?: number;
  mode: "analytical" | "montecarlo";
};

type GirsanovResponse = {
  mode: string;
  params: GirsanovData;
  theta?: number;
  process_P?: string;
  process_Q?: string;
  radon_nikodym?: string;
  steps?: string[];
  error?: string;
};

export default function GirsanovInput({
  onResult,
}: {
  onResult: (result: GirsanovResponse) => void;
}) {
  const [mu, setMu] = useState<number>(0.1);
  const [muTilde, setMuTilde] = useState<number>(0.05);
  const [sigma, setSigma] = useState<number>(0.2);
  const [T, setT] = useState<number>(1);
  const [N, setN] = useState<number>(100);
  const [M, setM] = useState<number>(20);
  const [mode, setMode] = useState<"analytical" | "montecarlo">("analytical");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: GirsanovData = {
      mu,
      mu_tilde: muTilde,
      sigma,
      T,
      N,
      M,
      mode,
    };

    try {
      const res = await fetch("http://localhost:8000/girsanov", {
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
        Girsanov’s Theorem Tool
      </h2>

      {/* Mode toggle */}
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

      {/* Parameters */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Drift μ (under P)
          </label>
          <input
            type="number"
            step="0.01"
            value={mu}
            onChange={(e) => setMu(parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Drift μ̃ (under Q)
          </label>
          <input
            type="number"
            step="0.01"
            value={muTilde}
            onChange={(e) => setMuTilde(parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 0.05"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Volatility σ
          </label>
          <input
            type="number"
            step="0.01"
            value={sigma}
            onChange={(e) => setSigma(parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 0.2"
          />
        </div>
      </div>

      {/* Extra params for Monte Carlo */}
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
              placeholder="e.g. 1"
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
              placeholder="e.g. 100"
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
              placeholder="e.g. 20"
            />
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Apply Girsanov’s Theorem
      </button>
    </form>
  );
}
