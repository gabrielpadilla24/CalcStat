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

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Central Limit Theorem Simulator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="flex-1 max-w-[600px]">
            <CLTInput onResult={(res) => setResult(res)} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-[600px]">
            {result && <CLTResult {...result} />}
          </div>
        </div>

        {result?.graphData && (
          <div className="max-w-[900px] mx-auto mt-10 px-6">
            <CLTGraph graphData={result.graphData} />
          </div>
        )}

        <CLTInfo />
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default CLTCalculator;
