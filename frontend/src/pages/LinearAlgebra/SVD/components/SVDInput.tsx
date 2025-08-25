"use client";

import { useMemo, useState } from "react";
import MatrixInput from "@/components/MatrixInput";

export type Step = { text: string; math?: string };

export type SVDResponse = {
  // Matriz original formateada desde el backend
  matrix: (string | number)[][];
  // Resultados de la descomposición
  singularValues?: number[]; // σ1 ≥ σ2 ≥ ...
  U?: number[][]; // m × m
  Sigma?: number[][]; // m × n (diagonal rectangular)
  Vt?: number[][]; // n × n
  // (Opcional) pasos educativos
  steps?: Step[];
  // (Opcional) error
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
  for (let i = 0; i < rMin; i++) {
    for (let j = 0; j < cMin; j++) out[i][j] = M[i][j];
  }
  return out;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const SVDInput = ({
  onResult,
}: {
  onResult: (result: SVDResponse) => void;
}) => {
  // Dimensiones (permitir edición libre en el input con string)
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [rowsInput, setRowsInput] = useState<string>("3");
  const [colsInput, setColsInput] = useState<string>("3");

  // Matriz
  const [matrix, setMatrix] = useState<number[][]>(makeZeroMatrix(3, 3));

  const commitRows = () => {
    let r = parseInt(rowsInput, 10);
    if (isNaN(r)) r = rows;
    r = clamp(r, 1, 8);
    setRows(r);
    setMatrix((prev) => resizePreserve(prev, r, cols));
    setRowsInput(String(r));
  };

  const commitCols = () => {
    let c = parseInt(colsInput, 10);
    if (isNaN(c)) c = cols;
    c = clamp(c, 1, 8);
    setCols(c);
    setMatrix((prev) => resizePreserve(prev, rows, c));
    setColsInput(String(c));
  };

  const body = useMemo(() => JSON.stringify({ matrix }), [matrix]);

  const handleCalculate = async () => {
    try {
      const res = await fetch("http://localhost:8000/svd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as SVDResponse;

      onResult({
        matrix: data.matrix ?? matrix,
        singularValues: data.singularValues,
        U: data.U,
        Sigma: data.Sigma,
        Vt: data.Vt,
        steps: data.steps,
      });
    } catch {
      onResult({
        matrix: matrix.map((row) => row.map((x) => String(x))),
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

        {/* Dimensiones (permitir borrar sin que salte a 8) */}
        <div className="flex gap-4 justify-center mb-6">
          <input
            type="number"
            value={rowsInput}
            onChange={(e) => setRowsInput(e.target.value)}
            onBlur={commitRows}
            className="w-20 p-2 border rounded-lg text-center"
            min={1}
            max={8}
          />
          <span className="text-lg">×</span>
          <input
            type="number"
            value={colsInput}
            onChange={(e) => setColsInput(e.target.value)}
            onBlur={commitCols}
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
