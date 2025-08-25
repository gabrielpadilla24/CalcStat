"use client";

import { useState } from "react";
import MatrixInput from "@/components/MatrixInput";

export type SVDResponse = {
  singularValues?: number[];
  U?: number[][];
  Sigma?: number[][];
  Vt?: number[][];
  steps?: string[];
  error?: string;
  explanation?: string;
};

function makeZeroMatrix(r: number, c: number): number[][] {
  return Array.from({ length: r }, () => Array(c).fill(0));
}

function resizePreserve(M: number[][], r: number, c: number): number[][] {
  const out = makeZeroMatrix(r, c);
  const rMin = Math.min(r, M.length);
  const cMin = Math.min(c, M[0]?.length ?? 0);
  for (let i = 0; i < rMin; i++)
    for (let j = 0; j < cMin; j++) out[i][j] = M[i][j];
  return out;
}

function sanitize(M: ReadonlyArray<ReadonlyArray<unknown>>): number[][] {
  return M.map((row) =>
    row.map((v: unknown) => {
      if (v === null || typeof v === "undefined" || v === "") return 0;
      if (typeof v === "number") return Number.isFinite(v) ? v : 0;
      if (typeof v === "string") {
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : 0;
      }
      // Cualquier otro tipo (boolean, objeto, etc.)
      return 0;
    })
  );
}

const SVDInput = ({
  onResult,
}: {
  onResult: (result: SVDResponse & { matrix: number[][] }) => void;
}) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>(makeZeroMatrix(3, 3));

  const handleCalculate = async () => {
    // si está vacío, usa ceros m×n; siempre sanear
    const safe =
      matrix && matrix.length > 0 && (matrix[0]?.length ?? 0) > 0
        ? sanitize(matrix)
        : makeZeroMatrix(rows, cols);

    try {
      const res = await fetch("http://localhost:8000/svd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix: safe }),
      });
      if (!res.ok) throw new Error("Request failed");

      const data = (await res.json()) as SVDResponse;
      onResult({ ...data, matrix: safe });
    } catch {
      onResult({
        matrix: safe,
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
            onChange={(e) => {
              const r = Math.min(8, Math.max(1, Number(e.target.value || 1)));
              setRows(r);
              setMatrix((prev) => resizePreserve(prev, r, cols));
            }}
            className="w-20 p-2 border rounded-lg text-center"
            min={1}
            max={8}
          />
          <span className="text-lg">×</span>
          <input
            type="number"
            value={cols}
            onChange={(e) => {
              const c = Math.min(8, Math.max(1, Number(e.target.value || 1)));
              setCols(c);
              setMatrix((prev) => resizePreserve(prev, rows, c));
            }}
            className="w-20 p-2 border rounded-lg text-center"
            min={1}
            max={8}
          />
        </div>

        {/* Matrix */}
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
