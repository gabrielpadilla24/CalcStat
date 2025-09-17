"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DeterminantInput from "./components/DeterminantInput";
import DeterminantResult from "./components/DeterminantResult";

type DeterminantResponse = {
  matrix: number[][];
  determinant?: number;
  steps?: string[];
  error?: string;
  explanation?: string;
};

const DeterminantCalculator = () => {
  const [result, setResult] = useState<DeterminantResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Determinant Calculator
        </h1>

        {/* Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 justify-center items-center lg:items-start px-2 sm:px-6">
          {/* Input */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px]">
            <DeterminantInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px] mt-6 lg:mt-0">
            <DeterminantResult
              matrix={result?.matrix}
              determinant={result?.determinant}
              steps={result?.steps}
              error={result?.error}
              explanation={result?.explanation}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default DeterminantCalculator;
