"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import GeometricGraph from "./GeometricGraph";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type GeometricResponse = {
  p: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  result: GeometricResponse | null;
};

export default function GeometricResult({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 text-center">
        <p className="text-gray-500 text-sm sm:text-base">
          No result yet. Submit parameters first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-center">
        Geometric Distribution
      </h2>

      {/* Probability p */}
      <div className="text-center">
        <p className="text-sm sm:text-base">
          <strong>p:</strong> {result.p}
        </p>
      </div>

      {/* Result formula */}
      <div>
        <p className="font-medium text-center text-sm sm:text-base">Result:</p>
        <div className="overflow-x-auto">
          <BlockMath math={result.prob_latex} />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <GeometricGraph
          support={result.support}
          pmf={result.pmf}
          cdf={result.cdf}
          height={300} // 📱 smaller height for mobile
        />
      </div>
    </div>
  );
}
