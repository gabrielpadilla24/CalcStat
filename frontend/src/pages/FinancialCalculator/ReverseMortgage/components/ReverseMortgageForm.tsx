import React, { useState } from "react";

const ReverseMortgageForm = () => {
  const [age, setAge] = useState("");
  const [homeValue, setHomeValue] = useState("");
  const [existingMortgage, setExistingMortgage] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      age: parseInt(age),
      homeValue: parseFloat(homeValue),
      existingMortgage: parseFloat(existingMortgage),
      zipCode,
      interestRate: parseFloat(interestRate),
    };

    try {
      const response = await fetch("http://localhost:8000/reverse-mortgage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Result:", data); // Aquí luego puedes setear resultados
    } catch (error) {
      console.error("Error submitting reverse mortgage form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <label className="block font-medium mb-1">Age of Homeowner</label>
        <input
          type="number"
          min="62"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Estimated Home Value ($)
        </label>
        <input
          type="number"
          step="0.01"
          value={homeValue}
          onChange={(e) => setHomeValue(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Existing Mortgage Balance ($)
        </label>
        <input
          type="number"
          step="0.01"
          value={existingMortgage}
          onChange={(e) => setExistingMortgage(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">ZIP Code</label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
          required
        />
      </div>

      <div className="md:col-span-2">
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

      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate Reverse Mortgage"}
        </button>
      </div>
    </form>
  );
};

export default ReverseMortgageForm;
