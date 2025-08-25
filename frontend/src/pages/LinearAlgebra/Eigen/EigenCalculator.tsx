"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import EigenInput from "./components/EigenInput";
import EigenResult from "./components/EigenResult";
//INPUT AND RESULT

type EigenResponse = {
  matrix: number[][];
  eigenvalues?: number[];
  eigenvectors?: number[][];
  steps?: string[];
};

const EigenCalculator = () => {
  const [result, setResult] = useState<EigenResponse | null>(null);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Eigenvalues and Eigenvectors Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          <div className="flex-1 max-w-[600px]">
            <EigenInput onResult={setResult} />
          </div>
          <div className="flex-1 max-w-[600px]">
            <EigenResult matrix={result?.matrix} />
          </div>
        </div>
      </div>
      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default EigenCalculator;
