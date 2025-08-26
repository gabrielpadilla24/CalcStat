"use client";

import { useState, useMemo } from "react";
import Vector from "@/components/Vector"; // 👈 nuestro input global de vectores

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
  const [vectors, setVectors] = useState<number[][]>([[0, 0]]);

  // 👉 Saneo: convierte strings a números, reemplaza NaN por 0
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
          Enter a set of vectors (1 to 4) for the Gram–Schmidt process:
        </label>

        {/* Input global de vectores */}
        <div className="w-full mb-6">
          <Vector onChange={setVectors} />
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
