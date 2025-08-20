"use client";

import { useState } from "react";

type EqSystemResponse = {
  coefficients: number[][];
  constants: number[];
};

const EqSystemInput = ({
  onResult,
}: {
  onResult: (result: EqSystemResponse) => void;
}) => {
  const [numVars, setNumVars] = useState(3); // número de incógnitas
  const [rows, setRows] = useState(3); // número de ecuaciones
  const [coefficients, setCoefficients] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );
  const [constants, setConstants] = useState<number[]>(Array(3).fill(0));

  // Manejar cambios en coeficientes
  const handleCoefficientChange = (r: number, c: number, value: string) => {
    const newCoeffs = [...coefficients];
    newCoeffs[r][c] = Number(value);
    setCoefficients(newCoeffs);
  };

  // Manejar cambios en términos independientes
  const handleConstantChange = (r: number, value: string) => {
    const newConsts = [...constants];
    newConsts[r] = Number(value);
    setConstants(newConsts);
  };

  // Agregar ecuación
  const addRow = () => {
    setRows(rows + 1);
    setCoefficients([...coefficients, Array(numVars).fill(0)]);
    setConstants([...constants, 0]);
  };

  // Eliminar ecuación
  const removeRow = (index: number) => {
    if (rows > 1) {
      setRows(rows - 1);
      setCoefficients(coefficients.filter((_, i) => i !== index));
      setConstants(constants.filter((_, i) => i !== index));
    }
  };

  // Enviar datos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResult({ coefficients, constants });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-lg font-semibold mb-4">
        Enter your system of linear equations
      </h2>

      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center gap-2 justify-center">
            {/* Coeficientes */}
            {Array.from({ length: numVars }).map((_, c) => (
              <input
                key={`${r}-${c}`}
                type="number"
                value={coefficients[r][c]}
                onChange={(e) => handleCoefficientChange(r, c, e.target.value)}
                className="w-16 border rounded px-2 py-1 text-center"
              />
            ))}

            {/* Igual */}
            <span>=</span>

            {/* Constante */}
            <input
              type="number"
              value={constants[r]}
              onChange={(e) => handleConstantChange(r, e.target.value)}
              className="w-16 border rounded px-2 py-1 text-center"
            />

            {/* Botón eliminar */}
            <button
              type="button"
              onClick={() => removeRow(r)}
              className="text-red-500 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Controles */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={addRow}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
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
