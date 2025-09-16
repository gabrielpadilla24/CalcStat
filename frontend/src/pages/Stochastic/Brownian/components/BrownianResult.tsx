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

type BrownianResponse = {
  params: {
    x0: number;
    mu: number;
    sigma: number;
    T: number;
    N: number;
    M: number;
  };
  chartData: { [key: string]: number | string }[];
};

export default function BrownianResult({
  result,
}: {
  result?: BrownianResponse;
}) {
  if (!result || !result.chartData || result.chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">
          No simulation yet. Submit parameters to see results.
        </p>
      </div>
    );
  }

  const { chartData, params } = result;
  const { M } = params;

  const handleScroll = () => {
    const infoSection = document.getElementById("brownian-info");
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Simulated Trajectories
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="step"
            label={{ value: "Step", position: "insideBottom", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />

          {Array.from({ length: M }, (_, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={`traj${idx}`}
              stroke={`hsl(${(idx * 360) / M}, 70%, 50%)`}
              dot={false}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* 🔽 Scroll button */}
      <div
        onClick={handleScroll}
        className="flex items-center justify-center gap-2 mt-6 cursor-pointer text-[#5FBA9B] hover:text-[#4FAE8D] font-medium transition-colors"
      >
        <span className="text-lg">↓</span>
        <span>See how it was calculated</span>
      </div>
    </div>
  );
}
