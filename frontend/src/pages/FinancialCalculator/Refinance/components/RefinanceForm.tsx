import React, { useState, useRef } from "react";
import RefinanceBreakEvenChart from "./RefinanceBreakEvenChart";
import ScoreMeter from "./ScoreMeter";
import RefinanceEducation from "./RefinanceEducation";
import { api } from "@/lib/api";

type RefinanceResult = {
  newMonthlyPayment: number;
  monthlySavings: number;
  differenceInInterest: number;
  totalCost: number;
  monthsToRecoupCosts: number | null;
  cumulativeOriginal: number[];
  cumulativeRefinanced: number[];
  groupedOriginal: number[];
  groupedRefinanced: number[];
  refinanceScore?: number;
};

const RefinanceForm = () => {
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState("");
  const [balanceLeft, setBalanceLeft] = useState("");
  const [remainingTermYears, setRemainingTermYears] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newTermYears, setNewTermYears] = useState("");
  const [closingCosts, setClosingCosts] = useState("");

  const [result, setResult] = useState<RefinanceResult | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      currentMonthlyPayment: parseFloat(currentMonthlyPayment),
      balanceLeft: parseFloat(balanceLeft),
      remainingTermYears: parseInt(remainingTermYears),
      currentRate: parseFloat(currentRate),
      newRate: parseFloat(newRate),
      newTermYears: parseInt(newTermYears),
      closingCosts: parseFloat(closingCosts),
    };

    try {
      const res = await api.post<RefinanceResult & { refinanceScore: number }>(
        "/refinance",
        payload
      );

      const data = res.data;
      setResult(data);
      setScore(data.refinanceScore ?? null);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error submitting refinance form:", error);
    }
  };

  const isWorseDeal =
    result?.monthlySavings !== undefined && result.monthlySavings < 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-2xl">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-medium mb-1">
            Current monthly payment
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="$"
            value={currentMonthlyPayment}
            onChange={(e) => setCurrentMonthlyPayment(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Current loan interest rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={currentRate}
            onChange={(e) => setCurrentRate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Balance left on mortgage
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="$"
            value={balanceLeft}
            onChange={(e) => setBalanceLeft(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            New interest rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Remaining loan term (years)
          </label>
          <input
            type="number"
            value={remainingTermYears}
            onChange={(e) => setRemainingTermYears(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            New loan term (years)
          </label>
          <input
            type="number"
            value={newTermYears}
            onChange={(e) => setNewTermYears(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium mb-1">Closing Costs ($)</label>
          <input
            type="number"
            step="0.01"
            value={closingCosts}
            onChange={(e) => setClosingCosts(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Calculate Refinance
          </button>
        </div>
      </form>

      {/* RESULTS */}
      {result && (
        <>
          <div
            ref={resultRef}
            className="mt-10 bg-gray-100 p-4 sm:p-6 rounded-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">
              New Monthly Payment
            </h3>
            <p
              className={`text-2xl sm:text-4xl font-bold text-center mb-2 ${
                isWorseDeal ? "text-red-600" : "text-green-600"
              }`}
            >
              ${result.newMonthlyPayment.toFixed(2)}
            </p>

            {isWorseDeal && (
              <p className="text-center text-red-600 font-medium mb-4 text-sm sm:text-base">
                ⚠️ Refinancing increases your monthly payment. Consider keeping
                your current loan.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center text-gray-800">
              <div className="border-t pt-4">
                <p className="font-semibold text-xs sm:text-sm">
                  Monthly Savings
                </p>
                <p
                  className={`text-base sm:text-lg ${
                    isWorseDeal ? "text-red-600" : ""
                  }`}
                >
                  ${result.monthlySavings.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-xs sm:text-sm">
                  Difference in Interest
                </p>
                <p className="text-base sm:text-lg">
                  ${result.differenceInInterest.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-xs sm:text-sm">Total Cost</p>
                <p className="text-base sm:text-lg">
                  ${result.totalCost.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-xs sm:text-sm">
                  Months to Recoup Costs
                </p>
                <p className="text-base sm:text-lg">
                  {result.monthsToRecoupCosts !== null
                    ? result.monthsToRecoupCosts.toFixed(2)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {score !== null && (
            <div className="mt-8">
              <ScoreMeter value={score} />
            </div>
          )}

          <div className="mt-8">
            <RefinanceBreakEvenChart
              groupedOriginal={result.groupedOriginal}
              groupedRefinanced={result.groupedRefinanced}
            />
          </div>

          <div className="mt-8">
            <RefinanceEducation />
          </div>
        </>
      )}
    </div>
  );
};

export default RefinanceForm;
