"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import ExponentialDistrGraph from "./ExponentialDistrGraph";

type ContinuousQuery =
  | { kind: "leq"; k?: number }
  | { kind: "geq"; k?: number }
  | { kind: "between"; a?: number; b?: number };

type ExponentialResponse = {
  lam: number;
  query: ContinuousQuery;
  support: number[];
  pdf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  result: ExponentialResponse | null;
};

export default function ExponentialDistrResult({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm sm:text-base">
          No result yet. Submit parameters first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6 w-full h-full flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold text-center">
        Exponential Distribution
      </h2>

      {/* Parámetro */}
      <div className="text-center text-sm sm:text-base">
        <p>
          <strong>λ:</strong> {result.lam}
        </p>
      </div>

      {/* Resultado */}
      <div className="text-center">
        <p className="font-medium text-sm sm:text-base">Result:</p>
        <div className="overflow-x-auto">
          <BlockMath math={result.prob_latex} />
        </div>
      </div>

      {/* 🔹 Gráfico responsivo */}
      <div className="flex-1">
        <ExponentialDistrGraph
          support={result.support}
          pdf={result.pdf}
          cdf={result.cdf}
          height={300} // más compacto en móviles
        />
      </div>
    </div>
  );
}
