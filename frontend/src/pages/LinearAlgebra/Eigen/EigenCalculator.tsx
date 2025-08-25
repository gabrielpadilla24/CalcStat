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
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Eigenvalues and Eigenvectors Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="flex-1 max-w-[600px]">
            <EigenInput onResult={setResult} />
          </div>

          {/* Result + Education card */}
          <div className="flex-1 max-w-[600px]">
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

      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default EigenCalculator;
