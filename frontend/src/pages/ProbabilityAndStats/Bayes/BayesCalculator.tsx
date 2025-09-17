"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import BayesInput from "./components/BayesInput";
import BayesResult from "./components/BayesResult";
import BayesInfo from "./components/BayesInfo";

type BayesResponse = {
  p_a: number;
  p_b: number;
  p_b_given_a: number;
  p_b_given_not_a?: number;
  posterior: number;
  latex: string;
  error?: string;
};

const BayesCalculator = () => {
  const [result, setResult] = useState<BayesResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Bayes Theorem Calculator
        </h1>

        {/* Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 px-2 sm:px-6 justify-center items-center lg:items-start">
          {/* INPUT */}
          <div className="flex-1 w-full max-w-full sm:max-w-[500px]">
            <BayesInput onResult={setResult} />
          </div>

          {/* RESULT + Info */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px] flex flex-col gap-6">
            <BayesResult result={result} />
            <BayesInfo />
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default BayesCalculator;
