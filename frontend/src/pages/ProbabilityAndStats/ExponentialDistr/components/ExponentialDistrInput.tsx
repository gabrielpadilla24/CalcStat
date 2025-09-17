"use client";

import { useState } from "react";
import ContinuousDistributionInput, {
  ContinuousQuery,
} from "@/components/ContinuousDistributionInput";

type ExponentialParams = {
  lam: number;
  query: ContinuousQuery;
};

type ExponentialResponse = {
  lam: number;
  query: ContinuousQuery;
  support: number[];
  pdf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  onResult: (result: ExponentialResponse | null) => void;
};

export default function ExponentialDistrInput({ onResult }: Props) {
  const [lam, setLam] = useState<string>("");
  const [query, setQuery] = useState<ContinuousQuery>({
    kind: "leq",
    k: undefined,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdate = (newQuery: ContinuousQuery) => {
    setQuery(newQuery);
  };

  const handleSubmit = async () => {
    if (!lam) return;

    const params: ExponentialParams = {
      lam: Number(lam),
      query,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/exponentialdistribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: ExponentialResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching exponential distribution:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full h-full flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6">
        Exponential Distribution
      </h2>
      <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
        Enter the parameter λ (rate) for the exponential distribution.
      </p>

      {/* Form content */}
      <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
        {/* λ */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm sm:text-base">
            Lambda (λ): Rate parameter (average number of events per unit time)
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">
            👉 Example: If the average waiting time between arrivals is 10
            minutes, then λ = 0.1.
          </p>
          <input
            type="number"
            step="0.01"
            min={0.0001}
            value={lam}
            placeholder="Enter λ (e.g. 0.5)"
            onChange={(e) => setLam(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full text-sm sm:text-base"
          />
        </div>

        {/* Probability query */}
        <div>
          <label className="font-medium text-sm sm:text-base">
            Probability Query
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mb-2">
            Choose the probability type (≤, ≥, or between values).
          </p>
          <ContinuousDistributionInput onChange={handleUpdate} />
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || !lam}
          className="bg-[#5FBA9B] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full text-sm sm:text-base"
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
