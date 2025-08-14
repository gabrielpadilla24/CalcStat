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

  // 🔹 CANDIDATOS A INFLEXIÓN (estos eran los que faltaban)
  const [secondDerivativeZeros, setSecondDerivativeZeros] = useState<string[]>(
    []
  );
  const [secondDerivativeSingularities, setSecondDerivativeSingularities] =
    useState<string[]>([]);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Concavity / Inflection Points
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">
              <InflectionPointsInput
                onResult={(orig, fprime, fsecond, zeros, sing) => {
                  setOriginal(orig);
                  setFirstDerivative(fprime);
                  setSecondDerivative(fsecond);
                  setSecondDerivativeZeros(zeros);
                  setSecondDerivativeSingularities(sing);
                }}
              />
            </div>

            <div className="w-full">
              <InflectionPointsGraph
                latex={original}
                firstDerivativeLatex={firstDerivative}
                secondDerivativeLatex={secondDerivative}
                height={500}
              />
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <InflectionPointsResult
              original={original}
              firstDerivative={firstDerivative}
              secondDerivative={secondDerivative}
              secondDerivativeZeros={secondDerivativeZeros}
              secondDerivativeSingularities={secondDerivativeSingularities}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
}
