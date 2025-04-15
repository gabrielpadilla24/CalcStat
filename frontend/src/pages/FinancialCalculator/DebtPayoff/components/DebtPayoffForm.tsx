import { useState, useRef } from "react";

type Debt = {
  name: string;
  balance: string;
  interestRate: string;
  monthlyPayment: string;
};

type Method = "snowball" | "avalanche";

type DebtPayoffResponse = {
  summary: {
    months: number;
    totalInterest: number;
  };
  debtTimeline: {
    month: number;
    debts: {
      name: string;
      balance: number;
    }[];
  }[];
};

type DebtPayoffFormProps = {
  onResult: (data: DebtPayoffResponse) => void;
};

const DebtPayoffForm = ({ onResult }: DebtPayoffFormProps) => {
  const [debts, setDebts] = useState<Debt[]>([
    { name: "", balance: "", interestRate: "", monthlyPayment: "" },
  ]);
  const [method, setMethod] = useState<Method>("snowball");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleDebtChange = (
    index: number,
    field: keyof Debt,
    value: string
  ) => {
    const updated = [...debts];
    updated[index][field] = value;
    setDebts(updated);
  };

  const handleAddDebt = () => {
    setDebts([
      ...debts,
      { name: "", balance: "", interestRate: "", monthlyPayment: "" },
    ]);
  };

  const handleRemoveDebt = (index: number) => {
    const updated = debts.filter((_, i) => i !== index);
    setDebts(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/debt-payoff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          debts,
          method,
          extraPayment,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      const json = await response.json();
      onResult(json);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error.");
      }
    } finally {
      setLoading(false);
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
            Plan Your Debt-Free Journey
          </h2>
        </div>

        <div className="w-full space-y-6">
          {/* Scrollable debt list */}
          <div className="h-[400px] overflow-y-auto pr-2 space-y-6">
            {debts.map((debt, index) => (
              <div
                key={index}
                className="relative bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-4"
              >
                {/* Remove button in top-right corner */}
                {debts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDebt(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-semibold"
                    aria-label="Remove debt"
                  >
                    ✕
                  </button>
                )}

                <div>
                  <label className="block font-medium mb-1">Debt Name:</label>
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) =>
                      handleDebtChange(index, "name", e.target.value)
                    }
                    placeholder="Ej: Visa"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Balance ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={debt.balance}
                    onChange={(e) =>
                      handleDebtChange(index, "balance", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Interest Rate (%):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={debt.interestRate}
                    onChange={(e) =>
                      handleDebtChange(index, "interestRate", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Monthly Payment ($):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={debt.monthlyPayment}
                    onChange={(e) =>
                      handleDebtChange(index, "monthlyPayment", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleAddDebt}
              className="text-blue-600 hover:underline"
            >
              ➕ Add Another Debt
            </button>
          </div>

          <div className="text-center w-full">
            <h3 className="text-xl font-semibold mt-6 mb-3">
              Choose a Repayment Strategy
            </h3>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-medium w-[160px] ${
                  method === "snowball"
                    ? "bg-[#0BB489] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setMethod("snowball")}
              >
                ❄️ Snowball
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-medium w-[160px] ${
                  method === "avalanche"
                    ? "bg-[#0BB489] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setMethod("avalanche")}
              >
                🏔️ Avalanche
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#0BB489] hover:bg-[#0AA47A] text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {loading ? "Calculating..." : "Calculate Payoff Plan"}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-xl text-red-700 text-center">
          <p>{error}</p>
        </div>
      )}

      <div ref={resultsRef} />
    </div>
  );
};

export default DebtPayoffForm;
