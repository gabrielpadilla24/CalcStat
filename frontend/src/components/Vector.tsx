"use client";

import { useState } from "react";

type VectorInputProps = {
  onChange?: (vectors: number[][]) => void;
};

const Vector = ({ onChange }: VectorInputProps) => {
  const [numVectors, setNumVectors] = useState(1);
  const [vectors, setVectors] = useState<number[][]>([[0, 0]]); // default: un vector 2D

  // Manejar cambio de número de vectores
  const handleNumVectorsChange = (value: number) => {
    const newVectors = Array.from({ length: value }, (_, i) =>
      vectors[i] ? vectors[i] : [0, 0]
    );
    setNumVectors(value);
    setVectors(newVectors);
    onChange?.(newVectors);
  };

  // Manejar cambio en un valor específico
  const handleValueChange = (
    vecIdx: number,
    compIdx: number,
    value: string
  ) => {
    const newVectors = vectors.map((vec, i) =>
      i === vecIdx
        ? vec.map((c, j) => (j === compIdx ? Number(value) || 0 : c))
        : vec
    );
    setVectors(newVectors);
    onChange?.(newVectors);
  };

  // Agregar un componente extra al vector (ej. pasar de 2D a 3D)
  const addComponent = (vecIdx: number) => {
    const newVectors = vectors.map((vec, i) =>
      i === vecIdx ? [...vec, 0] : vec
    );
    setVectors(newVectors);
    onChange?.(newVectors);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-bold mb-2 text-center">Vector Input</h2>

      {/* Selección de cantidad de vectores */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <label className="font-medium text-gray-700">Number of Vectors:</label>
        <select
          value={numVectors}
          onChange={(e) => handleNumVectorsChange(Number(e.target.value))}
          className="p-2 border rounded-lg"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Inputs para cada vector */}
      <div className="space-y-6">
        {vectors.map((vec, i) => (
          <div key={i} className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Vector {i + 1}</h3>
            <div className="flex gap-2 flex-wrap">
              {vec.map((val, j) => (
                <input
                  key={j}
                  type="number"
                  value={val}
                  onChange={(e) => handleValueChange(i, j, e.target.value)}
                  className="w-20 p-2 border rounded-lg text-center"
                  placeholder={`x${j + 1}`}
                />
              ))}
              <button
                onClick={() => addComponent(i)}
                className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-lg text-sm hover:bg-blue-200 transition"
              >
                + Add Component
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vector;
