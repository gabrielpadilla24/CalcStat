"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type BayesResponse = {
  p_a: number;
  p_b: number;
  p_b_given_a: number;
  p_b_given_not_a?: number;
  posterior: number;
  latex: string;
  error?: string;
};

type Props = {
  result: BayesResponse | null;
};

export default function BayesResult({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center h-full flex items-center justify-center">
        <p className="text-gray-500">No result yet. Submit parameters first.</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center h-full flex items-center justify-center">
        <p className="text-red-700 font-semibold">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full h-full flex flex-col space-y-6">
      <h2 className="text-xl font-bold text-center">Bayes Theorem Result</h2>

      {/* Probabilidades iniciales */}
      <div className="text-center space-y-1">
        <p>
          <strong>P(A):</strong> {result.p_a}
        </p>
        <p>
          <strong>P(B):</strong> {result.p_b}
        </p>
        <p>
          <strong>P(B|A):</strong> {result.p_b_given_a}
        </p>
        {result.p_b_given_not_a !== undefined && (
          <p>
            <strong>P(B|¬A):</strong> {result.p_b_given_not_a}
          </p>
        )}
      </div>

      {/* Resultado final */}
      <div className="text-center">
        <p className="font-medium">Posterior Probability:</p>
        <BlockMath math={result.latex} />
        <p className="mt-2 font-bold text-lg text-[#5FBA9B]">
          P(A|B) = {result.posterior.toFixed(5)}
        </p>
      </div>
    </div>
  );
}
