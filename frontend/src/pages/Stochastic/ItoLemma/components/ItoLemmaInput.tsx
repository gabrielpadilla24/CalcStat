"use client";

import { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import { api } from "@/lib/api";

addStyles();

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
  const [f, setF] = useState("t*x^2");
  const [mu, setMu] = useState("0.05*x");
  const [sigma, setSigma] = useState("0.2*x");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ItoLemmaData = { f, mu, sigma };

    try {
      const res = await api.post<ItoLemmaResponse>("/ito-lemma", payload);
      onResult(res.data);
    } catch {
      alert("❌ Failed to connect to backend.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-center mb-2">
        Enter Function and Process
      </h2>

      {/* Function f(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Function f(t, x)
        </label>
        <EditableMathField
          latex={f}
          onChange={(mf) => setF(mf.latex())}
          className="text-xl w-full border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none"
        />
      </div>

      {/* Drift μ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Drift μ(t, x)
        </label>
        <EditableMathField
          latex={mu}
          onChange={(mf) => setMu(mf.latex())}
          className="text-xl w-full border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none"
        />
      </div>

      {/* Volatility σ(t,x) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Volatility σ(t, x)
        </label>
        <EditableMathField
          latex={sigma}
          onChange={(mf) => setSigma(mf.latex())}
          className="text-xl w-full border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-[#5FBA9B] hover:bg-[#4FAE8D] text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Apply Itô’s Lemma
      </button>
    </form>
  );
}
