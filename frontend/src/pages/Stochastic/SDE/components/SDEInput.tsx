"use client";

import { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import { api } from "@/lib/api";

addStyles();

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
  const [x0, setX0] = useState<number>(1);
  const [muLatex, setMuLatex] = useState("");
  const [sigmaLatex, setSigmaLatex] = useState("");
  const [T, setT] = useState<number>(1);
  const [N, setN] = useState<number>(100);
  const [M, setM] = useState<number>(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: SDEData = {
      x0,
      mu: muLatex,
      sigma: sigmaLatex,
      T,
      N,
      M,
    };

    try {
      const res = await api.post<SDEResponse>("/sde", payload);
      const data = res.data;
      onResult(data);
    } catch {
      alert("❌ Failed to connect to backend.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-5"
    >
      <h2 className="text-xl font-semibold text-center mb-2">
        Enter SDE Parameters
      </h2>

      {/* Initial value X₀ */}
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
          placeholder="1.0"
        />
      </div>

      {/* Drift μ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Drift μ(t, x)
        </label>
        <EditableMathField
          latex={muLatex}
          onChange={(mf) => setMuLatex(mf.latex())}
          className="text-xl w-full border border-gray-300 px-4 py-2 rounded-lg bg-white"
        />
        <p className="text-sm text-gray-500 mt-1">e.g. 0.05 · x</p>
      </div>

      {/* Volatility σ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Volatility σ(t, x)
        </label>
        <EditableMathField
          latex={sigmaLatex}
          onChange={(mf) => setSigmaLatex(mf.latex())}
          className="text-xl w-full border border-gray-300 px-4 py-2 rounded-lg bg-white"
        />
        <p className="text-sm text-gray-500 mt-1">e.g. 0.2 · x</p>
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
          placeholder="1.0"
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
          placeholder="100"
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
          placeholder="5"
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
