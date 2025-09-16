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

      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Expectation & Variance of Stochastic Processes
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input form */}
          <div className="w-full lg:w-1/3 max-w-sm">
            <EVInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-3xl">
            <EVResult result={result} />
          </div>
        </div>
        {/* Info Card */}
        <div className="max-w-[1230px] mx-auto px-6 mt-6">
          <EVInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default EVCalculator;
