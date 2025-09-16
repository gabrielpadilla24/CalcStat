"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import BrownianInput from "./components/BrownianInput";
import BrownianResult from "./components/BrownianResult";
import BrownianInfo from "./components/BrownianInfo";

type BrownianResponse = {
  params: {
    x0: number;
    mu: number;
    sigma: number;
    T: number;
    N: number;
    M: number;
  };
  chartData: { [key: string]: number | string }[];
};

const BrownianCalculator = () => {
  const [result, setResult] = useState<BrownianResponse | undefined>(undefined);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Brownian Motion Simulator
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input form */}
          <div className="w-full lg:w-1/3 max-w-sm">
            <BrownianInput onResult={setResult} />
          </div>

          {/* Simulation result */}
          <div className="flex-1 max-w-3xl">
            <BrownianResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1220px] mx-auto px-6 mt-6">
          <BrownianInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default BrownianCalculator;
