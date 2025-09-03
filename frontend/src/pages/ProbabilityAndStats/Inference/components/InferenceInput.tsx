"use client";

import { useState } from "react";

type InferenceResponse = {
  test: string;
  statistic: number;
  p_value: number;
  alpha: number;
  alternative: string;
  ci: number[];
  latex_ci: string;
  decision: string;
  error?: string;
};

type Props = {
  onResult: (result: InferenceResponse | null) => void;
};

export default function InferenceInput({ onResult }: Props) {
  const [test, setTest] = useState("z");
  const [xbar, setXbar] = useState("");
  const [mu0, setMu0] = useState("");
  const [s, setS] = useState("");
  const [n, setN] = useState("");
  const [alpha, setAlpha] = useState("0.05");
  const [alternative, setAlternative] = useState("!=");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!xbar || !mu0 || !s || !n) return;

    const payload = {
      test,
      xbar: Number(xbar),
      mu0: Number(mu0),
      s: Number(s),
      n: Number(n),
      alpha: Number(alpha),
      alternative,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/inference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: InferenceResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching inference result:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">
        Confidence Intervals & Hypothesis Tests
      </h2>

      {/* Test selector */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-medium">Test type</label>
        <select
          value={test}
          onChange={(e) => setTest(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="z">Z-test</option>
          <option value="t">T-test</option>
        </select>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium">Sample mean (x̄)</label>
          <input
            type="number"
            value={xbar}
            onChange={(e) => setXbar(e.target.value)}
            placeholder="e.g. 5.2"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Hypothesized mean (μ₀)</label>
          <input
            type="number"
            value={mu0}
            onChange={(e) => setMu0(e.target.value)}
            placeholder="e.g. 5"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Std. deviation (σ or s)</label>
          <input
            type="number"
            value={s}
            onChange={(e) => setS(e.target.value)}
            placeholder="e.g. 1.2"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Sample size (n)</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            placeholder="e.g. 30"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Alpha */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-medium">Significance level (α)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          placeholder="0.05"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Alternative hypothesis */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="font-medium">Alternative hypothesis</label>
        <select
          value={alternative}
          onChange={(e) => setAlternative(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="!=">H₁: μ ≠ μ₀ (two-sided)</option>
          <option value=">">H₁: μ &gt; μ₀ (right-tailed)</option>
          <option value="<">H₁: μ &lt; μ₀ (left-tailed)</option>
        </select>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
      >
        {loading ? "Calculating..." : "Calculate"}
      </button>
    </div>
  );
}
