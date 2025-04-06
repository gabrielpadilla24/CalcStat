import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  resultado: {
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
    fixedYearsMessage?: string; // ← Nuevo
  } | null;
  monthlyPropertyTax?: number;
  monthlyHOA?: number;
  monthlyInsurance?: number;
  scrollToGraph: () => void;
}

const MonthlyBreakdownChart: React.FC<Props> = ({
  resultado,
  monthlyPropertyTax = 0,
  monthlyHOA = 0,
  monthlyInsurance = 0,
  scrollToGraph,
}) => {
  const hasResult = resultado !== null;
  const basePayment = hasResult ? resultado!.monthlyPayment : 0;

  // Saneamiento: valores negativos se consideran 0
  const propertyTax = monthlyPropertyTax > 0 ? monthlyPropertyTax : 0;
  const hoa = monthlyHOA > 0 ? monthlyHOA : 0;
  const insurance = monthlyInsurance > 0 ? monthlyInsurance : 0;

  const totalPayment = basePayment + propertyTax + hoa + insurance;

  const series = hasResult
    ? [
        basePayment,
        ...(propertyTax > 0 ? [propertyTax] : []),
        ...(hoa > 0 ? [hoa] : []),
        ...(insurance > 0 ? [insurance] : []),
      ]
    : [0];

  const labels = hasResult
    ? [
        "Principal + Interest",
        ...(propertyTax > 0 ? ["Property Tax"] : []),
        ...(hoa > 0 ? ["HOA Fees"] : []),
        ...(insurance > 0 ? ["Insurance"] : []),
      ]
    : ["Principal + Interest"];

  const colors = ["#10b981", "#f59e0b", "#6366f1", "#ec4899"];

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
    colors,
    legend: {
      show: false,
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
    <div
      className={`bg-white rounded-lg shadow-md p-6 w-[600px] ${
        resultado?.fixedYearsMessage ? "h-[576px]" : "h-[516px]"
      }`}
    >
      {" "}
      <h2 className="text-xl font-semibold text-center mb-4">
        Monthly Payment Chart
      </h2>
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          hasResult ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
          {/* Donut Chart */}
          <div className="flex-1 flex justify-center">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={300}
            />
          </div>

          {/* Payment Info */}
          <div className="flex-1 text-sm text-gray-700 space-y-1">
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-4 rounded-lg text-center shadow-sm mb-4">
              <div className="text-lg font-semibold leading-tight">
                Monthly Payment
              </div>
              {resultado?.fixedYearsMessage && (
                <div className="text-sm text-gray-600 italic">
                  (first {resultado.fixedYearsMessage.match(/\d+/)?.[0]} years)
                </div>
              )}

              <div className="text-2xl font-bold mt-1">
                {hasResult ? formatCurrency(totalPayment) : "—"}
              </div>

              {resultado?.fixedYearsMessage && (
                <p className="text-sm text-gray-600 mt-2 italic hover:underline cursor-pointer">
                  Learn more about ARM’s
                </p>
              )}
            </div>

            <p>
              <strong>Principal + Interest:</strong>{" "}
              {hasResult ? formatCurrency(basePayment) : "—"}
            </p>
            <p>
              <strong>Property Tax:</strong>{" "}
              {propertyTax > 0 ? formatCurrency(propertyTax) : "—"}
            </p>
            <p>
              <strong>HOA Fees:</strong> {hoa > 0 ? formatCurrency(hoa) : "—"}
            </p>
            <p>
              <strong>Insurance:</strong>{" "}
              {insurance > 0 ? formatCurrency(insurance) : "—"}
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

        {/* Custom Legend */}
        {hasResult && (
          <div className="flex justify-center gap-6 mt-6 flex-wrap text-sm font-medium">
            {series.map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                ></div>
                {labels[index]}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Scroll Button */}
      <div className="pt-6 text-center">
        <button
          onClick={scrollToGraph}
          className="text-gray-600 hover:text-gray-800 transition-colors text-sm underline underline-offset-4 mt-10"
        >
          ↓ See Amortization Graph
        </button>
      </div>
    </div>
  );
};

export default MonthlyBreakdownChart;
