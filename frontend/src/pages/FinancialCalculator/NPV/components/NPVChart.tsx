import React from "react";
import ReactApexChart from "react-apexcharts";

type NPVChartProps = {
  cashFlows: { year: number; value: number }[];
};

const NPVChart = ({ cashFlows }: NPVChartProps) => {
  const series = [
    {
      name: "Cash Flow",
      data: cashFlows.map((cf) => cf.value),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            { from: -1000000, to: -46, color: "#F15B46" },
            { from: -45, to: 0, color: "#FEB019" },
          ],
        },
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: "Cash Flow ($)",
      },
      labels: {
        formatter: (y) => y.toFixed(0),
      },
    },
    xaxis: {
      categories: cashFlows.map((cf) => `Year ${cf.year}`),
      labels: {
        rotate: -45,
      },
    },
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-center mb-4">
        Annual Cash Flow Chart
      </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default NPVChart;
