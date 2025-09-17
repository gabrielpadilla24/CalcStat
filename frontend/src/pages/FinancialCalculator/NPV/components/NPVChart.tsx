import ReactApexChart from "react-apexcharts";

type NPVChartProps = {
  cashFlows: { year: number; value: number }[];
};

const NPVChart = ({ cashFlows }: NPVChartProps) => {
  const series = [
    {
      name: "Cash Flow",
      data: cashFlows.map((cf) => cf.value),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      animations: { enabled: true },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            { from: -1000000, to: -46, color: "#F15B46" }, // rojo
            { from: -45, to: 0, color: "#FEB019" }, // naranja
          ],
        },
        columnWidth: "70%",
      },
    },
    dataLabels: { enabled: false },
    yaxis: {
      title: {
        text: "Cash Flow ($)",
        style: { fontWeight: 600 },
      },
      labels: { formatter: (y) => y.toFixed(0) },
    },
    xaxis: {
      categories: cashFlows.map((cf) => `Year ${cf.year}`),
      labels: { rotate: -45, style: { fontSize: "12px" } },
    },
    grid: {
      row: { colors: ["#f9f9f9", "transparent"], opacity: 0.5 },
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
  };

  return (
    <div className="mt-10 w-full max-w-4xl mx-auto px-2 sm:px-4">
      <h3 className="text-lg sm:text-xl font-semibold text-center mb-4">
        Annual Cash Flow Chart
      </h3>

      {/* scroll horizontal solo si es necesario */}
      <div className="overflow-x-auto">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default NPVChart;
