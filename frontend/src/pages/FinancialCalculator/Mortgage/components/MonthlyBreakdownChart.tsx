import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  totalPayment: number;
}

const MonthlyBreakdownChart: React.FC<Props> = ({ totalPayment }) => {
  const series = [totalPayment];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Monthly Payment"],
    colors: ["#10b981"],
    legend: {
      show: false, // ya no hay desglose
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[400px]">
      <h2 className="text-xl font-semibold text-center mb-4">
        Monthly Payment Chart
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
