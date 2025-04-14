import React from "react";
import ReactApexChart from "react-apexcharts";

interface SavingsChartProps {
  contribution: number;
  interestRate: number; // anual (%)
  years: number;
  goal: number;
}

const SavingsChart: React.FC<SavingsChartProps> = ({
  contribution,
  interestRate,
  years,
  goal,
}) => {
  const valores: number[] = [];
  const aportes: number[] = [];

  const r = interestRate / 100 / 12;
  let acumulado = 0;
  let totalAportado = 0;

  for (let year = 0; year <= years; year++) {
    if (year === 0) {
      valores.push(0);
      aportes.push(0);
    } else {
      for (let i = 0; i < 12; i++) {
        acumulado = acumulado * (1 + r) + contribution;
        totalAportado += contribution;
      }
      valores.push(parseFloat(acumulado.toFixed(2)));
      aportes.push(parseFloat(totalAportado.toFixed(2)));
    }
  }

  const categories = valores.map((_, index) => `Year ${index}`);

  const formatearNumero = (valor: number): string => {
    return valor.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
  };

  const options = {
    chart: {
      height: 350,
      type: "line" as const,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight" as const,
    },
    title: {
      text: "Accumulated Savings vs Goal",
      style: {
        fontWeight: "bold",
        fontSize: "20px",
      },
      align: "center" as const,
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories,
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `$${formatearNumero(val)}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${formatearNumero(val)}`,
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
      data: Array(years + 1).fill(goal),
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
        height: "600px",
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
