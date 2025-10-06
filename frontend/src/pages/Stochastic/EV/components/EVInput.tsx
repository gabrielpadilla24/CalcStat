"use client";

import { useState } from "react";
import { api } from "@/lib/api";

type EVData = {
  process: string;
};

type EVResponse = {
  mode: string;
  params: EVData;
  expectation: string;
  variance: string;
  steps: string[];
};

export default function EVInput({
  onResult,
}: {
  onResult: (result: EVResponse) => void;
}) {
  // 🔹 Default matches backend expectation
  const [process, setProcess] = useState("Brownian motion");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: EVData = { process };

    try {
      const res = await api.post<EVResponse>("/ev", payload);
      onResult(res.data);
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
        Select a Process
      </h2>

      {/* Backend-recognized processes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Process
        </label>
        <select
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="Brownian motion">Brownian Motion: Xₜ = Wₜ</option>
          <option value="Deterministic time">Deterministic Time: Xₜ = t</option>
          <option value="Exponential martingale">
            Exponential Martingale: Xₜ = e^(σWₜ - ½σ²t)
          </option>
          <option value="Shifted Brownian motion">
            Shifted Brownian Motion: Xₜ = aWₜ + b
          </option>
          <option value="Quadratic martingale">
            Quadratic Martingale: Xₜ = Wₜ² - t
          </option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Compute E[Xₜ] and Var(Xₜ)
      </button>
    </form>
  );
}
