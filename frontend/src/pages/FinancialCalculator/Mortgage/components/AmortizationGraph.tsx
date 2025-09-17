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
      minimumFractionDigits: 0,
    });

  const options = {
    chart: {
      type: "line" as const,
      zoom: { enabled: false },
      toolbar: { show: false },
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
      labels: { rotate: -45 },
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
    colors: ["#3b82f6", "#10b981", "#f59e0b"], // azul, verde, naranja
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { height: 400 },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: { height: 300 },
          xaxis: { labels: { show: false } },
        },
      },
    ],
  };

  const series = [
    { name: "Principal Paid", data: principalPaid },
    { name: "Interest Paid", data: interestPaid },
    { name: "Loan Balance", data: loanBalance },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[1200px] mx-auto">
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
