"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import EVInput from "./components/EVInput";
import EVResult from "./components/EVResult";
import EVInfo from "./components/EVInfo";

type EVData = {
  process: string;
};

type EVResponse = {
  mode: string;
  params: EVData;
  expectation: string;
  variance: string;
  steps: string[];
};

const EVCalculator = () => {
  const [result, setResult] = useState<EVResponse | undefined>(undefined);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Expectation & Variance of Stochastic Processes
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1230px] mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start px-4 sm:px-6">
          {/* Input form */}
          <div className="w-full max-w-md lg:max-w-sm">
            <EVInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="w-full flex-1 mt-8 lg:mt-0">
            <EVResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1230px] mx-auto px-4 sm:px-6 mt-6">
          <EVInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default EVCalculator;
