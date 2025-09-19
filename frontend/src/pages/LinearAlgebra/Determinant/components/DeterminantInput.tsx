"use client";

import { useState, useMemo } from "react";
import MatrixInput from "@/components/MatrixInput";
import { api } from "@/lib/api"; // ✅ import api instance

type DeterminantResponse = {
  determinant?: number;
  steps?: string[];
  error?: string;
  explanation?: string;
};

const DeterminantInput = ({
  onResult,
}: {
  onResult: (result: DeterminantResponse & { matrix: number[][] }) => void;
}) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );

  const body = useMemo(() => ({ matrix }), [matrix]);

  const handleCalculate = async () => {
    try {
      const res = await api.post<DeterminantResponse>("/determinant", body); // ✅ using api
      onResult({ ...res.data, matrix });
    } catch {
      onResult({ matrix, error: "Failed to calculate determinant." });
    }
  };

  return (
    <div className="w-full max-w-[600px] bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center text-center">
        <label className="text-base sm:text-lg font-medium text-gray-700 mb-4">
          Enter a square matrix to calculate its determinant:
        </label>

        {/* Dimensions */}
        <div className="flex gap-2 sm:gap-4 justify-center mb-6 items-center">
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-16 sm:w-20 p-2 border rounded-lg text-center"
            min={1}
            max={8}
          />
          <span className="text-base sm:text-lg">x</span>
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="w-16 sm:w-20 p-2 border rounded-lg text-center"
            min={1}
            max={8}
          />
        </div>

        {/* Matrix Input */}
        <MatrixInput
          rows={rows}
          cols={cols}
          onChange={setMatrix}
          title="Matrix A"
        />

        {/* Button */}
        <button
          onClick={handleCalculate}
          className="mt-6 bg-[#5FBA9B] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          Calculate Determinant
        </button>
      </div>
    </div>
  );
};

export default DeterminantInput;
