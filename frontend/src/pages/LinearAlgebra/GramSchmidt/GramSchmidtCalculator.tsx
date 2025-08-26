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
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Gram-Schmidt Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="flex-1 max-w-[600px]">
            <GramSchmidtInput onResult={setResult} />
            <GramSchmidtInfo />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-[600px]">
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
      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default GramSchmidtCalculator;
