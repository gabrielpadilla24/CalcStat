"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import SDEInput from "./components/SDEInput";
import SDEResult from "./components/SDEResult";
import SDEInfo from "./components/SDEInfo";

type SDEData = {
  x0: number;
  mu: string;
  sigma: string;
  T: number;
  N: number;
  M: number;
};

type SDEResponse = {
  params: SDEData;
  chartData: { [key: string]: number | string }[];
};

const SDECalculator = () => {
  const [result, setResult] = useState<SDEResponse | undefined>(undefined);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Stochastic Differential Equation (SDE) Solver
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start">
          {/* Input form */}
          <div className="w-full max-w-sm lg:w-1/3">
            <SDEInput onResult={setResult} />
          </div>

          {/* Simulation result */}
          <div className="w-full max-w-3xl mt-8 lg:mt-0">
            <SDEResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1230px] mx-auto px-4 sm:px-6 mt-6">
          <SDEInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default SDECalculator;
