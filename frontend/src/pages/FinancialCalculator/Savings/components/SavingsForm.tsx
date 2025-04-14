import React, { useState } from "react";
import SavingsResults from "./SavingsResults";

type SavingsFormProps = {
  goalAmount: string;
  setGoalAmount: (value: string) => void;
  years: string;
  setYears: (value: string) => void;
  interestRate: string;
  setInterestRate: (value: string) => void;
  onResult: (contribution: number) => void;
  contribution: number | null;
};

const SavingsForm: React.FC<SavingsFormProps> = ({
  goalAmount,
  setGoalAmount,
  years,
  setYears,
  interestRate,
  setInterestRate,
  onResult,
  contribution,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      goal: parseFloat(goalAmount),
      years: parseInt(years),
      interest_rate: parseFloat(interestRate),
    };

    try {
      const response = await fetch("http://localhost:8000/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (typeof data.contribution === "number") {
        onResult(data.contribution);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      console.error("Error calculating savings contribution:", err);
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
            Plan Your Savings Goal
          </h2>
        </div>

        <div className="w-full space-y-4">
          <div>
            <label className="block font-medium mb-1">Target Amount:</label>
            <input
              type="number"
              step="0.01"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Interest Rate (%):</label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Time Period (Years):
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Calculate
        </button>
      </form>

      <div className="mt-8">
        <SavingsResults contribution={contribution} />
      </div>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-xl text-red-700 text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SavingsForm;
