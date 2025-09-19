import React, { useState } from "react";
import SavingsResults from "./SavingsResults";
import { api } from "@/lib/api";

export type SavingsResponse = {
  contribution: number;
  valores: number[];
  aportes: number[];
};

export type SavingsFormProps = {
  onResult: (result: SavingsResponse) => void;
};

const SavingsForm: React.FC<SavingsFormProps> = ({ onResult }) => {
  const [goalAmount, setGoalAmount] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [contribution, setContribution] = useState<number | null>(null);
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
      const response = await api.post<SavingsResponse>("/savings", payload);
      const data = response.data;

      if (
        typeof data.contribution === "number" &&
        Array.isArray(data.valores) &&
        Array.isArray(data.aportes)
      ) {
        setContribution(data.contribution);
        onResult(data);
      } else if ((data as { error?: string }).error) {
        setError((data as { error?: string }).error ?? null);
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      console.error("Error calculating savings contribution:", err);
      setError("There was a problem connecting to the server.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-full flex flex-col justify-between">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full flex-grow"
      >
        <div className="mb-6 text-center w-full">
          <h2 className="text-2xl font-semibold mb-3">
            Plan Your Savings Goal
          </h2>
        </div>

        <div className="w-full space-y-4 flex-grow">
          <div>
            <label className="block font-medium mb-1">Target Amount:</label>
            <input
              type="number"
              step="0.01"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="Eg: 10000"
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
              placeholder="Eg: 5"
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
              placeholder="Eg: 10"
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
