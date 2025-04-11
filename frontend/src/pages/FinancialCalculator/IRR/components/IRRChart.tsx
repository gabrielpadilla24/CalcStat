import React from "react";
import ReactApexChart from "react-apexcharts";

interface IRRChartProps {
  irr: number; // porcentaje
  discountRates: number[]; // array de tasas en %
  npvs: number[]; // array de NPV por tasa
}

const IRRChart: React.FC<IRRChartProps> = ({ irr, discountRates, npvs }) => {
  const options = {
    chart: {
      type: "line" as const,
      zoom: { enabled: false },
      toolbar: { show: true },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight" as const, width: 3 },
    title: {
      text: "NPV vs. Discount Rate",
      align: "center" as const,
      style: { fontWeight: "bold", fontSize: "20px" },
    },
    xaxis: {
      categories: discountRates.map((rate) => rate.toFixed(2)),
      title: {
        text: "Discount Rate (%)",
        style: { fontWeight: 600 },
      },
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
      },
    },
    yaxis: {
      title: {
        text: "Net Present Value ($)",
        style: { fontWeight: 600 },
      },
      labels: {
        formatter: (val: number) =>
          val.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
      y: {
        formatter: (val: number) =>
          val.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    },
    annotations: {
      xaxis: [
        {
          x: irr.toFixed(2),
          borderColor: "#00E396",
          label: {
            style: {
              color: "#fff",
              background: "#00E396",
              fontWeight: 600,
            },
            text: `IRR = ${irr.toFixed(2)}%`,
          },
        },
      ],
    },
    grid: {
      padding: {
        top: 20,
        bottom: 30,
        left: 30,
        right: 30,
      },
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
  };

  const series = [
    {
      name: "NPV",
      data: npvs,
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

export default IRRChart;
