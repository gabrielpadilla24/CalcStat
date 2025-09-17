import React from "react";
import ReactApexChart from "react-apexcharts";

interface GrowthComparisonChartProps {
  timeline: number[]; // [0, 1, 2, ..., n]
  valoresPorTasa: number[][]; // [[valores tasa 1], [tasa 2], ...]
  interestRates: number[]; // [5, 8]
}

const GrowthComparisonChart: React.FC<GrowthComparisonChartProps> = ({
  timeline,
  valoresPorTasa,
  interestRates,
}) => {
  const categories = timeline.map((year) => `Year ${year}`);

  const formatCurrency = (val: number): string =>
    val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const options = {
    chart: {
      type: "line" as const,
      zoom: { enabled: false },
      toolbar: { show: true },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight" as const, width: 3 },
    title: {
      text: "Investment Growth Comparison",
      align: "center" as const,
      style: { fontWeight: "bold", fontSize: "20px" },
    },
    xaxis: {
      categories,
      title: {
        text: "Year",
        style: { fontWeight: 600 },
      },
    },
    yaxis: {
      title: {
        text: "Value ($)",
        style: { fontWeight: 600 },
      },
      labels: { formatter: formatCurrency },
    },
    tooltip: { y: { formatter: formatCurrency } },
    legend: {
      position: "bottom" as const,
      horizontalAlign: "center" as const,
      fontSize: "14px",
    },
    grid: {
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
    },
    responsive: [
      {
        breakpoint: 1024, // tablets
        options: {
          chart: { height: 400 },
          title: { style: { fontSize: "16px" } },
        },
      },
      {
        breakpoint: 640, // móviles
        options: {
          chart: { height: 300 },
          legend: { fontSize: "12px" },
          xaxis: { labels: { show: false } },
        },
      },
    ],
  };

  const series = interestRates.map((rate, i) => ({
    name: `${rate}% Return`,
    data: valoresPorTasa[i],
  }));

  return (
    <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-xl shadow-md mx-auto">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default GrowthComparisonChart;
