import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  principal: number;
  interest: number;
}

const MonthlyBreakdownChart: React.FC<Props> = ({ principal, interest }) => {
  const series = [principal, interest];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Principal", "Interest"],
    colors: ["#10b981", "#f87171"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[400px]">
      <h2 className="text-xl font-semibold text-center mb-4">
        Monthly Payment Breakdown
      </h2>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={300}
      />
    </div>
  );
};

export default MonthlyBreakdownChart;
