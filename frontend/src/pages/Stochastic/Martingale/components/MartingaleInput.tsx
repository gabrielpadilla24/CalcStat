"use client";

import { useState } from "react";
import MathFunctionInput from "@/components/MathFunctionInput";

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
};

export default function MartingaleInput({
  onResult,
}: {
  onResult: (result: MartingaleResponse) => void;
}) {
  const [processLatex, setProcessLatex] = useState(
    "exp(sigma*W - 0.5*sigma^2*t)"
  );
  const [mode, setMode] = useState<"montecarlo" | "analytical">("montecarlo");

  // Params para Monte Carlo
  const [T, setT] = useState(1);
  const [N, setN] = useState(100);
  const [M, setM] = useState(10);
  const [w0, setW0] = useState(0);

  const handleSubmit = async () => {
    try {
      const payload: MartingaleData =
        mode === "montecarlo"
          ? { process: processLatex, mode, T, N, M, w0 }
          : { process: processLatex, mode };

      const res = await fetch("http://localhost:8000/martingale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as MartingaleResponse;
      onResult(data);
    } catch {
      alert("❌ Failed to connect to backend.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-center mb-2">
        Enter Process and Mode
      </h2>

      {/* Process Input */}
      <MathFunctionInput
        label="Process f(t, W)"
        examples={["exp(sigma*W - 0.5*sigma^2*t)", "t*W", "W^2 - t"]}
        endpoint="/noop" // no usamos el endpoint interno
        payloadKey="process"
        onSuccess={() => {}}
        onLatexChange={setProcessLatex}
        presetLatex="W^2 - t"
      />

      {/* Mode Switch */}
      <div className="flex justify-center items-center gap-4">
        <label className="font-medium">Mode:</label>
        <select
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "montecarlo" | "analytical")
          }
          className="border rounded-md p-2"
        >
          <option value="montecarlo">Monte Carlo Simulation</option>
          <option value="analytical">Analytical (Itô’s Lemma)</option>
        </select>
      </div>

      {/* Extra params if Monte Carlo */}
      {mode === "montecarlo" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Horizon (T)
            </label>
            <input
              type="number"
              value={T}
              step="0.1"
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full border rounded-md p-2"
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial W₀
            </label>
            <input
              type="number"
              value={w0}
              step="0.1"
              onChange={(e) => setW0(parseFloat(e.target.value))}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Test Martingale
      </button>
    </div>
  );
}
