import React, { useState } from "react";
import IRRResults from "./IRRResults";

type CashFlow = {
  year: number;
  amount: string;
};

type IRRResponse = {
  irr: number;
  cashFlows: number[];
  discountRates: number[];
  npvs: number[];
};

type IRRFormProps = {
  onResult: (result: IRRResponse) => void;
  onLearnMore: () => void;
};

const IRRForm: React.FC<IRRFormProps> = ({ onResult, onLearnMore }) => {
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { year: 0, amount: "" },
  ]);
  const [result, setResult] = useState<IRRResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    setResult(null);

    const amountsAreValid = cashFlows.every((cf) => cf.amount.trim() !== "");

    if (!amountsAreValid) {
      setError("Please fill in all cash flow values before submitting.");
      return;
    }

    const payload = {
      cashFlows: cashFlows.map((cf) => parseFloat(cf.amount)),
    };

    try {
      const response = await fetch("http://localhost:8000/irr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (
        typeof data.irr === "number" &&
        Array.isArray(data.cashFlows) &&
        Array.isArray(data.discountRates) &&
        Array.isArray(data.npvs)
      ) {
        setResult(data);
        onResult(data);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      console.error("Error calculating IRR:", err);
      setError("There was a problem connecting to the server.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[500px] h-[600px] mx-auto flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full flex-grow"
      >
        <h2 className="text-2xl font-semibold mb-10 text-center w-full">
          Cashflow of the Project
        </h2>

        {/* ✅ Scrollable input box section */}
        <div
          className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-4 mb-6 w-full flex flex-col items-center px-2"
          style={{ maxHeight: "160px" }}
        >
          {cashFlows.map((cf, index) => (
            <div
              key={cf.year}
              className="grid grid-cols-[80px_200px_60px] gap-2 max-w-md mx-auto items-center"
            >
              <label className="text-right font-medium">{`Year ${cf.year}`}</label>
              <input
                type="number"
                step="0.01"
                value={cf.amount}
                onChange={(e) => handleChangeAmount(index, e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-[200px] mx-auto"
                required
              />
              {cf.year !== 0 ? (
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => handleRemoveYear(cf.year)}
                >
                  Remove
                </button>
              ) : (
                <div className="w-[51px]" />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddYear}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          + Add Year
        </button>

        <button
          type="submit"
          className="w-full bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Calculate IRR
        </button>

        <button
          type="button"
          onClick={onLearnMore}
          className="mt-4 text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
        >
          <span className="text-lg">↓</span>
          <span>Learn More About IRR</span>
        </button>
      </form>

      {/* ✅ Result */}
      {result && <IRRResults irr={result.irr} cashFlows={result.cashFlows} />}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-300 p-4 rounded-xl text-red-700 text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default IRRForm;
