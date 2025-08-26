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
  support: number[]; // valores de X
  pdf: number[]; // densidad f(x)
  cdf: number[]; // acumulada F(x)
  height?: number;
};

export default function ExponentialDistrGraph({
  support,
  pdf,
  cdf,
  height = 400,
}: Props) {
  // 🔹 Estructurar los datos en [{x, pdf, cdf}]
  const data = support.map((x, i) => ({
    x,
    pdf: pdf[i],
    cdf: cdf[i],
  }));

  return (
    <div className="w-full bg-white border border-gray-300 p-4 rounded-xl mt-6 shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📊 Exponential Distribution (PDF & CDF)
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

          {/* 🔹 Línea PDF */}
          <Line
            type="monotone"
            dataKey="pdf"
            name="PDF f(x)"
            stroke="#5FBA9B"
            dot={false}
          />

          {/* 🔹 Línea CDF */}
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
