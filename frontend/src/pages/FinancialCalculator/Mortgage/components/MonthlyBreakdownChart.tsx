import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  resultado: {
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
  } | null;
  monthlyPropertyTax?: number;
  monthlyHOA?: number;
  monthlyInsurance?: number;
}

const MonthlyBreakdownChart: React.FC<Props> = ({
  resultado,
  monthlyPropertyTax = 0,
  monthlyHOA = 0,
  monthlyInsurance = 0,
}) => {
  const hasResult = resultado !== null;
  const basePayment = hasResult ? resultado!.monthlyPayment : 0;

  const totalPayment =
    basePayment + monthlyPropertyTax + monthlyHOA + monthlyInsurance;

  const series = hasResult
    ? [
        basePayment,
        ...(monthlyPropertyTax > 0 ? [monthlyPropertyTax] : []),
        ...(monthlyHOA > 0 ? [monthlyHOA] : []),
        ...(monthlyInsurance > 0 ? [monthlyInsurance] : []),
      ]
    : [0];

  const labels = hasResult
    ? [
        "Principal + Interest",
        ...(monthlyPropertyTax > 0 ? ["Property Tax"] : []),
        ...(monthlyHOA > 0 ? ["HOA Fees"] : []),
        ...(monthlyInsurance > 0 ? ["Insurance"] : []),
      ]
    : ["Principal + Interest"];

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels,
    colors: ["#10b981", "#f59e0b", "#6366f1", "#ec4899"],
    legend: {
      show: true,
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: formatCurrency,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 250 },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[400px]">
      <h2 className="text-xl font-semibold text-center mb-4">
        Monthly Payment Chart
      </h2>
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          hasResult ? "opacity-100" : "opacity-0"
        }`}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
      </div>

      {/* Highlighted Total */}
      <div className="mt-6 flex justify-center">
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-center shadow-sm w-full max-w-xs text-lg font-semibold">
          Total Monthly Payment:{" "}
          <span className="block text-2xl mt-1 font-bold">
            {hasResult ? formatCurrency(totalPayment) : "—"}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-6 text-sm text-gray-700">
        <p>
          <strong>Principal + Interest:</strong>{" "}
          {hasResult ? formatCurrency(basePayment) : "—"}
        </p>
        <p>
          <strong>Property Tax:</strong>{" "}
          {monthlyPropertyTax > 0 ? formatCurrency(monthlyPropertyTax) : "—"}
        </p>
        <p>
          <strong>HOA Fees:</strong>{" "}
          {monthlyHOA > 0 ? formatCurrency(monthlyHOA) : "—"}
        </p>
        <p>
          <strong>Insurance:</strong>{" "}
          {monthlyInsurance > 0 ? formatCurrency(monthlyInsurance) : "—"}
        </p>
        <hr className="my-2" />
        <p>
          <strong>Loan Amount:</strong>{" "}
          {hasResult ? `$${resultado!.loanAmount.toLocaleString()}` : "—"}
        </p>
        <p>
          <strong>Total Payments:</strong>{" "}
          {hasResult ? resultado!.totalPayments : "—"} months
        </p>
        <p>
          <strong>Monthly Interest Rate:</strong>{" "}
          {hasResult ? `${resultado!.monthlyRate.toFixed(4)}%` : "—"}
        </p>
      </div>
    </div>
  );
};

export default MonthlyBreakdownChart;
