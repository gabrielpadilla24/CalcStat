"use client";

import { useState } from "react";

type EqSystemResponse = {
  equations: { lhs: string; rhs: string }[];
};

const EqSystemInput = ({
  onResult,
}: {
  onResult: (result: EqSystemResponse) => void;
}) => {
  const [equations, setEquations] = useState<{ lhs: string; rhs: string }[]>([
    { lhs: "", rhs: "" },
    { lhs: "", rhs: "" },
    { lhs: "", rhs: "" },
  ]);

  // Manejo de cambios
  const handleChange = (index: number, side: "lhs" | "rhs", value: string) => {
    const newEqs = [...equations];
    newEqs[index][side] = value;
    setEquations(newEqs);
  };

  // Agregar fila
  const addRow = () => {
    setEquations([...equations, { lhs: "", rhs: "" }]);
  };

  // Eliminar fila
  const removeRow = (index: number) => {
    if (equations.length > 1) {
      setEquations(equations.filter((_, i) => i !== index));
    }
  };

  // Enviar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResult({ equations });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-lg font-semibold mb-4 justify-center text-center">
        Enter your system of equations
      </h2>

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

            {/* Botón eliminar */}
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="text-red-500 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={addRow}
          className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition"
        >
          + Add Equation
        </button>
        <button
          type="submit"
          className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition"
        >
          Solve System
        </button>
      </div>
    </form>
  );
};

export default EqSystemInput;
