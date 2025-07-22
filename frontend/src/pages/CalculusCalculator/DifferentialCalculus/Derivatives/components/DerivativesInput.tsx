import React, { useState } from "react";

const DerivativesInput: React.FC = () => {
  const [equation, setEquation] = useState("");

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://localhost:8000/derivatives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ equation }),
      });

      if (!response.ok) throw new Error("Error sending request");

      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[500px] bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="flex flex-col items-center text-center">
          <label
            htmlFor="equation"
            className="text-lg font-medium text-gray-700 mb-4"
          >
            Enter a function to differentiate:
          </label>
          <input
            id="equation"
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="e.g. 2x^2 + 3x - 5"
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5FBA9B]"
          />
          <button
            onClick={handleCalculate}
            className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition"
          >
            Calculate Derivative
          </button>
        </div>
      </div>
    </div>
  );
};

export default DerivativesInput;
