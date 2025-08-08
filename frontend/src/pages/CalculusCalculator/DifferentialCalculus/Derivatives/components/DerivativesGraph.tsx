import Plot from "react-plotly.js";

const DerivativesGraph = () => {
  const xValues = Array.from({ length: 100 }, (_, i) => i / 5 - 10); // [-10, 10]
  const yValues = xValues.map((x) => Math.pow(x, 2)); // f(x) = x²

  return (
    <div className="w-full bg-white border border-gray-300 p-4 rounded-xl mt-2 shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🧮 Interactive Graphing Calculator
      </h2>

      {/* ✅ Contenedor centrado para el gráfico */}
      <div className="flex justify-center w-full">
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              type: "scatter",
              mode: "lines",
              marker: { color: "blue" },
              name: "f(x) = x²",
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 40, r: 40, b: 40, t: 30 }, // 👈 márgenes simétricos
            xaxis: { title: "x", zeroline: true },
            yaxis: { title: "f(x)", zeroline: true },
          }}
          useResizeHandler
          className="w-full max-w-[600px] h-[500px]"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default DerivativesGraph;
