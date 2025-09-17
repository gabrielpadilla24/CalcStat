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
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center w-full">
        <p className="text-gray-500 text-sm sm:text-base">
          No result yet. Submit parameters first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 space-y-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-center">
        Poisson Distribution
      </h2>

      <div className="text-center text-sm sm:text-base">
        <p>
          <strong>λ:</strong> {result.lam}
        </p>
      </div>

      <div className="overflow-x-auto">
        <p className="font-medium text-center text-sm sm:text-base mb-2">
          Result:
        </p>
        <div className="flex justify-center">
          <BlockMath math={result.prob_latex} />
        </div>
      </div>

      {/* 🔹 Responsive Graph */}
      <div className="w-full overflow-x-auto">
        <PoissonGraph
          support={result.support}
          pmf={result.pmf}
          cdf={result.cdf}
          height={350} // a bit smaller for better fit on mobile
        />
      </div>
    </div>
  );
}
