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

type SDEData = {
  x0: number;
  mu: string;
  sigma: string;
  T: number;
  N: number;
  M: number;
};

type SDEResponse = {
  params: SDEData;
  chartData: { [key: string]: number | string }[];
  stats?: { mean: number; variance: number; min: number; max: number };
};

export default function SDEResult({ result }: { result?: SDEResponse }) {
  if (!result || !result.chartData || result.chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">
          No simulation yet. Submit parameters to see results.
        </p>
      </div>
    );
  }

  const { chartData, params, stats } = result;
  const { M } = params;

  const handleScroll = () => {
    const infoSection = document.getElementById("sde-info");
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">
        Simulated SDE Trajectories (Euler–Maruyama)
      </h2>

      {/* 🔹 Chart container responsivo */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[450px]">
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
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />

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
      </div>

      {/* 🔹 Stats section */}
      {stats && (
        <div className="mt-6 text-center text-sm sm:text-base">
          <h3 className="text-md font-semibold mb-2">
            📊 Statistics of Xₜ at T
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <p className="text-gray-700">Mean: {stats.mean.toFixed(4)}</p>
            <p className="text-gray-700">
              Variance: {stats.variance.toFixed(4)}
            </p>
            <p className="text-gray-700">Min: {stats.min.toFixed(4)}</p>
            <p className="text-gray-700">Max: {stats.max.toFixed(4)}</p>
          </div>
        </div>
      )}

      {/* 🔽 Scroll button */}
      <div
        onClick={handleScroll}
        className="flex items-center justify-center gap-2 mt-4 cursor-pointer text-[#5FBA9B] hover:text-[#4FAE8D] font-medium transition-colors"
      >
        <span className="text-base">↓</span>
        <span>See how it was calculated</span>
      </div>
    </div>
  );
}
