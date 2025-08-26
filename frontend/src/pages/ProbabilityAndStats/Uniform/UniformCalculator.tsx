"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import UniformInput from "./components/UniformInput";
import UniformResult from "./components/UniformResult";
import UniformInfo from "./components/UniformInfo";

type ContinuousQuery =
  | { kind: "leq"; k?: number }
  | { kind: "geq"; k?: number }
  | { kind: "between"; a?: number; b?: number };

type UniformResponse = {
  a: number;
  b: number;
  query: ContinuousQuery;
  support: number[];
  pdf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

const UniformCalculator = () => {
  const [result, setResult] = useState<UniformResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Uniform Distribution Calculator
        </h1>

        {/* Input + Result con misma altura */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center items-stretch">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px] h-full flex flex-col">
            <UniformInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="flex-1 max-w-[600px] h-full flex flex-col">
            <UniformResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1170px] mx-auto px-6 mt-6">
          <UniformInfo />
        </div>
      </div>

      {/* CTA abajo */}
      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default UniformCalculator;
