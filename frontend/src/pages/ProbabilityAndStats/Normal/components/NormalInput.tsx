"use client";

import { useState } from "react";
import ContinuousDistributionInput, {
  ContinuousQuery,
} from "@/components/ContinuousDistributionInput";

type NormalParams = {
  mu: number;
  sigma: number;
  query: ContinuousQuery;
};

type NormalResponse = {
  mu: number;
  sigma: number;
  query: ContinuousQuery;
  support: number[];
  pdf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  onResult: (result: NormalResponse | null) => void;
};

export default function NormalInput({ onResult }: Props) {
  const [mu, setMean] = useState<string>("");
  const [sigma, setStd] = useState<string>("");
  const [query, setQuery] = useState<ContinuousQuery>({ kind: "leq", k: 0 });
  const [loading, setLoading] = useState(false);

  const handleUpdate = (newQuery: ContinuousQuery) => {
    setQuery(newQuery);
  };

  const handleSubmit = async () => {
    if (!mu || !sigma) return;

    const params: NormalParams = {
      mu: Number(mu),
      sigma: Number(sigma),
      query,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/normaldistribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: NormalResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching normal distribution:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full h-full flex flex-col">
      <h2 className="text-xl font-bold text-center mb-6">
        Normal Distribution
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the parameters for the normal distribution.
      </p>

      {/* Centramos el contenido */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* μ */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Mean (μ): Expected value of the distribution
          </label>
          <p className="text-sm text-gray-500 mb-1">
            👉 Example: If exam scores average 70, then μ = 70.
          </p>
          <input
            type="number"
            step="0.1"
            value={mu}
            placeholder="Enter μ (e.g. 70)"
            onChange={(e) => setMean(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>

        {/* σ */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Standard Deviation (σ): Spread of the distribution
          </label>
          <p className="text-sm text-gray-500 mb-1">
            👉 Example: If the standard deviation of scores is 10, then σ = 10.
          </p>
          <input
            type="number"
            step="0.1"
            min={0.0001}
            value={sigma}
            placeholder="Enter σ (e.g. 10)"
            onChange={(e) => setStd(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>

        {/* Consulta de probabilidad */}
        <div>
          <label className="font-medium">Probability Query</label>
          <p className="text-sm text-gray-500 mb-2">
            Choose the probability type (≤, ≥, or between values).
          </p>
          <ContinuousDistributionInput onChange={handleUpdate} />
        </div>
      </div>

      {/* Botón abajo */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || !mu || !sigma}
          className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
