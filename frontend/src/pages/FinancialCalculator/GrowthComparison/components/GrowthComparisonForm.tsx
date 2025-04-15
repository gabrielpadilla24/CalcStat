import React, { useState } from "react";
//import GrowthComparisonResults from "./GrowthComparisonResults";

export type GrowthComparisonResponse = {
  finalValues: number[];
  interestRates: number[];
  timeline: number[];
  valoresPorTasa: number[][];
};

export type GrowthComparisonFormProps = {
  onResult: (result: GrowthComparisonResponse) => void;
};

const GrowthComparisonForm: React.FC<GrowthComparisonFormProps> = ({
  onResult,
}) => {
  const [initialAmount, setInitialAmount] = useState<string>("");
  const [rate1, setRate1] = useState<string>("");
  const [rate2, setRate2] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      initial_amount: parseFloat(initialAmount),
      years: parseInt(years),
      interest_rates: [parseFloat(rate1), parseFloat(rate2)],
    };

    try {
      const response = await fetch("http://localhost:8000/growth-comparison", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: GrowthComparisonResponse = await response.json();

      if (
        Array.isArray(data.finalValues) &&
        Array.isArray(data.interestRates) &&
        Array.isArray(data.timeline) &&
        Array.isArray(data.valoresPorTasa)
      ) {
        onResult(data);
      } else if ((data as { error?: string }).error) {
        setError((data as { error: string }).error);
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      console.error("Error fetching growth comparison:", err);
      setError("There was a problem connecting to the server.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="mb-6 text-center w-full">
          <h2 className="text-2xl font-semibold mb-3">
            Compare Two Return Rates
          </h2>
        </div>

        <div className="w-full space-y-4">
          <div>
            <label className="block font-medium mb-1">Initial Amount:</label>
            <input
              type="number"
              step="0.01"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              placeholder="Ej: 5000"
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">
                Return Rate 1 (%):
              </label>
              <input
                type="number"
                step="0.01"
                value={rate1}
                onChange={(e) => setRate1(e.target.value)}
                placeholder="Ej: 5"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block font-medium mb-1">
                Return Rate 2 (%):
              </label>
              <input
                type="number"
                step="0.01"
                value={rate2}
                onChange={(e) => setRate2(e.target.value)}
                placeholder="Ej: 8"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Time Period (Years):
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Ej: 10"
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Compare Growth
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-xl text-red-700 text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default GrowthComparisonForm;
