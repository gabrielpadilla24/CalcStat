"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  support: number[];
  pdf: number[];
  cdf: number[];
  height?: number;
};

export default function UniformGraph({
  support,
  pdf,
  cdf,
  height = 350, // un poco más bajo que los otros para que matchee el input
}: Props) {
  // Rejuntar datos
  const data = support.map((x, i) => ({
    x,
    pdf: pdf[i],
    cdf: cdf[i],
  }));

  return (
    <div className="w-full bg-white border border-gray-300 p-4 rounded-xl mt-4 shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📊 Uniform Distribution (PDF & CDF)
      </h2>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{ value: "x", position: "insideBottom", dy: 10 }}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => value.toFixed(4)}
            labelFormatter={(label) => `x = ${label}`}
          />
          <Legend />

          {/* PDF */}
          <Line
            type="stepAfter"
            dataKey="pdf"
            name="PDF f(x)"
            stroke="#5FBA9B"
            dot={false}
          />

          {/* CDF */}
          <Line
            type="monotone"
            dataKey="cdf"
            name="CDF F(x)"
            stroke="#1E3A8A"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
