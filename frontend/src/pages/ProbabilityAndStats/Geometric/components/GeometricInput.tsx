"use client";

import { useState } from "react";
import DistributionInput from "@/components/DistributionInput";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type GeometricParams = {
  p: number;
  query: ProbabilityQuery;
};

type GeometricResponse = {
  p: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  onResult: (result: GeometricResponse | null) => void;
};

export default function GeometricInput({ onResult }: Props) {
  const [p, setP] = useState<string>("");
  const [query, setQuery] = useState<ProbabilityQuery>({ kind: "equal", k: 1 });
  const [loading, setLoading] = useState(false);

  const handleUpdate = (newQuery: ProbabilityQuery) => {
    setQuery(newQuery);
  };

  const handleSubmit = async () => {
    if (!p) return;

    const params: GeometricParams = {
      p: Number(p),
      query,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/geometricdistribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: GeometricResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching geometric distribution:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full h-full flex flex-col">
      <h2 className="text-xl font-bold text-center mb-6">
        Geometric Distribution
      </h2>

      {/* Centramos el contenido */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* p */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Success Probability (p): Probability of success in each trial
          </label>
          <p className="text-sm text-gray-500 mb-1">
            👉 Example: If the chance of success in each trial is 20%, then p =
            0.2.
          </p>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={p}
            placeholder="Enter p (e.g. 0.3)"
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
          disabled={loading || !p}
          className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
