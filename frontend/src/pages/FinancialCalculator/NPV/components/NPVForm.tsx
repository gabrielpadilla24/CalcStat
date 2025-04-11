import { useState } from "react";

const NPVForm = () => {
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Por ahora no hacemos el cálculo
    console.log("Submitted values:", { rate, amount, years });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-80"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Enter Details</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Discount Rate (%)</label>
        <input
          type="number"
          step="any"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Amount ($)</label>
        <input
          type="number"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Time (Years)</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Calculate NPV
      </button>
    </form>
  );
};

export default NPVForm;
