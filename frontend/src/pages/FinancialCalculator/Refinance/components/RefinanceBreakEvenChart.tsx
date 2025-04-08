import React from "react";
import ReactApexChart from "react-apexcharts";

interface RefinanceBreakEvenChartProps {
  currentCumulativePayments: number[]; // acumulado actual
  refinanceCumulativePayments: number[]; // acumulado refinanciado
}

const RefinanceBreakEvenChart: React.FC<RefinanceBreakEvenChartProps> = ({
  currentCumulativePayments,
  refinanceCumulativePayments,
}) => {
  const categories = currentCumulativePayments.map((_, i) => `Month ${i + 1}`);

  const formatearNumero = (valor: number): string => {
    return valor.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const options = {
    chart: {
      type: "line" as const,
      height: 400,
      zoom: { enabled: false },
    },
    title: {
      text: "Cumulative Payments: Original vs Refinance",
      align: "center" as const,
      style: { fontSize: "20px", fontWeight: "bold" },
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${formatearNumero(val)}`,
      },
    },
    xaxis: {
      categories,
      title: {
        text: "Time (Months)",
      },
    },
    yaxis: {
      title: {
        text: "Cumulative Payment ($)",
      },
      labels: {
        formatter: (val: number) => `$${formatearNumero(val)}`,
      },
    },
    legend: {
      position: "top" as const,
    },
  };

  const series = [
    {
      name: "Original Loan",
      data: currentCumulativePayments,
    },
    {
      name: "Refinanced Loan",
      data: refinanceCumulativePayments,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={400}
      />
    </div>
  );
};

export default RefinanceBreakEvenChart;
