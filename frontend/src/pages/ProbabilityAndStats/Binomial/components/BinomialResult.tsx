"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import BinomialGraph from "./BinomialGraph";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type BinomialResponse = {
  n: number;
  p: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  result: BinomialResponse | null;
};

export default function BinomialResult({ result }: Props) {
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
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6 w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
        Binomial Result
      </h2>

      {/* Parameters */}
      <div className="flex flex-col sm:flex-row sm:gap-8 text-sm sm:text-base text-gray-700">
        <p>
          <strong>n:</strong> {result.n}
        </p>
        <p>
          <strong>p:</strong> {result.p}
        </p>
      </div>

      {/* Formula */}
      <div className="overflow-x-auto">
        <p className="text-base sm:text-lg font-semibold mb-2">Result:</p>
        <BlockMath math={result.prob_latex} />
      </div>

      {/* Graph */}
      <div className="w-full">
        <BinomialGraph
          support={result.support}
          pmf={result.pmf}
          cdf={result.cdf}
          height={300} // 🔹 smaller on mobile
        />
      </div>
    </div>
  );
}
