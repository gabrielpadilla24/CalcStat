"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import GeometricInput from "./components/GeometricInput";
import GeometricResult from "./components/GeometricResult";
import GeometricInfo from "./components/GeometricInfo";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type GeometricResponse = {
  p: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

const GeometricCalculator = () => {
  const [result, setResult] = useState<GeometricResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Geometric Distribution Calculator
        </h1>

        {/* Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row gap-6 sm:gap-8 px-2 sm:px-6 justify-center items-center xl:items-stretch">
          {/* INPUT */}
          <div className="flex-1 w-full max-w-[500px]">
            <GeometricInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="flex-1 w-full max-w-[600px]">
            <GeometricResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1220px] mx-auto px-2 sm:px-6 mt-8 sm:mt-10">
          <GeometricInfo />
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default GeometricCalculator;
