"use client";

import { useMemo, useState } from "react";

export type EqRow = { lhs: string; rhs: string };

// JSON-safe type
type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

export interface LinearSystemInputProps<
  TResponse = unknown,
  TExtra extends Record<string, Json> = Record<string, never>
> {
  label?: string;
  buttonText?: string;
  endpoint: string;
  initialVars?: number; // default 2
  initialRows?: number; // default 2
  extraPayload?: TExtra;
  className?: string;
  onSuccess: (data: TResponse) => void;
}

export default function LinearSystemInput<
  TResponse,
  TExtra extends Record<string, Json> = Record<string, never>
>({
  label = "Enter your system of equations",
  buttonText = "Calculate",
  endpoint,
  initialVars = 2,
  initialRows = 2,
  extraPayload,
  className = "",
  onSuccess,
}: LinearSystemInputProps<TResponse, TExtra>) {
  const [numVars, setNumVars] = useState<number>(initialVars);
  const [equations, setEquations] = useState<EqRow[]>(
    Array.from({ length: Math.max(initialRows, initialVars) }, () => ({
      lhs: "",
      rhs: "",
    }))
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Helpers
  const ensureMinRows = (n: number) => {
    setEquations((prev) => {
      if (prev.length >= n) return prev.slice(0, Math.max(prev.length, n));
      const extra = Array.from({ length: n - prev.length }, () => ({
        lhs: "",
        rhs: "",
      }));
      return [...prev, ...extra];
    });
  };

  // Handlers
  const handleNumVarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(2, Number(e.target.value) || 2);
    setNumVars(v);
    ensureMinRows(v);
  };

  const handleChange = (index: number, side: "lhs" | "rhs", value: string) => {
    setEquations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [side]: value };
      return copy;
    });
  };

  const addRow = () => setEquations((prev) => [...prev, { lhs: "", rhs: "" }]);

  const removeRow = (index: number) => {
    setEquations((prev) => {
      if (prev.length <= numVars) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const body = useMemo(
    () =>
      JSON.stringify({
        ...(extraPayload ?? ({} as TExtra)),
        numVars,
        equations,
      }),
    [numVars, equations, extraPayload]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Request failed");
      }
      const data = (await res.json()) as TResponse;
      onSuccess(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unexpected error";
      setErr(message);
    } finally {
      setLoading(false);
    }
  };

  const filledCount = useMemo(
    () =>
      equations.filter(
        (r) =>
          (r.lhs?.trim()?.length || 0) > 0 || (r.rhs?.trim()?.length || 0) > 0
      ).length,
    [equations]
  );

  const canRemove = equations.length > numVars;
  const canSubmit = filledCount >= numVars;

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 ${className}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">{label}</h2>

      {/* Number of variables */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
        <label className="text-sm text-gray-700">Variables (n):</label>
        <input
          type="number"
          min={2}
          value={numVars}
          onChange={handleNumVarsChange}
          className="w-20 sm:w-24 border rounded px-3 py-2 text-center"
        />
        <span className="text-xs text-gray-500 w-full sm:w-auto text-center">
          * minimum {numVars} equations
        </span>
      </div>

      {/* Equations */}
      <div className="space-y-4">
        {equations.map((eq, i) => (
          <div
            key={i}
            className="flex flex-wrap sm:flex-nowrap items-center gap-2 justify-center"
          >
            {/* LHS */}
            <input
              type="text"
              value={eq.lhs}
              onChange={(e) => handleChange(i, "lhs", e.target.value)}
              placeholder="3x + 2y - z"
              className="flex-1 min-w-[140px] sm:w-60 border rounded px-3 py-2 text-center"
            />

            {/* Equal sign */}
            <span className="text-center w-full sm:w-auto">=</span>

            {/* RHS */}
            <input
              type="text"
              value={eq.rhs}
              onChange={(e) => handleChange(i, "rhs", e.target.value)}
              placeholder="5"
              className="flex-1 min-w-[80px] sm:w-24 border rounded px-3 py-2 text-center"
            />

            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeRow(i)}
              disabled={!canRemove}
              className={`font-bold ml-0 sm:ml-2 ${
                canRemove ? "text-red-500" : "text-gray-300 cursor-not-allowed"
              }`}
              title={
                canRemove
                  ? "Remove equation"
                  : `You must keep at least ${numVars} equations`
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between mt-6">
        <button
          type="button"
          onClick={addRow}
          className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition"
        >
          + Add Equation
        </button>

        <div className="text-sm text-gray-600 self-center sm:self-auto">
          Filled: {filledCount}/{numVars}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            canSubmit
              ? "bg-[#5FBA9B] text-white hover:bg-[#4da88a]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Calculating..." : buttonText}
        </button>
      </div>

      {err && (
        <div className="mt-4 text-sm text-red-600 text-center">{err}</div>
      )}
    </form>
  );
}
