import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  totalPayment: number;
  resultado: {
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
  } | null;
}

const MonthlyBreakdownChart: React.FC<Props> = ({
  totalPayment,
  resultado,
}) => {
  const series = [totalPayment];

  const options: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: ["Monthly Payment"],
    colors: ["#10b981"],
    legend: { show: false },
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

      {resultado && (
        <div className="mt-6 text-center text-green-800 bg-green-50 border border-green-400 rounded-lg p-4">
          <p className="font-semibold">
            Monthly Payment: ${resultado.monthlyPayment.toLocaleString()}
          </p>
          <p>Loan Amount: ${resultado.loanAmount.toLocaleString()}</p>
          <p>Total Payments: {resultado.totalPayments}</p>
          <p>Monthly Interest Rate: {resultado.monthlyRate}%</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyBreakdownChart;
