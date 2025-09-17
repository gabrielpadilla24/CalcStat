"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import PoissonInput from "./components/PoissonInput";
import PoissonResult from "./components/PoissonResult";
import PoissonInfo from "./components/PoissonInfo";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type PoissonResponse = {
  lam: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

const PoissonCalculator = () => {
  const [result, setResult] = useState<PoissonResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Poisson Distribution Calculator
        </h1>

        {/* Input + Result */}
        <div
          className="
            max-w-[1440px] 
            mx-auto 
            flex 
            flex-col lg:flex-row 
            gap-6 
            justify-center 
            items-center lg:items-stretch
            px-0 sm:px-6
          "
        >
          {/* INPUT */}
          <div className="w-full max-w-[500px]">
            <PoissonInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="w-full max-w-[600px]">
            <PoissonResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1220px] mx-auto px-2 sm:px-6 mt-10">
          <PoissonInfo />
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default PoissonCalculator;
