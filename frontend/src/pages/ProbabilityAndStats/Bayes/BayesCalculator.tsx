"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import BayesInput from "./components/BayesInput";
import BayesResult from "./components/BayesResult";

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

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Bayes Theorem Calculator
        </h1>

        {/* Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center items-stretch">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px] min-h-[650px]">
            <BayesInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="flex-1 max-w-[600px] min-h-[650px]">
            <BayesResult result={result} />
          </div>
        </div>

        {/* (Opcional: Info card con explicación) */}
        {/* <div className="max-w-[1170px] mx-auto px-6 mt-6">
          <BayesInfo />
        </div> */}
      </div>

      {/* CTA abajo */}
      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default BayesCalculator;
