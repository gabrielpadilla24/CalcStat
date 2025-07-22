import React, { useState } from "react";

const DerivativesInput: React.FC = () => {
  const [equation, setEquation] = useState("");

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-4 px-6">
      <div className="flex-1 max-w-[500px]">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
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
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5FBA9B]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerivativesInput;
