import React, { useState, useRef } from "react";
import RefinanceBreakEvenChart from "./RefinanceBreakEvenChart";

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
};

const RefinanceForm = () => {
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState("");
  const [balanceLeft, setBalanceLeft] = useState("");
  const [remainingTermYears, setRemainingTermYears] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newTermYears, setNewTermYears] = useState("");
  const [closingCosts, setClosingCosts] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RefinanceResult | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      const response = await fetch("http://localhost:8000/refinance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);

      // Scroll hacia los resultados
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error submitting refinance form:", error);
    } finally {
      setLoading(false);
    }
  };

  const isWorseDeal =
    result?.monthlySavings !== undefined && result.monthlySavings < 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Refinance Mortgage Calculator
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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

        <div className="md:col-span-2">
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

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Refinance"}
          </button>
        </div>
      </form>

      {result && (
        <>
          <div ref={resultRef} className="mt-10 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-6">
              New Monthly Payment
            </h3>
            <p
              className={`text-4xl font-bold text-center mb-2 ${
                isWorseDeal ? "text-red-600" : "text-green-600"
              }`}
            >
              ${result.newMonthlyPayment.toFixed(2)}
            </p>

            {isWorseDeal && (
              <p className="text-center text-red-600 font-medium mb-4">
                ⚠️ Refinancing increases your monthly payment. Consider keeping
                your current loan.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center text-gray-800">
              <div className="border-t pt-4">
                <p className="font-semibold text-sm">Monthly Savings</p>
                <p className={`text-lg ${isWorseDeal ? "text-red-600" : ""}`}>
                  ${result.monthlySavings.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-sm">Difference in Interest</p>
                <p className="text-lg">
                  ${result.differenceInInterest.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-sm">Total Cost</p>
                <p className="text-lg">${result.totalCost.toFixed(2)}</p>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-sm">Months to Recoup Costs</p>
                <p className="text-lg">
                  {result.monthsToRecoupCosts !== null
                    ? result.monthsToRecoupCosts.toFixed(2)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <RefinanceBreakEvenChart
            groupedOriginal={result.groupedOriginal}
            groupedRefinanced={result.groupedRefinanced}
          />
        </>
      )}
    </div>
  );
};

export default RefinanceForm;
