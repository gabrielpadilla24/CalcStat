"use client";

import { useMemo, useState } from "react";

type EqSystemResponse = {
  equations: { lhs: string; rhs: string }[];
};

const EqSystemInput = ({
  onResult,
}: {
  onResult: (result: EqSystemResponse) => void;
}) => {
  const [numVars, setNumVars] = useState<number>(2);
  const [equations, setEquations] = useState<{ lhs: string; rhs: string }[]>(
    Array.from({ length: 2 }, () => ({ lhs: "", rhs: "" }))
  );

  // --- Helpers ---
  const ensureMinRows = (n: number) => {
    setEquations((prev) => {
      if (prev.length >= n) return prev.slice(0, Math.max(prev.length, n)); // recorta si hiciste n menor
      // agrega filas vacías hasta n
      const extra = Array.from({ length: n - prev.length }, () => ({
        lhs: "",
        rhs: "",
      }));
      return [...prev, ...extra];
    });
  };

  // --- Handlers ---
  const handleNumVarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(2, Number(e.target.value) || 2);
    setNumVars(v);
    ensureMinRows(v);
  };

  const handleChange = (index: number, side: "lhs" | "rhs", value: string) => {
    const newEqs = [...equations];
    newEqs[index][side] = value;
    setEquations(newEqs);
  };

  const addRow = () => {
    setEquations([...equations, { lhs: "", rhs: "" }]);
  };

  const removeRow = (index: number) => {
    // ❗ No permitir menos de numVars ecuaciones
    if (equations.length <= numVars) return;
    setEquations(equations.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResult({ equations });
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
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Enter your system of equations
      </h2>

      {/* Número de variables */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <label className="text-sm text-gray-700">Variables (n):</label>
        <input
          type="number"
          min={2}
          value={numVars}
          onChange={handleNumVarsChange}
          className="w-24 border rounded px-3 py-2 text-center"
        />
        <span className="text-xs text-gray-500">
          * minimum {numVars} equations
        </span>
      </div>

      <div className="space-y-4">
        {equations.map((eq, i) => (
          <div key={i} className="flex items-center gap-2 justify-center">
            {/* LHS */}
            <input
              type="text"
              value={eq.lhs}
              onChange={(e) => handleChange(i, "lhs", e.target.value)}
              placeholder="3x + 2y - z"
              className="w-60 border rounded px-3 py-2 text-center"
            />
            <span>=</span>
            {/* RHS */}
            <input
              type="text"
              value={eq.rhs}
              onChange={(e) => handleChange(i, "rhs", e.target.value)}
              placeholder="5"
              className="w-24 border rounded px-3 py-2 text-center"
            />

            {/* Botón eliminar: deshabilitado si llegarías a < numVars */}
            <button
              type="button"
              onClick={() => removeRow(i)}
              disabled={!canRemove}
              className={`font-bold ml-2 ${
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

      {/* Botones */}
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
          disabled={!canSubmit}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            canSubmit
              ? "bg-[#5FBA9B] text-white hover:bg-[#4da88a]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          title={
            canSubmit
              ? "Submit system"
              : `Enter at least ${numVars} equation(s)`
          }
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default EqSystemInput;
