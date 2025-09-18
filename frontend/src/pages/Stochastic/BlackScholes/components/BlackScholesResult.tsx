"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type BlackScholesData = {
  S0: number;
  K: number;
  r: number;
  sigma: number;
  T: number;
  option_type: "call" | "put";
  mode: "derivation" | "analytical" | "montecarlo";
  N?: number;
  M?: number;
};

export type BlackScholesResponse = {
  mode: string;
  params: BlackScholesData;
  price?: number;
  d1?: number;
  d2?: number;
  pde_general?: string;
  pde_user?: string;
  steps?: string[];
  chartData?: { [key: string]: number | string }[];
  std_error?: number;
  error?: string;
};

export default function BlackScholesResult({
  result,
}: {
  result?: BlackScholesResponse | null;
}) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 text-center">
        <p className="text-gray-500">
          No computation yet. Enter parameters and run the tool.
        </p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold text-yellow-800">⚠️ Error</h2>
        <p>{result.error}</p>
      </div>
    );
  }

  const {
    mode,
    price,
    d1,
    d2,
    pde_general,
    pde_user,
    steps,
    chartData,
    std_error,
  } = result;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 space-y-6 w-full">
      <h2 className="text-xl font-semibold text-center">
        Black–Scholes Result
      </h2>

      {/* Derivation */}
      {mode === "derivation" && (
        <>
          <p className="font-medium text-gray-700">Black–Scholes PDE:</p>
          <div className="overflow-x-auto">
            <BlockMath math={pde_general || ""} />
          </div>

          {pde_user && (
            <>
              <p className="font-medium text-gray-700 mt-4">
                PDE with your parameters:
              </p>
              <div className="overflow-x-auto">
                <BlockMath math={pde_user} />
              </div>
            </>
          )}

          {steps && (
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">
                Derivation Steps
              </h3>
              <div className="space-y-3">
                {steps.map((s, idx) => (
                  <div key={idx} className="overflow-x-auto">
                    <BlockMath math={s} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Analytical */}
      {mode === "analytical" && (
        <div className="text-center space-y-2">
          <p className="text-gray-700">
            <strong>Option Price:</strong> {price?.toFixed(4)}
          </p>
          <p className="text-gray-700">
            <strong>d₁:</strong> {d1?.toFixed(4)}, <strong>d₂:</strong>{" "}
            {d2?.toFixed(4)}
          </p>
        </div>
      )}

      {/* Monte Carlo */}
      {mode === "montecarlo" && chartData && (
        <div>
          <p className="text-gray-700 text-center">
            <strong>Estimated Price:</strong> {price?.toFixed(4)} ±{" "}
            {std_error?.toFixed(4)}
          </p>

          <div className="w-full h-[300px] sm:h-[400px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                {Object.keys(chartData[0])
                  .filter((k) => k !== "step")
                  .map((key, idx) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={`hsl(${
                        (idx * 360) / chartData.length
                      }, 70%, 50%)`}
                      dot={false}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
