"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import NormalInput from "./components/NormalInput";
import NormalResult from "./components/NormalResult";

type ContinuousQuery =
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type NormalResponse = {
  mu: number;
  sigma: number;
  query: ContinuousQuery;
  support: number[];
  pdf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

const NormalCalculator = () => {
  const [result, setResult] = useState<NormalResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Normal Distribution Calculator
        </h1>

        {/* Input y Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center items-stretch">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px] h-[747px]">
            <NormalInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="flex-1 max-w-[600px] ">
            <NormalResult result={result} />
          </div>
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default NormalCalculator;
