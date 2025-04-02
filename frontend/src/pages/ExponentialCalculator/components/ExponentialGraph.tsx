import React from "react";
import ReactApexChart from "react-apexcharts";

interface ExponentialGraphProps {
  valores: number[];
  aportes: number[];
}

const ExponentialGraph: React.FC<ExponentialGraphProps> = ({
  valores,
  aportes,
}) => {
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
      text: "Exponential Growth per Year",
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
    tooltip: {
      y: {
        formatter: (val: number) => formatearNumero(val),
      },
    },
  };

  const series = [
    {
      name: "Future Value",
      data: valores,
    },
    {
      name: "Total Contributions",
      data: aportes,
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

export default ExponentialGraph;
