import React from "react";
import ReactApexChart from "react-apexcharts";

interface AmortizationGraphProps {
  principalPaid: number[];
  interestPaid: number[];
  loanBalance: number[];
}

const AmortizationGraph: React.FC<AmortizationGraphProps> = ({
  principalPaid,
  interestPaid,
  loanBalance,
}) => {
  const years = principalPaid.map((_, i) => `Year ${i + 1}`);

  const formatCurrency = (val: number): string =>
    val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  const options = {
    chart: {
      type: "line" as const,
      height: 350,
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "straight" as const, // ✅ líneas suaves
      width: 3,
    },
    title: {
      text: "Amortization Schedule",
      align: "center" as const,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: years,
      title: { text: "Year" },
    },
    yaxis: {
      title: { text: "Amount (USD)" },
      labels: {
        formatter: formatCurrency,
      },
    },
    tooltip: {
      y: {
        formatter: formatCurrency,
      },
    },
    legend: {
      position: "top" as const,
      horizontalAlign: "center" as const,
    },
    colors: ["#3b82f6", "#10b981", "#f59e0b"], // opcional: azul, verde, naranja
  };

  const series = [
    { name: "Principal Paid", data: principalPaid },
    { name: "Interest Paid", data: interestPaid },
    { name: "Loan Balance", data: loanBalance },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[750px]">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default AmortizationGraph;
