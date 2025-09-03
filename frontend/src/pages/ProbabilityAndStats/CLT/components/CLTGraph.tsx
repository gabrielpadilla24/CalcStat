"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type GraphPoint = {
  x: number;
  freq: number; // histograma simulado
  normal: number; // curva teórica
};

type Props = {
  graphData: GraphPoint[];
  height?: number;
};

export default function CLTGraph({ graphData, height = 400 }: Props) {
  if (!graphData || graphData.length === 0) {
    return (
      <div className="bg-white border border-gray-300 p-4 rounded-xl mt-6 shadow-md text-center">
        <p className="text-gray-500">No data to display yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-300 p-4 rounded-xl mt-2 shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📊 Sampling Distribution of the Mean
      </h2>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{ value: "Sample mean", position: "insideBottom", dy: 10 }}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => value.toFixed(4)}
            labelFormatter={(label) => `Mean ≈ ${label}`}
          />
          <Legend />

          {/* 🔹 Histograma simulado */}
          <Bar dataKey="freq" name="Simulated means" fill="#5FBA9B" />

          {/* 🔹 Normal teórica */}
          <Line
            type="monotone"
            dataKey="normal"
            name="Theoretical Normal"
            stroke="#1E3A8A"
            dot={false}
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
