import React, { useState, useRef } from "react";
import ReverseMortgageResults from "./ReverseMortgageResults";
import ReverseMortgageChart from "./ReverseMortgageChart";
import ReverseMortgageInfo from "./ReverseMortgageInfo";

type ReverseMortgagePayload = {
  homeEquity: number;
  years: number;
  interestRate: number;
  type: "Lump Sum" | "Monthly Advance";
  lumpSum?: number;
  monthlyAdvance?: number;
};

type ReverseMortgageResult = {
  amountOwedAtEnd: number;
  type: "Lump Sum" | "Monthly Advance";
  years: number;
  interestRate: number;
  yearlyDebt: number[]; // <-- nuevo campo para graficar
};

const ReverseMortgageForm = () => {
  const [homeEquity, setHomeEquity] = useState("");
  const [years, setYears] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [type, setType] = useState<"Lump Sum" | "Monthly Advance">("Lump Sum");
  const [lumpSum, setLumpSum] = useState("");
  const [monthlyAdvance, setMonthlyAdvance] = useState("");
  const [result, setResult] = useState<ReverseMortgageResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [errorDetails, setErrorDetails] = useState<{
    homeEquity?: number;
    amountOwedAtEnd?: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrorDetails(null);
    setResult(null);

    const payload: ReverseMortgagePayload = {
      homeEquity: parseFloat(homeEquity),
      years: parseInt(years),
      interestRate: parseFloat(interestRate),
      type,
    };

    if (type === "Lump Sum") {
      payload.lumpSum = parseFloat(lumpSum);
    } else if (type === "Monthly Advance") {
      payload.monthlyAdvance = parseFloat(monthlyAdvance);
    }

    try {
      const response = await fetch("http://localhost:8000/reverse-mortgage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        if (data.homeEquity && data.amountOwedAtEnd) {
          setErrorDetails({
            homeEquity: data.homeEquity,
            amountOwedAtEnd: data.amountOwedAtEnd,
          });
        }
      } else {
        setResult(data);

        // 👉 Scroll suave hacia el resultado
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (error) {
      console.error("Error submitting reverse mortgage form:", error);
      setError("There was a problem connecting to the server.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-medium mb-1">Home Equity ($)</label>
          <input
            type="number"
            step="0.01"
            value={homeEquity}
            onChange={(e) => setHomeEquity(e.target.value)}
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
            Estimated Interest Rate (%)
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

        <div>
          <label className="block font-medium mb-1">Payout Type</label>
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "Lump Sum" | "Monthly Advance")
            }
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="Lump Sum">Lump Sum</option>
            <option value="Monthly Advance">Monthly Advance</option>
          </select>
        </div>

        {type === "Lump Sum" && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">
              Lump Sum Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={lumpSum}
              onChange={(e) => setLumpSum(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        )}

        {type === "Monthly Advance" && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">
              Monthly Advance Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={monthlyAdvance}
              onChange={(e) => setMonthlyAdvance(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Calculate Reverse Mortgage
          </button>
        </div>
      </form>

      {result && (
        <div ref={resultsRef}>
          <ReverseMortgageResults {...result} />
          <ReverseMortgageChart yearlyDebt={result.yearlyDebt} />
          <ReverseMortgageInfo />
        </div>
      )}

      {error && (
        <div className="mt-8 bg-red-50 border border-red-300 p-6 rounded-xl shadow text-red-800">
          <h2 className="text-xl font-semibold mb-2">
            Reverse Mortgage Not Feasible
          </h2>
          <p className="mb-2">{error}</p>
          {errorDetails && (
            <div className="text-sm text-gray-800">
              <p>
                <strong>Home Equity:</strong> $
                {errorDetails.homeEquity?.toLocaleString()}
              </p>
              <p>
                <strong>Projected Owed Amount:</strong> $
                {errorDetails.amountOwedAtEnd?.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReverseMortgageForm;
