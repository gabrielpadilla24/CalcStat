import React, { useEffect, useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";

interface Props {
  resultado: {
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
    fixedYearsMessage?: string;
    secondPayment?: number;
  } | null;
  monthlyPropertyTax?: number;
  monthlyHOA?: number;
  monthlyInsurance?: number;
  scrollToGraph: () => void;
  scrollToARM: () => void;
  scrollToInterestOnly?: () => void;
  scrollToBalloon?: () => void;
  loanType: string;
}

const MonthlyBreakdownChart: React.FC<Props> = ({
  resultado,
  monthlyPropertyTax = 0,
  monthlyHOA = 0,
  monthlyInsurance = 0,
  scrollToGraph,
  scrollToARM,
  scrollToInterestOnly,
  scrollToBalloon,
  loanType,
}) => {
  // 1) Lazy-load for SSR
  const [Chart, setChart] = useState<
    null | typeof import("react-apexcharts")["default"]
  >(null);

  useEffect(() => {
    let mounted = true;
    if (typeof window !== "undefined") {
      import("react-apexcharts").then(
        (m) => mounted && setChart(() => m.default)
      );
    }
    return () => {
      mounted = false;
    };
  }, []);

  const isTwoPaymentLoan = resultado?.secondPayment !== undefined;
  const [selectedTab, setSelectedTab] = useState<"initial" | "after">(
    "initial"
  );
  useEffect(() => setSelectedTab("initial"), [resultado]);

  const hasResult = !!resultado;

  const paymentToDisplay =
    isTwoPaymentLoan && selectedTab === "after"
      ? resultado?.secondPayment ?? 0
      : resultado?.monthlyPayment ?? 0;

  // Clamp to non-negative numbers (protect against NaN)
  const propertyTax = Math.max(0, Number(monthlyPropertyTax) || 0);
  const hoa = Math.max(0, Number(monthlyHOA) || 0);
  const insurance = Math.max(0, Number(monthlyInsurance) || 0);

  const totalPayment = paymentToDisplay + propertyTax + hoa + insurance;

  // 2) Build arrays fresh + memoized
  const series = useMemo<number[]>(
    () =>
      hasResult
        ? [
            paymentToDisplay,
            ...(propertyTax > 0 ? [propertyTax] : []),
            ...(hoa > 0 ? [hoa] : []),
            ...(insurance > 0 ? [insurance] : []),
          ]
        : [],
    [hasResult, paymentToDisplay, propertyTax, hoa, insurance]
  );

  const labels = useMemo<string[]>(
    () =>
      hasResult
        ? [
            "Principal + Interest",
            ...(propertyTax > 0 ? ["Property Tax"] : []),
            ...(hoa > 0 ? ["HOA Fees"] : []),
            ...(insurance > 0 ? ["Insurance"] : []),
          ]
        : [],
    [hasResult, propertyTax, hoa, insurance]
  );

  const colors = ["#10b981", "#f59e0b", "#6366f1", "#ec4899"];

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  const options: ApexOptions = {
    chart: { type: "donut" },
    labels,
    colors,
    legend: { show: false },
    tooltip: { y: { formatter: (v) => formatCurrency(Number(v)) } },
    responsive: [{ breakpoint: 768, options: { chart: { width: "100%" } } }],
  };

  // 3) Guard against blank donut
  const hasPositiveData = series.reduce((a, b) => a + b, 0) > 0;

  // 4) FORCE REMOUNT when shape changes (critical fix)
  const chartKey = useMemo(
    () => `${labels.join("|")}::${series.join("|")}`,
    [labels, series]
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[600px] flex flex-col justify-between transition-all duration-300">
      <h2 className="text-xl font-semibold text-center mb-4">
        Monthly Payment Chart
      </h2>

      {isTwoPaymentLoan && (
        <div className="flex justify-center mb-4 flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-l-lg border ${
              selectedTab === "initial"
                ? "bg-[#5FBA9B] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedTab("initial")}
          >
            {loanType === "Interest Only"
              ? "Interest-Only Period"
              : "Monthly Payment"}
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg border ${
              selectedTab === "after"
                ? "bg-[#5FBA9B] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedTab("after")}
          >
            {loanType === "Interest Only"
              ? "After Interest-Only"
              : "Balloon Payment"}
          </button>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ease-in-out ${
          hasResult ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center md:items-start">
          {/* Donut */}
          <div className="flex-1 flex justify-center w-full">
            {!Chart || !hasPositiveData ? (
              <div className="h-[280px] w-full rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                {!Chart ? "Loading chart…" : "No data yet"}
              </div>
            ) : (
              <Chart
                key={chartKey} // ← important
                options={options}
                series={[...series]} // ← new array instance
                type="donut"
                height={280}
                width="100%"
              />
            )}
          </div>

          {/* Summary */}
          <div className="flex-1 text-sm text-gray-700 space-y-1 w-full">
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-4 rounded-lg text-center shadow-sm mb-4">
              <div className="text-lg font-semibold leading-tight">
                {loanType === "Balloon Payments" &&
                isTwoPaymentLoan &&
                selectedTab === "after"
                  ? "Balloon Payment"
                  : "Monthly Payment"}
              </div>

              {loanType === "ARM" &&
                resultado?.fixedYearsMessage &&
                selectedTab === "initial" && (
                  <div className="text-sm text-gray-600 italic">
                    (first {resultado.fixedYearsMessage.match(/\d+/)?.[0]}{" "}
                    years)
                  </div>
                )}

              <div className="text-2xl font-bold mt-1">
                {hasResult ? formatCurrency(totalPayment) : "—"}
              </div>

              {loanType === "ARM" &&
                resultado?.fixedYearsMessage &&
                selectedTab === "initial" && (
                  <div className="pt-6 text-center">
                    <button
                      onClick={scrollToARM}
                      className="text-gray-600 hover:text-gray-800 transition-colors text-sm italic"
                    >
                      Learn More About ARM's
                    </button>
                  </div>
                )}

              {loanType === "Interest Only" && (
                <div className="pt-6 text-center">
                  <button
                    onClick={scrollToInterestOnly}
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm italic"
                  >
                    Learn More About Interest-Only Mortgages
                  </button>
                </div>
              )}

              {loanType === "Balloon Payments" && (
                <div className="pt-6 text-center">
                  <button
                    onClick={scrollToBalloon}
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm italic"
                  >
                    Learn More About Balloon Payment Mortgages
                  </button>
                </div>
              )}
            </div>

            <p>
              <strong>Principal + Interest:</strong>{" "}
              {hasResult ? formatCurrency(paymentToDisplay) : "—"}
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

        {hasPositiveData && (
          <div className="flex justify-center gap-6 mt-6 flex-wrap text-sm font-medium">
            {series.map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
                {labels[i]}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 text-center">
        <button
          onClick={scrollToGraph}
          className="text-gray-600 hover:text-gray-800 transition-colors text-sm underline underline-offset-4"
        >
          ↓ See Amortization Graph
        </button>
      </div>
    </div>
  );
};

export default MonthlyBreakdownChart;
