"use client";

import { useState } from "react";
import MatrixInput from "@/components/MatrixInput";

const DeterminantInput = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setResult(null);

    if (rows !== cols) {
      setError("⚠️ The matrix must be square to calculate a determinant.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/determinant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.det);
      }
    } catch {
      setError("❌ Error connecting to backend.");
    }
  };

  return (
    <div className="w-full">
      {/* Selector de dimensiones */}
      <div className="flex gap-4 justify-center mb-6">
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="w-20 p-2 border rounded-lg text-center"
          min={1}
          max={8}
        />
        <span className="text-lg">x</span>
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          className="w-20 p-2 border rounded-lg text-center"
          min={1}
          max={8}
        />
      </div>

      {/* Input de la matriz */}
      <MatrixInput
        rows={rows}
        cols={cols}
        onChange={setMatrix}
        title="Matrix A"
      />

      {/* Botón */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Calculate Determinant
      </button>

      {/* Resultado */}
      {error && (
        <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
      )}
      {result !== null && !error && (
        <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded-xl text-center">
          <p className="text-lg font-semibold">
            ✅ Determinant: <span className="font-bold">{result}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DeterminantInput;
