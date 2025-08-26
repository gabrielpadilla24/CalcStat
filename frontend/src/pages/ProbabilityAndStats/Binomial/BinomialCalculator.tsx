"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import BinomialInput from "./components/BinomialInput";
import BinomialResult from "./components/BinomialResult";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type BinomialResponse = {
  n: number;
  p: number;
  query: ProbabilityQuery;
};

const BinomialCalculator = () => {
  const [result, setResult] = useState<BinomialResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Binomial Distribution Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px]">
            <BinomialInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="flex-1 max-w-[600px]">
            <BinomialResult result={result} />
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

export default BinomialCalculator;
