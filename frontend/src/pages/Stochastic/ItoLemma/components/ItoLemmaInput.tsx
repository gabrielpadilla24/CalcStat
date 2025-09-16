"use client";

import { useState } from "react";

type ItoLemmaData = {
  f: string;
  mu: string;
  sigma: string;
};

type ItoLemmaResponse = {
  params: ItoLemmaData;
  partials: { f_t: string; f_x: string; f_xx: string };
  drift: string;
  diffusion: string;
  final: string;
  steps: string[];
};

export default function ItoLemmaInput({
  onResult,
}: {
  onResult: (result: ItoLemmaResponse) => void;
}) {
  const [f, setF] = useState("t*x**2");
  const [mu, setMu] = useState("0.05*x");
  const [sigma, setSigma] = useState("0.2*x");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ItoLemmaData = { f, mu, sigma };

    try {
      const res = await fetch("http://localhost:8000/ito-lemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
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
        Enter Function and Process
      </h2>

      {/* Function f(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Function f(t, x)
        </label>
        <input
          type="text"
          value={f}
          onChange={(e) => setF(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder='e.g. "t*x**2", "exp(x)", "log(x)"'
          required
        />
      </div>

      {/* Drift μ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Drift μ(t, x)
        </label>
        <input
          type="text"
          value={mu}
          onChange={(e) => setMu(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder='e.g. "0.05*x", "t", "1"'
          required
        />
      </div>

      {/* Volatility σ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Volatility σ(t, x)
        </label>
        <input
          type="text"
          value={sigma}
          onChange={(e) => setSigma(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder='e.g. "0.2*x", "1", "sqrt(t)"'
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Apply Itô’s Lemma
      </button>
    </form>
  );
}
