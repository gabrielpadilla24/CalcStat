// src/pages/CalculusCalculator/Limits/LimitsCalculator.tsx
import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import LimitsInput from "./components/LimitsInput";
import LimitsResult from "./components/LimitsResult";
// import LimitsGraph from "./components/LimitsGraph"; // (opcional) cuando lo tengas

export default function LimitsCalculator() {
  const [original, setOriginal] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [steps, setSteps] = useState<string[] | undefined>();

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Limits Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            {/* INPUT */}
            <div className="w-full">
              <LimitsInput
                onResult={(orig, lim, stepArr) => {
                  setOriginal(orig);
                  setLimit(lim);
                  setSteps(stepArr);
                }}
              />
            </div>

            {/* GRAPH (opcional) */}
            <div className="w-full">
              {/* <LimitsGraph latex={original} /> */}
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <LimitsResult original={original} limit={limit} steps={steps} />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
}
