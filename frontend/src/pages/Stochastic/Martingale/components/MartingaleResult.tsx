"use client";

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
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type MartingaleData = {
  process: string;
  mode: string;
  T?: number;
  N?: number;
  M?: number;
  w0?: number;
};

type MartingaleResponse = {
  mode: string;
  params: MartingaleData;
  isMartingale: boolean;
  reason: string;
  chartData?: { [key: string]: number | string }[];
  steps?: string[];
  drift?: string;
  diffusion?: string;
  final?: string;
  partials?: { f_t: string; f_W: string; f_WW: string };
};

export default function MartingaleResult({
  result,
}: {
  result?: MartingaleResponse;
}) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">
          No test yet. Submit a process to check martingale property.
        </p>
      </div>
    );
  }

  const {
    mode,
    isMartingale,
    reason,
    chartData,
    steps,
    drift,
    diffusion,
    final,
    partials,
    params,
  } = result;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Martingale Test Result (
        {mode === "montecarlo" ? "Monte Carlo" : "Analytical"})
      </h2>

      <div className="text-center">
        <p className="font-medium text-gray-800">
          {isMartingale
            ? "✅ Process is a martingale"
            : "❌ Process is NOT a martingale"}
        </p>
        <p className="text-gray-600">{reason}</p>
      </div>

      {/* Monte Carlo mode → show chart */}
      {mode === "montecarlo" && chartData && (
        <div>
          <h3 className="text-lg font-semibold text-center mb-3">
            Simulated Trajectories
          </h3>
          <div className="w-full h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Trayectorias individuales */}
                {Array.from({ length: params.M || 0 }, (_, idx) => (
                  <Line
                    key={idx}
                    type="monotone"
                    dataKey={`traj${idx}`}
                    stroke={`hsl(${(idx * 360) / (params.M || 1)}, 70%, 50%)`}
                    dot={false}
                    strokeWidth={1.5}
                  />
                ))}
                {/* Media empírica */}
                <Line
                  type="monotone"
                  dataKey="mean"
                  stroke="#000"
                  strokeWidth={2.5}
                  dot={false}
                  name="Empirical Mean"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Analytical mode → show math derivation */}
      {mode === "analytical" && partials && (
        <div className="space-y-4">
          <p className="text-gray-700 font-medium">Process:</p>
          <BlockMath math={`f(t,W) = ${params.process}`} />

          <p className="text-gray-700 font-medium">Partial derivatives:</p>
          <BlockMath math={`f_t = ${partials.f_t}`} />
          <BlockMath math={`f_W = ${partials.f_W}`} />
          <BlockMath math={`f_{WW} = ${partials.f_WW}`} />

          <p className="text-gray-700 font-medium">Drift term:</p>
          <BlockMath math={drift || ""} />

          <p className="text-gray-700 font-medium">Diffusion term:</p>
          <BlockMath math={diffusion || ""} />

          <p className="text-gray-700 font-medium">Final Itô expansion:</p>
          <BlockMath math={final || ""} />

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
        </div>
      )}
    </div>
  );
}
