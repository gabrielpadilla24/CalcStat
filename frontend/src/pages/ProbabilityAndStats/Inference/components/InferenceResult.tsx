"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

type Props = {
  test?: string;
  statistic?: number;
  p_value?: number;
  alpha?: number;
  alternative?: string;
  ci?: number[];
  latex_ci?: string;
  decision?: string;
  error?: string;
};

export default function InferenceResult({
  test,
  statistic,
  p_value,
  alpha,
  alternative,
  ci,
  latex_ci,
  decision,
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

  if (!statistic || !ci) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">
          No results yet. Please enter values and calculate.
        </p>
      </div>
    );
  }

  const ciText = `[${ci[0].toFixed(4)}, ${ci[1].toFixed(4)}]`;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6 text-center">
        Inference Results ({test?.toUpperCase()}-test)
      </h2>

      {/* Intervalo de confianza */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Confidence Interval</h3>
        {latex_ci && <BlockMath math={latex_ci} />}
        <p className="text-gray-800">
          <strong>CI:</strong> {ciText}
        </p>
      </div>

      {/* Estadístico y valor p */}
      <div className="mb-6 space-y-2">
        <h3 className="font-semibold">Hypothesis Test</h3>
        <p>
          <strong>Statistic:</strong> {statistic.toFixed(4)}
        </p>
        <p>
          <strong>p-value:</strong> {p_value?.toFixed(6)}
        </p>
        <p>
          <strong>Significance level (α):</strong> {alpha}
        </p>
        <p>
          <strong>Alternative hypothesis:</strong>{" "}
          {alternative === "!=" && (
            <InlineMath math={"H_1: \\mu \\neq \\mu_0"} />
          )}
          {alternative === ">" && <InlineMath math={"H_1: \\mu > \\mu_0"} />}
          {alternative === "<" && <InlineMath math={"H_1: \\mu < \\mu_0"} />}
        </p>
      </div>

      {/* Decisión */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-gray-700 text-sm">
        <p>
          <strong>Decision:</strong> {decision}
        </p>
        <p className="mt-2">
          {decision === "Reject H0"
            ? "The null hypothesis is rejected. There is sufficient evidence against H₀."
            : "The null hypothesis is not rejected. There is not enough evidence to reject H₀."}
        </p>
      </div>
    </div>
  );
}
