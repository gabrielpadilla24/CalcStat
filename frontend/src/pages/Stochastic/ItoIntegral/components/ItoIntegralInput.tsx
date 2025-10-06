"use client";

import { useState } from "react";
import { api } from "@/lib/api";

type ItoData = {
  integrand: string;
  T: number;
  N: number;
  M: number;
  w0: number;
};

type ItoResponse = {
  params: ItoData;
  chartData: { [key: string]: number | string }[];
  error?: string;
};

export default function ItoIntegralInput({
  onResult,
}: {
  onResult: (result: ItoResponse) => void;
}) {
  const [integrand, setIntegrand] = useState("t");
  const [T, setT] = useState(1);
  const [N, setN] = useState(100);
  const [M, setM] = useState(5);
  const [w0, setW0] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ItoData = { integrand, T, N, M, w0 };

    try {
      const res = await api.post<ItoResponse>("/ito", payload);
      const data = res.data;
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        onResult(data);
      }
    } catch {
      alert("Failed to connect to backend.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-2">
        Enter Parameters
      </h2>

      {/* Integrand */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Integrand X(t, W)
        </label>
        <input
          type="text"
          value={integrand}
          onChange={(e) => setIntegrand(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder='e.g. "t", "sin(t)", "W", "t*W"'
          required
        />
      </div>

      {/* Horizon T */}
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

      {/* Initial W0 */}
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

      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Simulate
      </button>
    </form>
  );
}
