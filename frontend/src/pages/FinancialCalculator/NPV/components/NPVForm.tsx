import React, { useState, useRef, useEffect } from "react";
import NPVResults from "./NPVResults";
import NPVChart from "./NPVChart";
import NPVInfo from "./NPVInfo";
import { api } from "@/lib/api";

type NPVResponse = {
  npv: number;
  years: number;
  interestRate: number;
  futureValue?: number;
  cashFlows?: { year: number; value: number }[];
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
  const [result, setResult] = useState<NPVResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const formulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResult(null);
    setError(null);

    if (mode === "single") {
      setFutureValue("");
      setYears("");
      setInterestRate("");
    } else if (mode === "sequence") {
      setCashFlows([{ year: 0, amount: "" }]);
      setInterestRate("");
    }
  }, [mode]);

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

    if (mode === "single") {
      const payload = {
        futureValue: parseFloat(futureValue),
        years: parseInt(years),
        interestRate: parseFloat(interestRate),
      };

      try {
        const res = await api.post<{
          npv: number;
          futureValue: number;
          years: number;
          interestRate: number;
        }>("/npv", payload);

        const data = res.data;

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
      }
    } else {
      const amountsAreValid = cashFlows.every((cf) => cf.amount.trim() !== "");

      if (!amountsAreValid) {
        setError("Please fill in all cash flow values before submitting.");
        return;
      }

      const payload = {
        cashFlows: cashFlows.map((cf) => parseFloat(cf.amount)),
        interestRate: parseFloat(interestRate),
      };

      try {
        const res = await api.post<{
          npv: number;
          interestRate: number;
          cashFlows: number[];
        }>("/npv-sequence", payload);

        const data = res.data;

        if (
          typeof data.npv === "number" &&
          typeof data.interestRate === "number" &&
          Array.isArray(data.cashFlows)
        ) {
          setResult({
            npv: data.npv,
            years: data.cashFlows.length - 1,
            interestRate: data.interestRate,
            cashFlows: data.cashFlows.map((v, i) => ({
              year: i,
              value: v,
            })),
          });

          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          setError("Invalid response from the server.");
        }
      } catch (err) {
        console.error("Error fetching cash flow sequence:", err);
        setError("There was a problem connecting to the server.");
      }
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-3xl mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="mb-6 text-center w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Calculation Mode
          </h2>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <button
              type="button"
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium w-[120px] sm:w-[130px] ${
                mode === "single" ? "bg-[#0BB489] text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("single")}
            >
              Single Value
            </button>
            <button
              type="button"
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium w-[120px] sm:w-[130px] ${
                mode === "sequence" ? "bg-[#0BB489] text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("sequence")}
            >
              Cash Flow
            </button>
          </div>
        </div>

        {mode === "single" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
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
          <>
            <div className="space-y-4 mb-6 w-full flex flex-col items-center">
              {cashFlows.map((cf, index) => (
                <div
                  key={cf.year}
                  className="grid grid-cols-1 sm:grid-cols-[80px_1fr_60px] gap-2 max-w-md w-full items-center"
                >
                  <label className="sm:text-right font-medium">
                    {`Year ${cf.year}`}
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    value={cf.amount}
                    onChange={(e) => handleChangeAmount(index, e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full max-w-xs sm:max-w-none"
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
                    <div className="h-5" />
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

            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr_60px] gap-2 mb-6 max-w-md w-full items-center">
              <label className="sm:text-right font-medium">
                Discount Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full max-w-xs sm:max-w-none"
                required
              />
              <div className="h-5" />
            </div>
          </>
        )}

        <div className="mt-2 w-full">
          <button
            type="submit"
            className="w-full bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200 mt-5"
          >
            Calculate NPV
          </button>
        </div>
      </form>

      <div
        ref={resultsRef}
        className={`transition-opacity duration-500 ${
          result ? "opacity-100 mt-8" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        {result && (
          <div ref={resultsRef}>
            <NPVResults {...result} />
            {result.cashFlows && <NPVChart cashFlows={result.cashFlows} />}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-xl text-red-700 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>

      {result && (
        <>
          <div
            onClick={() =>
              formulaRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-4 text-center text-sm text-gray-500 flex justify-center items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors"
          >
            <span className="text-lg">↓</span>
            <span>See how it was calculated</span>
          </div>

          <div ref={formulaRef}>
            <NPVInfo
              mode={mode}
              showSubstituted={mode === "single"}
              futureValue={result.futureValue}
              years={result.years}
              interestRate={result.interestRate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NPVForm;
