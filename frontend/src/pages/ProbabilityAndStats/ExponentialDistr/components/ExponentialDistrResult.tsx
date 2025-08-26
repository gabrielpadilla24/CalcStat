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
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 text-center h-full">
        <p className="text-gray-500">No result yet. Submit parameters first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 space-y-4 h-full">
      <h2 className="text-lg font-bold text-center">
        Exponential Distribution
      </h2>

      {/* Parámetro */}
      <div className="text-center">
        <p>
          <strong>λ:</strong> {result.lam}
        </p>
      </div>

      {/* Resultado */}
      <div className="text-center">
        <p className="font-medium">Result:</p>
        <BlockMath math={result.prob_latex} />
      </div>

      {/* 🔹 Gráfico más pequeño */}
      <ExponentialDistrGraph
        support={result.support}
        pdf={result.pdf}
        cdf={result.cdf}
        height={353} // antes 400
      />
    </div>
  );
}
