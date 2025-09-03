"use client";

import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

type Props = {
  simMean?: number;
  simVar?: number;
  theoMean?: number;
  theoVar?: number;
  mu?: number;
  sigma2?: number;
  n?: number;
  n_sim?: number;
  distribution?: string;
  params?: Record<string, number>;
  error?: string;
};

// 🔹 Helper para formatear distribución en LaTeX
const formatParamsLatex = (
  distribution?: string,
  params?: Record<string, number>
) => {
  if (!distribution || !params) return "";

  const upper = distribution.charAt(0).toUpperCase() + distribution.slice(1);

  const paramStr = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");

  return `\\text{${upper}}(${paramStr})`;
};

export default function CLTResult({
  simMean,
  simVar,
  theoMean,
  theoVar,
  mu,
  sigma2,
  n,
  n_sim,
  distribution,
  params,
  error,
}: Props) {
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ Error</h2>
        <p className="text-yellow-700">{error}</p>
      </div>
    );
  }

  if (!simMean && !theoMean) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No results yet. Run a simulation first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6 text-center">
        CLT Simulation Results
      </h2>

      {/* General info */}
      <div className="space-y-2 text-gray-800 mb-6">
        <p>
          <strong>Distribution:</strong>{" "}
          <InlineMath math={formatParamsLatex(distribution, params)} />
        </p>
        <p>
          <strong>Sample size (n):</strong> {n}
        </p>
        <p>
          <strong>Simulations (Nsim):</strong> {n_sim}
        </p>
        <p>
          <strong>Population mean (μ):</strong> {mu?.toFixed(4)}
        </p>
        <p>
          <strong>Population variance (σ²):</strong> {sigma2?.toFixed(4)}
        </p>
      </div>

      {/* Comparison */}
      <div className="space-y-3 text-gray-800">
        <h3 className="font-semibold text-lg mb-2">Comparison</h3>
        <p>
          <strong>Simulated mean:</strong> {simMean?.toFixed(4)} |{" "}
          <strong>Theoretical mean:</strong> {theoMean?.toFixed(4)}
        </p>
        <p>
          <strong>Simulated variance:</strong> {simVar?.toFixed(6)} |{" "}
          <strong>Theoretical variance:</strong> {theoVar?.toFixed(6)}
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 text-gray-700 text-sm">
        <p>
          According to the <strong>Central Limit Theorem</strong>, the sampling
          distribution of the mean approaches a Normal distribution with
          parameters <InlineMath math={"N(\\mu, \\sigma^2 / n)"} /> as{" "}
          <em>n</em> grows, regardless of the original distribution.
        </p>
      </div>
    </div>
  );
}
