"use client";

import { useState, useMemo } from "react";

type GramSchmidtResponse = {
  vectores: string;
  ortonormal?: string;
  pasos?: string[];
  error?: string;
  explanation?: string;
};

const GramSchmidtInput = ({
  onResult,
}: {
  onResult: (result: GramSchmidtResponse) => void;
}) => {
  const [numVectors, setNumVectors] = useState(2); // default: 2 vectores

  // Estado numérico (para cálculos)
  const [vectors, setVectors] = useState<number[][]>(
    Array.from({ length: 2 }, () => [0, 0, 0])
  );

  // Estado string (para inputs visuales)
  const [inputValues, setInputValues] = useState<string[][]>(
    Array.from({ length: 2 }, () => ["", "", ""])
  );

  // 👉 sanitiza números
  const clean = (M: (number | string)[][]): number[][] =>
    M.map((row) =>
      row.map((v) => {
        const n = typeof v === "number" ? v : Number(v);
        return Number.isFinite(n) ? n : 0;
      })
    );

  const body = useMemo(
    () => JSON.stringify({ vectors: clean(vectors) }),
    [vectors]
  );

  // 🔁 actualizar número de vectores
  const handleNumVectorsChange = (value: number) => {
    const newVectors = Array.from({ length: value }, (_, i) =>
      vectors[i] ? vectors[i] : [0, 0, 0]
    );
    const newInputs = Array.from({ length: value }, (_, i) =>
      inputValues[i] ? inputValues[i] : ["", "", ""]
    );
    setNumVectors(value);
    setVectors(newVectors);
    setInputValues(newInputs);
  };

  // 🔁 actualizar valor en un componente específico
  const handleValueChange = (
    vecIdx: number,
    compIdx: number,
    value: string
  ) => {
    // Actualiza input string (lo que se ve en pantalla)
    const newInputs = inputValues.map((vec, i) =>
      i === vecIdx ? vec.map((c, j) => (j === compIdx ? value : c)) : vec
    );
    setInputValues(newInputs);

    // Convierte a número (o 0 si vacío)
    const parsed = value.trim() === "" ? 0 : Number(value);
    const newVectors = vectors.map((vec, i) =>
      i === vecIdx
        ? vec.map((c, j) =>
            j === compIdx ? (Number.isFinite(parsed) ? parsed : 0) : c
          )
        : vec
    );
    setVectors(newVectors);
  };

  const handleCalculate = async () => {
    try {
      const res = await fetch("http://localhost:8000/gramschmidt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) throw new Error("Request failed");

      const data = (await res.json()) as GramSchmidtResponse;
      onResult(data);
    } catch {
      onResult({
        vectores: "",
        error: "Failed to compute Gram–Schmidt process.",
        explanation: "Please check your input vectors and try again.",
      });
    }
  };

  return (
    <div className="w-[600px] bg-white rounded-xl shadow-md border border-gray-200 p-8">
      <div className="flex flex-col items-center text-center">
        <label className="text-lg font-medium text-gray-700 mb-4">
          Enter 1–4 vectors in <strong>ℝ³</strong> for Gram–Schmidt:
        </label>

        {/* Selector de cantidad de vectores */}
        <div className="flex gap-4 justify-center mb-6">
          <label className="font-medium text-gray-700">Vectors:</label>
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

        {/* Inputs para cada vector (verticales en columna) */}
        <div className="flex flex-wrap gap-6 justify-center">
          {Array.from({ length: numVectors }).map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-gray-50 flex flex-col gap-2"
            >
              <h3 className="font-semibold mb-2 text-center">v{i + 1}</h3>
              {Array.from({ length: 3 }).map((_, j) => (
                <input
                  key={j}
                  type="number"
                  value={inputValues[i]?.[j] ?? ""}
                  onChange={(e) => handleValueChange(i, j, e.target.value)}
                  className="w-20 p-2 border rounded-lg text-center"
                  placeholder={`x${j + 1}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Botón */}
        <button
          onClick={handleCalculate}
          className="mt-6 bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
        >
          Compute Gram–Schmidt
        </button>
      </div>
    </div>
  );
};

export default GramSchmidtInput;
