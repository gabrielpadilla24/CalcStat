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
  Legend,
  ResponsiveContainer,
} from "recharts";

type GirsanovData = {
  mu: number;
  mu_tilde: number;
  sigma: number;
  T?: number;
  N?: number;
  M?: number;
  mode: "analytical" | "montecarlo";
};

type GirsanovResponse = {
  mode: string;
  params: GirsanovData;
  theta?: number;
  process_P?: string;
  process_Q?: string;
  radon_nikodym?: string;
  steps?: string[];
  error?: string;
  chartData?: { [key: string]: number | string }[];
  trajectoriesShown?: number;
  trajectoriesTotal?: number;
};

export default function GirsanovResult({
  result,
}: {
  result?: GirsanovResponse;
}) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">
          No computation yet. Enter parameters and apply Girsanov’s Theorem.
        </p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ Error</h2>
        <p className="text-gray-700">{result.error}</p>
      </div>
    );
  }

  const {
    params,
    theta,
    process_P,
    process_Q,
    radon_nikodym,
    steps,
    chartData,
    trajectoriesShown,
    trajectoriesTotal,
  } = result;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Girsanov’s Theorem Result
      </h2>

      {/* Parameters */}
      <div>
        <p className="text-gray-700 font-medium">Selected parameters:</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>μ (under P): {params.mu}</li>
          <li>μ̃ (under Q): {params.mu_tilde}</li>
          <li>σ: {params.sigma}</li>
          {params.mode === "montecarlo" && (
            <>
              <li>Time Horizon (T): {params.T}</li>
              <li>Steps (N): {params.N}</li>
              <li>
                Trajectories (M): {params.M}{" "}
                {trajectoriesShown &&
                  trajectoriesTotal &&
                  `(showing ${trajectoriesShown} of ${trajectoriesTotal})`}
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Analytical mode */}
      {params.mode === "analytical" && (
        <>
          {process_P && (
            <>
              <p className="text-gray-700 font-medium">Process under P:</p>
              <BlockMath math={process_P} />
            </>
          )}

          {process_Q && (
            <>
              <p className="text-gray-700 font-medium">Process under Q:</p>
              <BlockMath math={process_Q} />
            </>
          )}

          {theta !== undefined && (
            <>
              <p className="text-gray-700 font-medium">Change of drift (θ):</p>
              <BlockMath math={`\\theta = ${theta}`} />
            </>
          )}

          {radon_nikodym && (
            <>
              <p className="text-gray-700 font-medium">
                Radon–Nikodym derivative:
              </p>
              <BlockMath math={`Z_t = ${radon_nikodym}`} />
            </>
          )}

          {steps && steps.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mt-6 mb-3">
                Step-by-step derivation
              </h3>
              <div className="space-y-3">
                {steps.map((s, idx) => (
                  <BlockMath key={idx} math={s} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Monte Carlo mode */}
      {params.mode === "montecarlo" && chartData && chartData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-center mb-3">
            Monte Carlo Simulation under P and Q
          </h3>
          <div className="w-full h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="step"
                  label={{
                    value: "Step",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Trayectorias */}
                {Object.keys(chartData[0])
                  .filter((k) => k.startsWith("traj"))
                  .map((trajKey, idx) => (
                    <Line
                      key={trajKey}
                      type="monotone"
                      dataKey={trajKey}
                      stroke={`hsl(${
                        (idx * 360) / (trajectoriesShown || 1)
                      }, 70%, 50%)`}
                      dot={false}
                      strokeWidth={1.5}
                      name={`Trajectory ${idx + 1}`}
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
