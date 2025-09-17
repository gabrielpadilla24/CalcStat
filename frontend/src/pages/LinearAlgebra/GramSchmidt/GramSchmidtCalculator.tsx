"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import GramSchmidtInput from "./components/GramSchmidtInput";
import GramSchmidtResult from "./components/GramSchmidtResult";
import GramSchmidtInfo from "./components/GramdSchmidtInfo";

type GramSchmidtResponse = {
  vectores: string;
  ortonormal?: string;
  pasos?: string[];
  error?: string;
  explanation?: string;
};

const GramSchmidtCalculator = () => {
  const [result, setResult] = useState<GramSchmidtResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Gram-Schmidt Calculator
        </h1>

        {/* Layout: input + result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-stretch">
          {/* Input + Info */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px] flex flex-col gap-6">
            <GramSchmidtInput onResult={setResult} />
            <GramSchmidtInfo />
          </div>

          {/* Result */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px]">
            <GramSchmidtResult
              vectores={result?.vectores}
              ortonormal={result?.ortonormal}
              pasos={result?.pasos}
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

export default GramSchmidtCalculator;
