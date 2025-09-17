"use client";

import { useState, useMemo } from "react";

type Row = {
  x: string;
  p: string;
};

type EVMResponse = {
  expectedValue?: number;
  variance?: number;
  moments?: { order: number; value: number }[];
  error?: string;
};

export default function EVMInput({
  onResult,
}: {
  onResult: (result: EVMResponse | null) => void;
}) {
  const [rows, setRows] = useState<Row[]>([{ x: "", p: "" }]);
  const [loading, setLoading] = useState(false);

  // ✅ Probability sum
  const probSum = useMemo(() => {
    return rows.reduce((sum, r) => {
      const val = parseFloat(r.p);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [rows]);

  // ✅ Validation
  const isValid = useMemo(() => {
    const probs = rows.map((r) => parseFloat(r.p)).filter((v) => !isNaN(v));
    if (probs.some((p) => p < 0 || p > 1)) return false;
    return Math.abs(probSum - 1) < 1e-6;
  }, [rows, probSum]);

  const handleRowChange = (index: number, field: keyof Row, value: string) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);

    if (
      index === rows.length - 1 &&
      updated[index].x.trim() !== "" &&
      updated[index].p.trim() !== "" &&
      rows.length < 20
    ) {
      setRows([...updated, { x: "", p: "" }]);
    }
  };

  const handleSubmit = async () => {
    const support = rows
      .map((r) => (r.x.trim() !== "" ? Number(r.x) : null))
      .filter((v) => v !== null) as number[];

    const probs = rows
      .map((r) => (r.p.trim() !== "" ? Number(r.p) : null))
      .filter((v) => v !== null) as number[];

    if (!isValid) {
      alert("Probabilities must be in [0,1] and sum to 1.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        variableType: "discrete",
        support,
        probs,
        equation: "",
        momentOrders: [1, 2, 3],
      };

      const res = await fetch("http://127.0.0.1:8000/expectedvalueandmoments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: EVMResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching EVM result:", err);
      onResult({ error: "Failed to compute results" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
        Discrete Random Variable Input
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter up to 20 values. Probabilities must sum to 1.
      </p>

      {/* Inputs */}
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
          >
            <input
              type="number"
              placeholder={`x${index + 1}`}
              value={row.x}
              onChange={(e) => handleRowChange(index, "x", e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            />
            <input
              type="number"
              step="0.01"
              min={0}
              max={1}
              placeholder={`P(x${index + 1})`}
              value={row.p}
              onChange={(e) => handleRowChange(index, "p", e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            />
          </div>
        ))}
      </div>

      {/* Probability sum */}
      <p className="text-sm text-gray-700 mt-3 text-center sm:text-left">
        Sum of probabilities:{" "}
        <span
          className={`font-semibold ${
            Math.abs(probSum - 1) < 1e-6 ? "text-green-600" : "text-red-600"
          }`}
        >
          {probSum.toFixed(4)}
        </span>
      </p>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !isValid}
        className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition mt-6 w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Calculating..." : "Submit"}
      </button>
    </div>
  );
}
