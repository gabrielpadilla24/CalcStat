"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import ExponentialDistrInput from "./components/ExponentialDistrInput";
import ExponentialDistrResult from "./components/ExponentialDistrResult";
import ExponentialDistrInfo from "./components/ExponentialDistrInfo";

type ContinuousQuery =
  | { kind: "leq"; k?: number }
  | { kind: "geq"; k?: number }
  | { kind: "between"; a?: number; b?: number };

type ExponentialResponse = {
  lam: number;
  query: ContinuousQuery;
  support: number[];
  pdf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

const ExponentialDistrCalculator = () => {
  const [result, setResult] = useState<ExponentialResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Exponential Distribution Calculator
        </h1>

        {/* Input + Result layout */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 px-2 sm:px-6 justify-center items-center lg:items-stretch">
          {/* INPUT */}
          <div className="flex-1 w-full max-w-full sm:max-w-[500px]">
            <ExponentialDistrInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px]">
            <ExponentialDistrResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1170px] mx-auto px-2 sm:px-6 mt-8 sm:mt-10">
          <ExponentialDistrInfo />
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

export default ExponentialDistrCalculator;
