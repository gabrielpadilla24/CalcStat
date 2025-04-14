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

  const options = {
    chart: {
      type: "line" as const,
      zoom: { enabled: false },
      toolbar: { show: true },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight" as const, width: 3 },
    title: {
      text: "Accumulated Savings vs. Goal",
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
  };

  const series = [
    {
      name: "Accumulated Value",
      data: valores,
    },
    {
      name: "Total Contributions",
      data: aportes,
    },
    {
      name: "Savings Goal",
      data: Array(valores.length).fill(goal),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "750px",
        height: "608px",
        margin: "0 auto",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={550}
      />
    </div>
  );
};

export default SavingsChart;
