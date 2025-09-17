"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import EigenInput, { type EigenResponse } from "./components/EigenInput";
import EigenResult from "./components/EigenResult";
import EigenInfo from "./components/EigenInfo";

const EigenCalculator = () => {
  const [result, setResult] = useState<EigenResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Eigenvalues and Eigenvectors Calculator
        </h1>

        {/* Layout: Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-stretch">
          {/* Input */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px]">
            <EigenInput onResult={setResult} />
          </div>

          {/* Result + Info */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px] flex flex-col gap-6">
            <EigenResult
              matrix={result?.matrix}
              eigenvalues={result?.eigenvalues}
              eigenvectors={result?.eigenvectors}
              steps={result?.steps}
            />
            <EigenInfo />
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default EigenCalculator;
