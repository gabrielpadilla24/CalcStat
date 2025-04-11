import React, { useState, useRef } from "react";
import NPVResults from "./NPVResults";

type NPVResponse = {
  npv: number;
  futureValue: number;
  years: number;
  interestRate: number;
};

type CashFlow = {
  year: number;
  amount: string;
};

const NPVForm = () => {
  const [mode, setMode] = useState<"single" | "sequence">("single");

  const [futureValue, setFutureValue] = useState("");
  const [years, setYears] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { year: 0, amount: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NPVResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAddYear = () => {
    const nextYear =
      cashFlows.length > 0 ? cashFlows[cashFlows.length - 1].year + 1 : 0;
    setCashFlows([...cashFlows, { year: nextYear, amount: "" }]);
  };

  const handleRemoveYear = (year: number) => {
    if (year === 0) return;
    setCashFlows(cashFlows.filter((cf) => cf.year !== year));
  };

  const handleChangeAmount = (index: number, value: string) => {
    const updated = [...cashFlows];
    updated[index].amount = value;
    setCashFlows(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    if (mode === "single") {
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
    } else {
      console.log("Sequence cash flows (preview):", cashFlows);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-5xl mx-auto mt-8">
      <div className="mb-6">
        <label className="block font-medium mb-2">Calculation Mode</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-medium ${
              mode === "single" ? "bg-[#0BB489] text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("single")}
          >
            Single Value
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-medium ${
              mode === "sequence" ? "bg-[#0BB489] text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("sequence")}
          >
            Cash Flow Sequence
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "single" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <label className="block font-medium mb-1">
                Discount Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>
        )}

        {mode === "sequence" && (
          <div>
            {/* Discount Rate */}
            <div className="flex items-center gap-4 mb-4">
              <label className="w-48 font-medium">Discount Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full max-w-xs"
                required
              />
            </div>

            {/* Year 0 */}
            <div className="flex items-center gap-4 mb-4">
              <label className="w-48 font-medium">Year 0</label>
              <input
                type="number"
                step="0.01"
                value={cashFlows[0].amount}
                onChange={(e) => handleChangeAmount(0, e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full max-w-xs"
                required
              />
            </div>

            {/* Other Years */}
            <div className="space-y-4 mt-6">
              {cashFlows.slice(1).map((cf, index) => (
                <div key={cf.year} className="flex items-center gap-4">
                  <label className="w-48 font-medium">{`Year ${cf.year}`}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cf.amount}
                    onChange={(e) =>
                      handleChangeAmount(index + 1, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full max-w-xs"
                    required
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={() => handleRemoveYear(cf.year)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddYear}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              + Add Year
            </button>
          </div>
        )}

        <div className="mt-6">
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
        <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-xl text-red-700">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default NPVForm;
