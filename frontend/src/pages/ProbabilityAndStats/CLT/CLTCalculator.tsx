"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import CLTInput from "./components/CLTInput";
import CLTResult from "./components/CLTResult";
import CLTGraph from "./components/CLTGraph";
import CLTInfo from "./components/CLTInfo";

type CLTResponse = {
  simulatedMeans?: number[];
  simMean?: number;
  simVar?: number;
  theoMean?: number;
  theoVar?: number;
  mu?: number;
  sigma2?: number;
  n?: number;
  n_sim?: number;
  distribution?: string;
  params?: Record<string, number>;
  graphData?: { x: number; freq: number; normal: number }[];
  error?: string;
};

const CLTCalculator = () => {
  const [result, setResult] = useState<CLTResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Central Limit Theorem Simulator
        </h1>

        {/* Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 px-0 sm:px-6 justify-center items-center lg:items-stretch">
          {/* Input */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px]">
            <CLTInput onResult={(res) => setResult(res)} />
          </div>

          {/* Result */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px]">
            {result && <CLTResult {...result} />}
          </div>
        </div>

        {/* Graph */}
        {result?.graphData && (
          <div className="max-w-[900px] mx-auto mt-8 sm:mt-10 px-0 sm:px-6">
            <CLTGraph graphData={result.graphData} />
          </div>
        )}

        {/* Info Card */}
        <div className="max-w-[1170px] mx-auto mt-8 sm:mt-10 px-0 sm:px-6">
          <CLTInfo />
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

export default CLTCalculator;
