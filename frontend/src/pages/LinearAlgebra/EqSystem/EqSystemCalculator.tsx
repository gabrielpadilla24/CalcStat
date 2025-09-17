"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import EqSystemInput from "./components/EqSystemInput";
import EqSystemResult from "./components/EqSystemResult";

type Equation = { lhs: string; rhs: string };
type EqSystemResponse = {
  equations: Equation[];
  coeffmatrix?: string;
  status?: string;
  solution?: Record<string, number>;
  solution_latex?: string;
  variables?: string[];
  steps?: string[];
};

const EqSystemCalculator = () => {
  const [result, setResult] = useState<EqSystemResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Linear Equation System Calculator
        </h1>

        {/* Layout: responsive input + result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 justify-center items-center lg:items-stretch">
          {/* INPUT */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px]">
            <EqSystemInput onResult={(res) => setResult(res)} />
          </div>

          {/* RESULT */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px]">
            <EqSystemResult
              equations={result?.equations}
              coeffmatrix={result?.coeffmatrix}
              status={result?.status}
              solution={result?.solution}
              solution_latex={result?.solution_latex}
              steps={result?.steps}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default EqSystemCalculator;
