import React, { useState } from "react";

type RefinanceResult = {
  remainingOriginalCost: number;
  newMonthlyPayment: number;
  totalCostRefinanced: number;
  netSavings: number;
};

const RefinanceForm = () => {
  const [originalLoanAmount, setOriginalLoanAmount] = useState("");
  const [originalRate, setOriginalRate] = useState("");
  const [originalTermYears, setOriginalTermYears] = useState("");
  const [paymentsMade, setPaymentsMade] = useState("");

  const [newRate, setNewRate] = useState("");
  const [newTermYears, setNewTermYears] = useState("");
  const [closingCosts, setClosingCosts] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RefinanceResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      originalLoanAmount: parseFloat(originalLoanAmount),
      originalRate: parseFloat(originalRate),
      originalTermYears: parseInt(originalTermYears),
      paymentsMade: parseInt(paymentsMade),
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
    } catch (error) {
      console.error("Error submitting refinance form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Original Mortgage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="Original Loan Amount ($)"
              value={originalLoanAmount}
              onChange={(e) => setOriginalLoanAmount(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Original Interest Rate (%)"
              value={originalRate}
              onChange={(e) => setOriginalRate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="Original Term (years)"
              value={originalTermYears}
              onChange={(e) => setOriginalTermYears(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="Years Already Paid"
              value={paymentsMade}
              onChange={(e) => setPaymentsMade(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">New Refinance Loan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="New Interest Rate (%)"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="New Term (years)"
              value={newTermYears}
              onChange={(e) => setNewTermYears(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Closing Costs ($)"
              value={closingCosts}
              onChange={(e) => setClosingCosts(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5FBA9B] hover:bg-[#54a58a] text-white font-semibold py-3 rounded-lg transition duration-200"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate Refinance"}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Refinance Summary</h3>
          <ul className="space-y-1">
            <li>
              <strong>Remaining Original Cost:</strong> $
              {result.remainingOriginalCost.toFixed(2)}
            </li>
            <li>
              <strong>New Monthly Payment:</strong> $
              {result.newMonthlyPayment.toFixed(2)}
            </li>
            <li>
              <strong>Total Cost of Refinance:</strong> $
              {result.totalCostRefinanced.toFixed(2)}
            </li>
            <li>
              <strong>Net Savings:</strong> ${result.netSavings.toFixed(2)}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RefinanceForm;
