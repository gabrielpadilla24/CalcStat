"use client";

import { useState } from "react";

type BayesParams = {
  p_a: number;
  p_b?: number;
  p_b_given_a: number;
  p_b_given_not_a?: number;
};

type BayesResponse = {
  p_a: number;
  p_b: number;
  p_b_given_a: number;
  p_b_given_not_a?: number;
  posterior: number;
  latex: string;
  error?: string;
};

type Props = {
  onResult: (result: BayesResponse | null) => void;
};

export default function BayesInput({ onResult }: Props) {
  const [pA, setPA] = useState<string>("");
  const [pB, setPB] = useState<string>(""); // opcional
  const [pBgA, setPBgA] = useState<string>("");
  const [pBgNotA, setPBgNotA] = useState<string>(""); // opcional
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!pA || !pBgA) return;

    const params: BayesParams = {
      p_a: Number(pA),
      p_b: pB ? Number(pB) : undefined,
      p_b_given_a: Number(pBgA),
      p_b_given_not_a: pBgNotA ? Number(pBgNotA) : undefined,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/bayes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: BayesResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching Bayes result:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full h-full flex flex-col">
      <h2 className="text-xl font-bold text-center mb-6">
        Bayes Theorem / Conditional Probability
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the required probabilities. You can provide either P(B) or
        P(B|¬A).
      </p>

      {/* Centramos el contenido */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* P(A) */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">P(A): Prior probability of A</label>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={pA}
            placeholder="Enter P(A) (e.g. 0.3)"
            onChange={(e) => setPA(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>

        {/* P(B) opcional */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            P(B): Probability of B (optional)
          </label>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={pB}
            placeholder="Enter P(B) (e.g. 0.4)"
            onChange={(e) => setPB(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
          <p className="text-sm text-gray-500">
            👉 If not provided, P(B) will be computed using P(B|¬A).
          </p>
        </div>

        {/* P(B|A) */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">P(B|A): Likelihood of B given A</label>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={pBgA}
            placeholder="Enter P(B|A) (e.g. 0.7)"
            onChange={(e) => setPBgA(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>

        {/* P(B|¬A) opcional */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            P(B|¬A): Likelihood of B given not A (optional)
          </label>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={pBgNotA}
            placeholder="Enter P(B|¬A) (e.g. 0.2)"
            onChange={(e) => setPBgNotA(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
          <p className="text-sm text-gray-500">
            👉 Required only if P(B) is not provided.
          </p>
        </div>
      </div>

      {/* Botón */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || !pA || !pBgA}
          className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
