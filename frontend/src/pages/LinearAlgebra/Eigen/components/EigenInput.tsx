"use client";

import { useMemo, useState } from "react";
import MatrixInput from "@/components/MatrixInput";

export type Step = { text: string; math?: string };

export type EigenResponse = {
  matrix: (string | number)[][];
  eigenvalues?: number[];
  eigenvectors?: number[][];
  steps?: Step[];
};

function makeZeroMatrix(n: number) {
  return Array.from({ length: n }, () => Array(n).fill(0));
}

function resizeSquarePreserve(M: number[][], n: number): number[][] {
  const out = makeZeroMatrix(n);
  for (let i = 0; i < Math.min(M.length, n); i++) {
    for (let j = 0; j < Math.min(M[0].length, n); j++) {
      out[i][j] = M[i][j];
    }
  }
  return out;
}

const EigenInput = ({ onResult }: { onResult: (r: EigenResponse) => void }) => {
  const [size, setSize] = useState<number>(3);
  const [sizeInput, setSizeInput] = useState<string>("3"); // permite borrar
  const [matrix, setMatrix] = useState<number[][]>(makeZeroMatrix(3));

  const commitSize = () => {
    let n = parseInt(sizeInput, 10);
    if (isNaN(n)) n = 3;
    if (n < 1) n = 1;
    if (n > 8) n = 8;
    setSize(n);
    setMatrix((prev) => resizeSquarePreserve(prev, n));
    setSizeInput(String(n));
  };

  const body = useMemo(() => JSON.stringify({ matrix }), [matrix]);

  const handleCalculate = async () => {
    try {
      const res = await fetch("http://localhost:8000/eigen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as EigenResponse;

      onResult({
        matrix: data.matrix ?? matrix,
        eigenvalues: data.eigenvalues,
        eigenvectors: data.eigenvectors,
        steps: data.steps,
      });
    } catch {
      onResult({
        matrix,
        steps: [{ text: "Failed to compute eigenvalues/eigenvectors." }],
      });
    }
  };

  return (
    <div className="w-[600px] bg-white rounded-xl shadow-md border border-gray-200 p-8">
      <div className="flex flex-col items-center text-center">
        <label className="text-lg font-medium text-gray-700 mb-4">
          Enter a square matrix to compute eigenvalues and eigenvectors:
        </label>

        {/* Tamaño NxN */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <span className="text-sm text-gray-600">Size</span>
          <input
            type="number"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            onBlur={commitSize}
            className="w-24 p-2 border rounded-lg text-center"
            min={1}
            max={8}
          />
          <span className="text-lg">×</span>
          <input
            type="number"
            value={size}
            readOnly
            className="w-24 p-2 border rounded-lg text-center bg-gray-100 text-gray-500"
          />
        </div>

        {/* Input de la matriz */}
        <MatrixInput
          rows={size}
          cols={size}
          onChange={setMatrix}
          title="Matrix A"
        />

        {/* Botón */}
        <button
          onClick={handleCalculate}
          className="mt-6 bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          Compute Eigenvalues & Eigenvectors
        </button>
      </div>
    </div>
  );
};

export default EigenInput;
