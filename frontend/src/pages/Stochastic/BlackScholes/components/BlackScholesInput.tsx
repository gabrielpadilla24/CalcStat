"use client";

import { useState } from "react";
import { api } from "@/lib/api";

type Mode = "derivation" | "analytical" | "montecarlo";
type OptionType = "call" | "put";

export type BlackScholesData = {
  S0: number;
  K: number;
  r: number;
  sigma: number;
  T: number;
  option_type: OptionType;
  N?: number;
  M?: number;
  mode: Mode;
};

export type BlackScholesResponse = {
  mode: Mode;
  params: BlackScholesData;
  pde_steps?: string[];
  solution?: string;
  chartData?: { [key: string]: number | string }[];
  stats?: { mean: number; variance: number; min: number; max: number };
  error?: string;
};

export default function BlackScholesInput({
  onResult,
  infoRef,
}: {
  onResult: (result: BlackScholesResponse | null) => void;
  infoRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [S0, setS0] = useState<number>(100);
  const [K, setK] = useState<number>(100);
  const [r, setR] = useState<number>(0.05);
  const [sigma, setSigma] = useState<number>(0.2);
  const [T, setT] = useState<number>(1);
  const [N, setN] = useState<number>(100);
  const [M, setM] = useState<number>(50);
  const [mode, setMode] = useState<Mode>("derivation");
  const [optionType, setOptionType] = useState<OptionType>("call");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: BlackScholesData = {
      S0,
      K,
      r,
      sigma,
      T,
      option_type: optionType,
      N,
      M,
      mode,
    };

    try {
      const res = await api.post<BlackScholesResponse>(
        "/blackscholes",
        payload
      );
      const data = res.data;
      if (data.error) {
        alert("⚠️ " + data.error);
      } else {
        onResult(data);
      }
    } catch {
      onResult(null);
      alert("❌ Failed to connect to backend.");
    }
  };

  const handleScroll = () => {
    if (infoRef?.current) {
      infoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center mb-2">
        Black–Scholes PDE Tool
      </h2>

      {/* Option type toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-sm font-medium text-gray-700">Option Type</span>
        <div className="flex flex-wrap gap-2">
          {(["call", "put"] as OptionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setOptionType(t)}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-md font-medium ${
                optionType === t
                  ? "bg-[#5FBA9B] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-sm font-medium text-gray-700">Mode</span>
        <div className="flex flex-wrap gap-2">
          {(["derivation", "analytical", "montecarlo"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-md font-medium ${
                mode === m
                  ? "bg-[#5FBA9B] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-3">
        {[
          { label: "Initial Price S₀", value: S0, setter: setS0, step: "1" },
          { label: "Strike K", value: K, setter: setK, step: "1" },
          { label: "Risk-free rate r", value: r, setter: setR, step: "0.01" },
          {
            label: "Volatility σ",
            value: sigma,
            setter: setSigma,
            step: "0.01",
          },
          { label: "Time Horizon T", value: T, setter: setT, step: "0.1" },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="number"
              step={field.step}
              value={field.value}
              onChange={(e) => field.setter(parseFloat(e.target.value))}
              className="w-full border rounded-md p-2"
            />
          </div>
        ))}
      </div>

      {/* Extra Monte Carlo params */}
      {mode === "montecarlo" && (
        <div className="space-y-3">
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
              placeholder="e.g. 50"
            />
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Run Black–Scholes
      </button>

      {/* 🔽 Scroll trigger */}
      <div
        onClick={handleScroll}
        className="flex items-center justify-center gap-2 mt-4 cursor-pointer text-[#5FBA9B] hover:text-[#4FAE8D] font-medium transition-colors"
      >
        <span className="text-base">↓</span>
        <span>Learn How it Works!</span>
      </div>
    </form>
  );
}
