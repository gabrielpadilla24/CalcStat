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
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  // Si cambian las dimensiones desde fuera, reinicializamos
  useEffect(() => {
    setMatrix(Array.from({ length: rows }, () => Array(cols).fill(0)));
  }, [rows, cols]);

  const handleChange = (r: number, c: number, value: string) => {
    const newMatrix = matrix.map((row, i) =>
      row.map((val, j) => (i === r && j === c ? Number(value) : val))
    );
    setMatrix(newMatrix);
    onChange(newMatrix);
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
