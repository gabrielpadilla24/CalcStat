"use client";

import { useState, useMemo } from "react";
import MatrixInput from "@/components/MatrixInput";

type DeterminantResponse = {
  det: number;
  steps?: string[];
};

const DeterminantInput = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<DeterminantResponse | null>(null);

  // payload dinámico
  const body = useMemo(() => JSON.stringify({ matrix }), [matrix]);

  const handleCalculate = async () => {
    setErr(null);
    setResult(null);

    if (rows !== cols) {
      setErr("⚠️ The matrix must be square to calculate a determinant.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/determinant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) throw new Error("Request failed");

      const data = (await res.json()) as DeterminantResponse;
      setResult(data);
    } catch {
      setErr("❌ Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] bg-white rounded-xl shadow-md border border-gray-200 p-8">
      <div className="flex flex-col items-center text-center">
        <label className="text-lg font-medium text-gray-700 mb-4">
          Enter a square matrix to calculate its determinant:
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
          disabled={loading}
          className="mt-6 bg-[#5FBA9B] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          {loading ? "Calculating..." : "Calculate Determinant"}
        </button>

        {/* Resultado */}
        {err && <div className="mt-4 text-sm text-red-600">{err}</div>}
        {result && !err && (
          <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded-xl text-center">
            <p className="text-lg font-semibold">
              ✅ Determinant: <span className="font-bold">{result.det}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeterminantInput;
