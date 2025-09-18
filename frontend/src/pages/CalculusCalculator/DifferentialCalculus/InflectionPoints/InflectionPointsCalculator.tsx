// src/pages/CalculusCalculator/DifferentialCalculus/InflectionPoints/InflectionPointsCalculator.tsx
"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import InflectionPointsInput from "./components/InflectionPointsInput";
import InflectionPointsGraph from "./components/InflectionPointsGraph";
import InflectionPointsResult from "./components/InflectionPointsResult";

export default function InflectionPointsCalculator() {
  // LaTeX principales
  const [original, setOriginal] = useState<string>("");
  const [firstDerivative, setFirstDerivative] = useState<string>("");
  const [secondDerivative, setSecondDerivative] = useState<string>("");

  // Candidatos a inflexión
  const [secondDerivativeZeros, setSecondDerivativeZeros] = useState<string[]>(
    []
  );
  const [secondDerivativeSingularities, setSecondDerivativeSingularities] =
    useState<string[]>([]);

  // ✅ Inflexiones confirmadas
  const [inflectionPoints, setInflectionPoints] = useState<
    { x: string; y: string }[]
  >([]);
  const [inflectionCoords, setInflectionCoords] = useState<string[]>([]); // "(x, y)" para Desmos

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Concavity / Inflection Points
        </h1>

        {/* Main responsive container */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-center gap-8">
          {/* Left column: Input + Graph */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0 flex flex-col items-center">
            <div className="w-full">
              <InflectionPointsInput
                onResult={(
                  orig,
                  fprime,
                  fsecond,
                  zeros,
                  sing,
                  inflPts,
                  inflCoords
                ) => {
                  setOriginal(orig);
                  setFirstDerivative(fprime);
                  setSecondDerivative(fsecond);
                  setSecondDerivativeZeros(zeros);
                  setSecondDerivativeSingularities(sing);
                  setInflectionPoints(inflPts);
                  setInflectionCoords(inflCoords ?? []);
                }}
              />
            </div>

            {/* Graph */}
            <div className="w-full mt-6">
              <InflectionPointsGraph
                latex={original}
                inflectionPoints={inflectionPoints}
                inflectionPointsCoords={inflectionCoords}
                // 📱 smaller on mobile, larger on desktop
                height={
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 300
                    : 500
                }
              />
            </div>
          </div>

          {/* Right column: Results */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0 mt-8 lg:mt-0">
            <InflectionPointsResult
              original={original}
              firstDerivative={firstDerivative}
              secondDerivative={secondDerivative}
              secondDerivativeZeros={secondDerivativeZeros}
              secondDerivativeSingularities={secondDerivativeSingularities}
              inflectionPoints={inflectionPoints}
              inflectionPointsCoords={inflectionCoords}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
}
