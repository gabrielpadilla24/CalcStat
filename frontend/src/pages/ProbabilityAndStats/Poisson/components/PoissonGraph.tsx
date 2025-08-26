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

type Props = {
  support: number[]; // valores de X
  pmf: number[]; // P(X=k)
  cdf: number[]; // P(X<=k)
  height?: number;
};

export default function PoissonGraph({
  support,
  pmf,
  cdf,
  height = 400,
}: Props) {
  // 🔹 Rejuntar datos en un array [{x, pmf, cdf}]
  const data = support.map((k, i) => ({
    x: k,
    pmf: pmf[i],
    cdf: cdf[i],
  }));

  return (
    <div className="w-full bg-white border border-gray-300 p-4 rounded-xl mt-6 shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📊 Poisson Distribution
      </h2>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{ value: "k", position: "insideBottom", dy: 10 }}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => value.toFixed(4)}
            labelFormatter={(label) => `X = ${label}`}
          />
          <Legend />

          {/* 🔹 Barras para PMF */}
          <Bar dataKey="pmf" name="PMF P(X=k)" fill="#5FBA9B" />

          {/* 🔹 Línea para CDF */}
          <Line
            type="monotone"
            dataKey="cdf"
            name="CDF P(X≤k)"
            stroke="#1E3A8A"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
