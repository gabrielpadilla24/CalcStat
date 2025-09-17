"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import SVDInput from "./components/SVDInput";
import SVDResult from "./components/SVDResult";
import SVDInfo from "./components/SVDInfo"; // 👈 agregado

type SVDResponse = {
  matrix: number[][];
  singularValues?: number[];
  U?: number[][];
  Sigma?: number[][];
  Vt?: number[][];
  steps?: string[];
  error?: string;
  explanation?: string;
};

const SVDCalculator = () => {
  const [result, setResult] = useState<SVDResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Singular Value Decomposition (SVD) Calculator
        </h1>

        {/* Layout: input + result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-stretch">
          {/* Input */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px]">
            <SVDInput onResult={setResult} />
          </div>

          {/* Result + Education card */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px] flex flex-col gap-6">
            <SVDResult
              matrix={result?.matrix}
              singularValues={result?.singularValues}
              U={result?.U}
              Sigma={result?.Sigma}
              Vt={result?.Vt}
              steps={result?.steps}
              error={result?.error}
              explanation={result?.explanation}
            />
            <SVDInfo />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default SVDCalculator;
