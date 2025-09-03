"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type RegressionResultProps = {
  coefficients: Record<string, number>;
  stderr: Record<string, number>;
  tvalues: Record<string, number>;
  pvalues: Record<string, number>;
  r2: number;
  r2_adj: number;
  fstat?: number;
  f_pvalue?: number;
  equation_latex: string;
  error?: string;
};

export default function RegressionResult({
  coefficients,
  stderr,
  tvalues,
  pvalues,
  r2,
  r2_adj,
  fstat,
  f_pvalue,
  equation_latex,
  error,
}: RegressionResultProps) {
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ Error</h2>
        <p className="text-yellow-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        📊 Regression Results
      </h2>

      {/* Ecuación */}
      <div className="mb-6 text-center">
        <BlockMath math={equation_latex} />
      </div>

      {/* Métricas globales */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">R²</p>
          <p className="text-lg font-semibold">{r2.toFixed(4)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Adjusted R²</p>
          <p className="text-lg font-semibold">{r2_adj.toFixed(4)}</p>
        </div>
        {fstat !== undefined && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">F-statistic</p>
            <p className="text-lg font-semibold">{fstat.toFixed(4)}</p>
          </div>
        )}
        {f_pvalue !== undefined && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">F-test p-value</p>
            <p className="text-lg font-semibold">{f_pvalue.toExponential(3)}</p>
          </div>
        )}
      </div>

      {/* Coeficientes */}
      <h3 className="text-lg font-semibold mb-3">Coefficients</h3>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">Term</th>
            <th className="px-3 py-2 text-right">Estimate</th>
            <th className="px-3 py-2 text-right">Std. Error</th>
            <th className="px-3 py-2 text-right">t-value</th>
            <th className="px-3 py-2 text-right">p-value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(coefficients).map((key) => (
            <tr key={key} className="border-t">
              <td className="px-3 py-2">{key}</td>
              <td className="px-3 py-2 text-right">
                {coefficients[key].toFixed(4)}
              </td>
              <td className="px-3 py-2 text-right">
                {stderr[key]?.toFixed(4)}
              </td>
              <td className="px-3 py-2 text-right">
                {tvalues[key]?.toFixed(4)}
              </td>
              <td className="px-3 py-2 text-right">
                {pvalues[key]?.toExponential(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
