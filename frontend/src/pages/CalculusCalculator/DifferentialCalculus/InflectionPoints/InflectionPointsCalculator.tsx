// src/pages/CalculusCalculator/DifferentialCalculus/InflectionPoints/InflectionPointsCalculator.tsx
"use client";

import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

// 🔜 Cuando implementes los componentes, descomenta estos imports:
// import InflectionPointsInput from "./components/InflectionPointsInput";
// import ConcavityGraph from "./components/ConcavityGraph";
// import InflectionPointsResult from "./components/InflectionPointsResult";

export default function InflectionPointsCalculator() {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Concavity / Inflection Points
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            {/* Input */}
            <div className="w-full">
              {/*
              <InflectionPointsInput
                onResult={(data) => {
                  // setOriginal(data.original);
                  // setSecondDerivative(data.second_derivative);
                  // setInflectionCoords(data.inflection_points_coords ?? []);
                  // setIntervalsLatex(data.concavity_intervals_latex);
                }}
              />
              */}
            </div>

            {/* Graph */}
            <div className="w-full">
              {/*
              <ConcavityGraph
                latex={original}
                secondDerivative={secondDerivative}
                inflectionPoints={inflectionCoords}
                height={500}
              />
              */}
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            {/*
            <InflectionPointsResult
              original={original}
              secondDerivative={secondDerivative}
              inflectionPoints={inflectionCoords}
              intervalsLatex={intervalsLatex}
            />
            */}
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
}
