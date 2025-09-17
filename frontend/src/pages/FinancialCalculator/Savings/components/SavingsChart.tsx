import React from "react";
import ReactApexChart from "react-apexcharts";

interface SavingsChartProps {
  valores: number[];
  aportes: number[];
  goal: number;
}

const SavingsChart: React.FC<SavingsChartProps> = ({
  valores,
  aportes,
  goal,
}) => {
  const categories = valores.map((_, i) => `Year ${i}`);

  const formatCurrency = (val: number): string =>
    val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: true },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight", width: 3 },
    title: {
      text: "Accumulated Savings vs. Goal",
      align: "center",
      style: { fontWeight: "bold", fontSize: "20px" },
    },
    xaxis: {
      categories,
      title: {
        text: "Year",
        style: { fontWeight: 600 },
      },
      labels: { rotate: -45 },
    },
    yaxis: {
      title: {
        text: "Amount ($)",
        style: { fontWeight: 600 },
      },
      labels: {
        formatter: formatCurrency,
      },
    },
    tooltip: {
      y: {
        formatter: formatCurrency,
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    responsive: [
      {
        breakpoint: 1024, // tablets
        options: {
          chart: { height: 400 },
          title: { style: { fontSize: "18px" } },
        },
      },
      {
        breakpoint: 640, // mobiles
        options: {
          chart: { height: 300 },
          xaxis: { labels: { rotate: -30 } },
          title: { style: { fontSize: "16px" } },
        },
      },
    ],
  };

  const series = [
    { name: "Accumulated Value", data: valores },
    { name: "Total Contributions", data: aportes },
    { name: "Savings Goal", data: Array(valores.length).fill(goal) },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-8">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default SavingsChart;
