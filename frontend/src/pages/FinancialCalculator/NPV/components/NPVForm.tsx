import React, { useState, useRef } from "react";
import NPVResults from "./NPVResults";

type NPVResponse = {
  npv: number;
  futureValue: number;
  years: number;
  interestRate: number;
};

const NPVForm = () => {
  const [futureValue, setFutureValue] = useState("");
  const [years, setYears] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NPVResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      futureValue: parseFloat(futureValue),
      years: parseInt(years),
      interestRate: parseFloat(interestRate),
    };

    try {
      const response = await fetch("http://localhost:8000/npv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (
        typeof data.npv === "number" &&
        typeof data.futureValue === "number" &&
        typeof data.years === "number" &&
        typeof data.interestRate === "number"
      ) {
        setResult(data);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setError("Incomplete data received from the server.");
      }
    } catch (err) {
      console.error("Error calculating NPV:", err);
      setError("There was a problem connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div>
          <label className="block font-medium mb-1">Future Value ($)</label>
          <input
            type="number"
            step="0.01"
            value={futureValue}
            onChange={(e) => setFutureValue(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Years</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Discount Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate NPV"}
          </button>
        </div>
      </form>

      {result && (
        <div ref={resultsRef}>
          <NPVResults {...result} />
        </div>
      )}

      {error && (
        <div className="mt-8 bg-red-50 border border-red-300 p-6 rounded-xl shadow text-red-800">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default NPVForm;
