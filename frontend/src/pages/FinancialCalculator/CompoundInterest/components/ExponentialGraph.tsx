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
      type: "line" as const,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
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
        fontSize: "18px",
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
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => formatearNumero(val),
      },
    },
    responsive: [
      {
        breakpoint: 1024, // tablets
        options: {
          chart: {
            height: 400,
          },
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
      {
        breakpoint: 640, // móviles
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
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
    <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-xl shadow-md mx-auto">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={450}
      />
    </div>
  );
};

export default ExponentialGraph;
