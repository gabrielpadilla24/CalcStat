import React from "react";
import ReactApexChart from "react-apexcharts";

type ReverseMortgageChartProps = {
  yearlyDebt: number[];
};

const ReverseMortgageChart: React.FC<ReverseMortgageChartProps> = ({
  yearlyDebt,
}) => {
  const categories = yearlyDebt.map((_, index) => `Year ${index + 1}`);

  const series = [
    {
      name: "Debt",
      data: yearlyDebt.map((val) => parseFloat(val.toFixed(2))),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      animations: { enabled: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "65%",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `$${val.toLocaleString()}`,
      offsetY: -20,
      style: {
        fontSize: "11px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories,
      labels: {
        style: { fontSize: "12px" },
      },
      tooltip: { enabled: true },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { fontSize: "12px" },
      },
    },
    title: {
      text: "Projected Debt Over Time",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: { bar: { columnWidth: "70%" } },
          dataLabels: { style: { fontSize: "10px" } },
        },
      },
      {
        breakpoint: 640,
        options: {
          plotOptions: { bar: { columnWidth: "80%" } },
          dataLabels: { enabled: false }, // hide on small screens for clarity
          xaxis: { labels: { style: { fontSize: "10px" } } },
          yaxis: { labels: { style: { fontSize: "10px" } } },
          title: { style: { fontSize: "14px" } },
        },
      },
    ],
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-4 sm:p-6">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        width="100%" // ✅ stretches to parent width
      />
    </div>
  );
};

export default ReverseMortgageChart;
