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

type Props = {
  onChange: (params: BinomialParams) => void;
};

export default function BinomialInput({ onChange }: Props) {
  const [n, setN] = useState<number>(10);
  const [p, setP] = useState<number>(0.5);
  const [query, setQuery] = useState<ProbabilityQuery>({ kind: "equal", k: 0 });

  const handleUpdate = (newQuery: ProbabilityQuery) => {
    setQuery(newQuery);
    onChange({ n, p, query: newQuery });
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
          onChange={(e) => {
            const val = Number(e.target.value);
            setN(val);
            onChange({ n: val, p, query });
          }}
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
          onChange={(e) => {
            const val = Number(e.target.value);
            setP(val);
            onChange({ n, p: val, query });
          }}
        />
      </div>

      {/* Consulta de probabilidad */}
      <DistributionInput onChange={handleUpdate} />
    </div>
  );
}
