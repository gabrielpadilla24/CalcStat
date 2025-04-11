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
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
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
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories,
      position: "bottom",
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    title: {
      text: "Projected Debt Over Time",
      align: "center",
      style: {
        fontSize: "16px",
        color: "#333",
      },
    },
  };

  return (
    <div className="mt-10">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ReverseMortgageChart;
