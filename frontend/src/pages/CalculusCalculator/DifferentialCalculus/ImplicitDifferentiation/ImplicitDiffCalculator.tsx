"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import ImplicitDiffInput from "./components/ImplicitDiffInput";
import ImplicitDiffResult from "./components/ImplicitDiffResult";
import ImplicitDiffGraph from "./components/ImplicitDiffGraph";

const ImplicitDiffCalculator = () => {
  const [original, setOriginal] = useState<string>(""); // LaTeX o texto
  const [implicit, setImplicit] = useState<string>(""); // LaTeX o texto
  const [steps, setSteps] = useState<string[] | undefined>();

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Implicit Differentiation Calculator
        </h1>

        {/* Main responsive container */}
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row justify-center items-center xl:items-start gap-6">
          {/* Left column: Input + Graph */}
          <div className="flex-1 w-full max-w-[600px] flex flex-col items-center">
            {/* Input */}
            <div className="w-full">
              <ImplicitDiffInput
                onResult={(orig: string, dy: string, stepArr?: string[]) => {
                  setOriginal(orig);
                  setImplicit(dy);
                  setSteps(stepArr);
                }}
              />
            </div>

            {/* Graph */}
            <div className="w-full mt-6">
              <ImplicitDiffGraph
                latex={original} // e.g. "x^2 + y^2 = 25"
                implicitLatex={implicit} // e.g. "\\frac{dy}{dx} = …"
              />
            </div>
          </div>

          {/* Right column: Result */}
          <div className="flex-1 w-full max-w-[600px] mt-8 xl:mt-0">
            <ImplicitDiffResult
              original={original}
              implicit={implicit}
              steps={steps ?? []}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default ImplicitDiffCalculator;
