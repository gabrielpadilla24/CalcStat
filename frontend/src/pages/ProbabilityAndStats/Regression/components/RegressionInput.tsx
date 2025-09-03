"use client";

import { useState } from "react";

type RegressionResponse = {
  coefficients: Record<string, number>;
  stderr: Record<string, number>;
  tvalues: Record<string, number>;
  pvalues: Record<string, number>;
  r2: number;
  r2_adj: number;
  fstat?: number;
  f_pvalue?: number;
  equation_latex: string;
  error?: string;
};

type Props = {
  onResult: (result: RegressionResponse | null) => void;
};

export default function RegressionInput({ onResult }: Props) {
  const [rows, setRows] = useState<{ x: string; y: string }[]>([
    { x: "", y: "" },
  ]);
  const [includeIntercept, setIncludeIntercept] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAddRow = () => {
    setRows([...rows, { x: "", y: "" }]);
  };

  const handleRemoveRow = (idx: number) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, field: "x" | "y", value: string) => {
    const newRows = [...rows];
    newRows[idx][field] = value;
    setRows(newRows);
  };

  const handleSubmit = async () => {
    // Validar que no haya filas vacías
    const cleanRows = rows.filter((r) => r.x !== "" && r.y !== "");
    if (cleanRows.length < 2)
      return alert("Please enter at least 2 data points");

    const X = cleanRows.map((r) => [Number(r.x)]);
    const Y = cleanRows.map((r) => Number(r.y));

    const payload = {
      X,
      Y,
      include_intercept: includeIntercept,
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/regression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: RegressionResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching regression result:", err);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">
        Simple Linear Regression
      </h2>

      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter pairs of values (X, Y) for regression. Add at least 2 rows.
      </p>

      {/* Tabla de datos */}
      <div className="space-y-2 mb-4">
        {rows.map((row, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="X"
              value={row.x}
              onChange={(e) => handleChange(idx, "x", e.target.value)}
              className="flex-1 border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Y"
              value={row.y}
              onChange={(e) => handleChange(idx, "y", e.target.value)}
              className="flex-1 border rounded px-3 py-2"
            />
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveRow(idx)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          + Add Row
        </button>
      </div>

      {/* Checkbox intercepto */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={includeIntercept}
          onChange={(e) => setIncludeIntercept(e.target.checked)}
        />
        <label className="text-sm font-medium">Include intercept (β₀)</label>
      </div>

      {/* Botón */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
      >
        {loading ? "Calculating..." : "Run Regression"}
      </button>
    </div>
  );
}
