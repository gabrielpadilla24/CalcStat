"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

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
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No result yet. Submit parameters first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-lg font-semibold">Geometric Result</h2>

      <div>
        <p>
          <strong>p:</strong> {result.p}
        </p>
      </div>

      <div>
        <p className="font-medium">Result:</p>
        <BlockMath math={result.prob_latex} />
      </div>
    </div>
  );
}
