"use client";

import { useState } from "react";
import DistributionInput from "@/components/DistributionInput";
import { api } from "@/lib/api";

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
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
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
      const res = await api.post<BinomialResponse>(
        "/binomialdistribution",
        params
      );
      onResult(res.data);
    } catch (err) {
      console.error("Error fetching binomial distribution:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 flex flex-col w-full">
      {/* 🔹 Title */}
      <h2 className="text-2xl font-bold text-center mb-2">
        Binomial Distribution
      </h2>
      <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
        Enter the values below to calculate the binomial probability
        distribution.
      </p>

      {/* 🔹 Inputs & Content */}
      <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
        {/* n */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Number of trials (n):</label>
          <input
            type="number"
            value={n}
            placeholder="Enter n"
            min={1}
            onChange={(e) => setN(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            onChange={(e) => {
              let val = parseFloat(e.target.value);

              if (isNaN(val)) {
                setP("");
                return;
              }
              if (val < 0) val = 0;
              if (val > 1) val = 1;

              setP(val.toString());
            }}
            className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Probability Query Selector */}
        <DistributionInput onChange={handleUpdate} />

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading || !n || !p}
            className="mt-4 sm:mt-6 bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
          >
            {loading ? "Calculating..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
