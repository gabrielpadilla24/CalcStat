"use client";

import { useState, useEffect } from "react";

type MatrixInputProps = {
  rows: number;
  cols: number;
  onChange: (matrix: number[][]) => void;
  title?: string;
};

export default function MatrixInput({
  rows,
  cols,
  onChange,
  title = "Enter Matrix",
}: MatrixInputProps) {
  // Inicializar en vacío (strings)
  const [matrix, setMatrix] = useState<(string | number)[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  // Reinicializar cuando cambian dimensiones
  useEffect(() => {
    setMatrix(Array.from({ length: rows }, () => Array(cols).fill("")));
  }, [rows, cols]);

  const handleChange = (r: number, c: number, value: string) => {
    const newMatrix = matrix.map((row, i) =>
      row.map((val, j) => (i === r && j === c ? value : val))
    );
    setMatrix(newMatrix);

    // Convertimos a número ("" → 0) antes de enviarlo al backend
    const numericMatrix = newMatrix.map((row) =>
      row.map((v) => (v === "" ? 0 : Number(v)))
    );
    onChange(numericMatrix);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>

      {/* Grid dinámica */}
      <div
        className="grid gap-2 justify-center"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(3rem, 1fr))` }}
      >
        {matrix.map((row, r) =>
          row.map((val, c) => (
            <input
              key={`${r}-${c}`}
              type="number"
              value={val}
              onChange={(e) => handleChange(r, c, e.target.value)}
              className="w-16 p-2 text-center border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))
        )}
      </div>
    </div>
  );
}
