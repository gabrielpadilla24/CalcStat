import React from "react";
import ReactApexChart from "react-apexcharts";

interface RefinanceBreakEvenChartProps {
  groupedOriginal: number[];
  groupedRefinanced: number[];
}

const RefinanceBreakEvenChart: React.FC<RefinanceBreakEvenChartProps> = ({
  groupedOriginal,
  groupedRefinanced,
}) => {
  const maxYears = Math.max(groupedOriginal.length, groupedRefinanced.length);
  const categories = Array.from(
    { length: maxYears },
    (_, i) => `Year ${i + 1}`
  );

  const formatearNumero = (valor: number): string => {
    return valor.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    title: {
      text: "Cumulative Payments (Yearly): Original vs Refinance",
      align: "center",
      style: { fontSize: "18px", fontWeight: "bold" },
    },
    stroke: {
      curve: "straight",
      width: 3,
    },
    tooltip: {
      y: {
        formatter: (val: number | null) =>
          val !== null && val !== undefined
            ? `$${val.toLocaleString()}`
            : "N/A",
      },
    },
    xaxis: {
      categories,
      title: { text: "Time (Years)" },
      labels: { rotate: -45, style: { fontSize: "12px" } },
    },
    yaxis: {
      title: { text: "Cumulative Payment ($)" },
      labels: {
        formatter: (val: number) => `$${formatearNumero(val)}`,
      },
    },
    legend: {
      position: "top",
      fontSize: "12px",
    },
    grid: {
      padding: { left: 10, right: 10 },
    },
  };

  const series = [
    { name: "Original Loan", data: groupedOriginal },
    { name: "Refinanced Loan", data: groupedRefinanced },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mt-6 w-full max-w-5xl mx-auto">
      <div className="overflow-x-auto">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default RefinanceBreakEvenChart;
