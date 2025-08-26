"use client";

import { useState } from "react";
import DistributionInput from "@/components/DistributionInput";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type BinomialParams = {
  n: number;
  p: number;
  query: ProbabilityQuery;
};

type BinomialResponse = {
  n: number;
  p: number;
  query: ProbabilityQuery;
};

type Props = {
  onResult: (result: BinomialResponse | null) => void;
};

export default function BinomialInput({ onResult }: Props) {
  const [n, setN] = useState<number>(10);
  const [p, setP] = useState<number>(0.5);
  const [query, setQuery] = useState<ProbabilityQuery>({ kind: "equal", k: 0 });
  const [loading, setLoading] = useState(false);

  const handleUpdate = (newQuery: ProbabilityQuery) => {
    setQuery(newQuery);
  };

  const handleSubmit = async () => {
    const params: BinomialParams = { n, p, query };
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/binomialdistribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data: BinomialResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching binomial distribution:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-bold">Binomial Distribution</h2>

      {/* n */}
      <div className="flex items-center gap-2">
        <label className="w-32">Number of trials (n):</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-32"
          value={n}
          min={1}
          onChange={(e) => setN(Number(e.target.value))}
        />
      </div>

      {/* p */}
      <div className="flex items-center gap-2">
        <label className="w-32">Success probability (p):</label>
        <input
          type="number"
          step="0.01"
          min={0}
          max={1}
          className="border rounded px-2 py-1 w-32"
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
        />
      </div>

      {/* Consulta de probabilidad */}
      <DistributionInput onChange={handleUpdate} />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Calculating..." : "Submit"}
      </button>
    </div>
  );
}
