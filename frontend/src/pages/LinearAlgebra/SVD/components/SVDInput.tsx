"use client";

import { useState, useMemo } from "react";
import MatrixInput from "@/components/MatrixInput";

type SVDResponse = {
  singularValues?: number[];
  U?: number[][];
  Sigma?: number[][];
  Vt?: number[][];
  steps?: string[];
  error?: string;
  explanation?: string;
};

const SVDInput = ({
  onResult,
}: {
  onResult: (result: SVDResponse & { matrix: number[][] }) => void;
}) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );

  // 👉 Saneo mínimo: convierte a número y reemplaza NaN/±Inf por 0
  const clean = (M: (number | string)[][]): number[][] =>
    M.map((row) =>
      row.map((v) => {
        const n = typeof v === "number" ? v : Number(v);
        return Number.isFinite(n) ? n : 0;
      })
    );

  const body = useMemo(
    () =>
      JSON.stringify({
        matrix: clean(matrix as unknown as (number | string)[][]),
      }),
    [matrix]
  );

  const handleCalculate = async () => {
    try {
      const res = await fetch("http://localhost:8000/svd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) throw new Error("Request failed");

      const data = (await res.json()) as SVDResponse;
      // Devolvemos la matriz saneada para que el Result muestre lo que realmente se envió
      onResult({
        ...data,
        matrix: clean(matrix as unknown as (number | string)[][]),
      });
    } catch {
      onResult({
        matrix: clean(matrix as unknown as (number | string)[][]),
        error: "Failed to compute SVD.",
        explanation: "Please check your input and try again.",
      });
    }
  };

  return (
    <div className="w-[600px] bg-white rounded-xl shadow-md border border-gray-200 p-8">
      <div className="flex flex-col items-center text-center">
        <label className="text-lg font-medium text-gray-700 mb-4">
          Enter a matrix (m × n) to compute its SVD:
        </label>

        {/* Dimensiones */}
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
          onClick={handleCalculate}
          className="mt-6 bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          Compute SVD
        </button>
      </div>
    </div>
  );
};

export default SVDInput;
