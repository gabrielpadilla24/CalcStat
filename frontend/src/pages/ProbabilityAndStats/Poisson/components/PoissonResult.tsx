"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import PoissonGraph from "./PoissonGraph";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type PoissonResponse = {
  lam: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  result: PoissonResponse | null;
};

export default function PoissonResult({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No result yet. Submit parameters first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-bold text-center">Poisson Distribution</h2>

      <div className="text-center">
        <p>
          <strong>λ:</strong> {result.lam}
        </p>
      </div>

      <div>
        <p className="font-medium text-center">Result:</p>
        <BlockMath math={result.prob_latex} />
      </div>

      {/* 🔹 Gráfico PMF + CDF */}
      <PoissonGraph
        support={result.support}
        pmf={result.pmf}
        cdf={result.cdf}
        height={400}
      />
    </div>
  );
}
