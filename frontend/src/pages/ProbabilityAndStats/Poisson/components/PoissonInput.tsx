"use client";

import { useState } from "react";
import DistributionInput from "@/components/DistributionInput";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type PoissonParams = {
  lam: number;
  query: ProbabilityQuery;
};

type PoissonResponse = {
  lam: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  onResult: (result: PoissonResponse | null) => void;
};

export default function PoissonInput({ onResult }: Props) {
  const [lam, setLambda] = useState<string>("");
  const [query, setQuery] = useState<ProbabilityQuery>({ kind: "equal", k: 0 });
  const [loading, setLoading] = useState(false);

  const handleUpdate = (newQuery: ProbabilityQuery) => {
    setQuery(newQuery);
  };

  const handleSubmit = async () => {
    if (!lam) return;

    const params: PoissonParams = {
      lam: Number(lam),
      query,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/poissondistribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: PoissonResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching poisson distribution:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full h-full flex flex-col">
      <h2 className="text-xl font-bold text-center mb-6">
        Poisson Distribution
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the values below to calculate the poisson probability
        distribution.
      </p>

      {/* Centramos el contenido */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* λ */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Lambda (λ): Average number of events in a fixed interval
          </label>
          <p className="text-sm text-gray-500 mb-1">
            👉 Example: If on average 5 customers arrive per hour, then λ = 5.
          </p>
          <input
            type="number"
            step="0.1"
            min={0}
            value={lam}
            placeholder="Enter λ (e.g. 4.5)"
            onChange={(e) => setLambda(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>

        {/* Consulta de probabilidad */}
        <div>
          <label className="font-medium">Probability Query</label>
          <p className="text-sm text-gray-500 mb-2">
            Choose the type of probability you want to calculate.
          </p>
          <DistributionInput onChange={handleUpdate} />
        </div>
      </div>

      {/* Botón abajo */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || !lam}
          className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
