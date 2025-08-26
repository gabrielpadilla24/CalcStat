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
  const [n, setN] = useState<string>("");
  const [p, setP] = useState<string>("");
  const [query, setQuery] = useState<ProbabilityQuery>({ kind: "equal", k: 0 });
  const [loading, setLoading] = useState(false);

  const handleUpdate = (newQuery: ProbabilityQuery) => {
    setQuery(newQuery);
  };

  const handleSubmit = async () => {
    if (!n || !p) return;

    const params: BinomialParams = {
      n: Number(n),
      p: Number(p),
      query,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/binomialdistribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error("Backend error");

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
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-bold text-center">Binomial Distribution</h2>

      {/* n */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Number of trials (n):</label>
        <input
          type="number"
          value={n}
          placeholder="Enter n"
          min={1}
          onChange={(e) => setN(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* p */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Success probability (p):</label>
        <input
          type="number"
          step="0.01"
          min={0}
          max={1}
          value={p}
          placeholder="Enter p"
          onChange={(e) => setP(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Consulta de probabilidad */}
      <DistributionInput onChange={handleUpdate} />

      {/* Botón centrado */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading || !n || !p}
          className="mt-6 bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
