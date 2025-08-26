"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

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
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No result yet. Submit parameters first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Binomial Result</h2>
      <p>
        <strong>n:</strong> {result.n}
      </p>
      <p>
        <strong>p:</strong> {result.p}
      </p>
      <div className="mt-4">
        <p className="font-medium">Query:</p>
        <BlockMath math={result.prob_latex} />
        <p className="mt-2">
          <strong>Numerical Result:</strong> {result.prob_result.toFixed(5)}
        </p>
      </div>
    </div>
  );
}
