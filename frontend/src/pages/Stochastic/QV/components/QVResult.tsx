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

type QVData = {
  process: string;
  mode: string;
  T?: number;
  N?: number;
  M?: number;
  a?: number;
  b?: number;
  mu?: number;
  sigma?: number;
};

type QVResponse = {
  mode: string;
  params: QVData;
  formula?: string; // <-- ahora opcional
  qv_formula?: string;
  qv_value?: string;
  steps?: string[];
  chartData?: { [key: string]: number | string }[];
  trajectoriesShown?: number;
  trajectoriesTotal?: number;
};

export default function QVResult({ result }: { result?: QVResponse }) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">
          No computation yet. Select process and compute quadratic variation.
        </p>
      </div>
    );
  }

  const { mode, params, formula, qv_formula, qv_value, steps, chartData } =
    result;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Quadratic Variation Result
      </h2>

      {/* Formula del proceso */}
      {formula && (
        <>
          <p className="text-gray-700 font-medium">Selected process:</p>
          <BlockMath math={`X_t = ${formula}`} />
        </>
      )}

      {/* Fórmula QV */}
      {qv_formula && (
        <>
          <p className="text-gray-700 font-medium">Quadratic variation:</p>
          <BlockMath math={`[X]_t = ${qv_formula}`} />
        </>
      )}

      {/* Valor QV si es analítico */}
      {qv_value && (
        <>
          <p className="text-gray-700 font-medium">Evaluated value:</p>
          <BlockMath math={`[X]_t = ${qv_value}`} />
        </>
      )}

      {/* Pasos (si existen) */}
      {steps && steps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mt-6 mb-3">Step-by-step</h3>
          <div className="space-y-3">
            {steps.map((s, idx) => (
              <BlockMath key={idx} math={s} />
            ))}
          </div>
        </div>
      )}

      {/* Monte Carlo Chart */}
      {mode === "montecarlo" && chartData && chartData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center mb-3">
            Monte Carlo Simulation of QV
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

                {/* Media de QV */}
                <Line
                  type="monotone"
                  dataKey="mean"
                  stroke="#000"
                  dot={false}
                  strokeWidth={2}
                  name="Mean QV"
                />

                {/* Trayectorias individuales */}
                {Object.keys(chartData[0])
                  .filter((k) => k.startsWith("traj"))
                  .map((trajKey, idx) => (
                    <Line
                      key={trajKey}
                      type="monotone"
                      dataKey={trajKey}
                      stroke={`hsl(${(idx * 360) / (params.M || 1)}, 70%, 50%)`}
                      dot={false}
                      strokeWidth={1}
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
