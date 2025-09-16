"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import GirsanovInput from "./components/GirsanovInput";
import GirsanovResult from "./components/GirsanovResult";
import GirsanovInfo from "./components/GirsanovInfo";

type GirsanovData = {
  mu: number;
  mu_tilde: number;
  sigma: number;
  T?: number;
  N?: number;
  M?: number;
  mode: "analytical" | "montecarlo";
};

type GirsanovResponse = {
  mode: string;
  params: GirsanovData;
  theta?: number;
  process_P?: string;
  process_Q?: string;
  radon_nikodym?: string;
  steps?: string[];
  error?: string;
};

const GirsanovCalculator = () => {
  const [result, setResult] = useState<GirsanovResponse | undefined>(undefined);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Girsanov’s Theorem Tool
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input form */}
          <div className="w-full lg:w-1/3 max-w-sm">
            <GirsanovInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-3xl">
            <GirsanovResult result={result} />
          </div>
        </div>
        {/* Info Card */}
        <div className="max-w-[1270px] mx-auto px-6 mt-6">
          <GirsanovInfo />
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Stochastic Calculus"
        href="/stochastic-calculus"
      />
    </>
  );
};

export default GirsanovCalculator;
