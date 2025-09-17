"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import NormalGraph from "./NormalGraph";

type ContinuousQuery =
  | { kind: "leq"; k?: number }
  | { kind: "geq"; k?: number }
  | { kind: "between"; a?: number; b?: number };

type NormalResponse = {
  mu: number;
  sigma: number;
  query: ContinuousQuery;
  support: number[];
  pdf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

type Props = {
  result: NormalResponse | null;
};

export default function NormalResult({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center w-full min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500 text-sm sm:text-base">
          No result yet. Submit parameters first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full flex flex-col space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-center">
        Normal Distribution
      </h2>

      {/* Parameters */}
      <div className="text-center text-sm sm:text-base">
        <p>
          <strong>μ:</strong> {result.mu} &nbsp;&nbsp;
          <strong>σ:</strong> {result.sigma}
        </p>
      </div>

      {/* Result */}
      <div className="text-center">
        <p className="font-medium text-sm sm:text-base">Result:</p>
        <div className="overflow-x-auto">
          <BlockMath math={result.prob_latex} />
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full">
        <NormalGraph
          support={result.support}
          pdf={result.pdf}
          cdf={result.cdf}
          height={250} // smaller default
        />
      </div>
    </div>
  );
}
