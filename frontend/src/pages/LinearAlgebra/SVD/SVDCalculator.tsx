"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import SVDInput from "./components/SVDInput";
import SVDResult from "./components/SVDResult";

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
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Singular Value Decomposition (SVD) Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          <div className="flex-1 max-w-[600px]">
            <SVDInput onResult={setResult} />
          </div>
          <div className="flex-1 max-w-[600px]">
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
          </div>
        </div>
      </div>
      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default SVDCalculator;
