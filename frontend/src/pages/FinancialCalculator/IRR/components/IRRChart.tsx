import React from "react";
import ReactApexChart from "react-apexcharts";

interface IRRChartProps {
  irr: number; // porcentaje, ej. 10 = 10%
  cashFlows: number[];
}

const IRRChart: React.FC<IRRChartProps> = ({ irr, cashFlows }) => {
  const irrDecimal = irr / 100;
  const step = irrDecimal / 10;

  const rateLabels: string[] = [];
  const npvs: number[] = [];
  const irrMarkerIndex = 10; // siempre en la mitad (donde está el IRR real)

  for (let i = 0; i <= 20; i++) {
    const rate = i * step;
    const npv = cashFlows.reduce(
      (acc, cf, t) => acc + cf / Math.pow(1 + rate, t),
      0
    );
    rateLabels.push((rate * 100).toFixed(2));
    npvs.push(Number(npv.toFixed(2)));
  }

  const options = {
    chart: {
      type: "line" as const,
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight" as const, width: 3 },
    title: {
      text: "NPV vs. Discount Rate",
      align: "center" as const,
      style: { fontWeight: "bold", fontSize: "20px" },
    },
    xaxis: {
      categories: rateLabels,
      title: { text: "Discount Rate (%)", style: { fontWeight: 600 } },
    },
    yaxis: {
      title: { text: "Net Present Value ($)", style: { fontWeight: 600 } },
    },
    tooltip: {
      y: {
        formatter: (val: number) =>
          val.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    },
    markers: {
      size: [
        0,
        ...Array(20)
          .fill(0)
          .map((_, i) => (i === irrMarkerIndex ? 6 : 0)),
      ],
      colors: "#00E396",
      strokeColors: "#000",
      strokeWidth: 2,
      shape: "circle",
    },
  };

  const series = [
    {
      name: "NPV",
      data: npvs,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "750px",
        height: "600px",
        margin: "0 auto",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={550}
      />
    </div>
  );
};

export default IRRChart;
