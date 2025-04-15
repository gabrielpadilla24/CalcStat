import React from "react";
import ReactApexChart from "react-apexcharts";

interface GrowthComparisonChartProps {
  valoresPorTasa: number[][];
  interestRates: number[];
  timeline: number[];
}

const GrowthComparisonChart: React.FC<GrowthComparisonChartProps> = ({
  valoresPorTasa,
  interestRates,
  timeline,
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
    colors: ["#0BB489", "#F97316", "#3B82F6", "#E11D48"], // Puedes extender para más tasas
  };

  const series = interestRates.map((rate, i) => ({
    name: `${rate}% Return`,
    data: valoresPorTasa[i],
  }));

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

export default GrowthComparisonChart;
