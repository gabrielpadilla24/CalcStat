"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import MartingaleInput from "./components/MartingaleInput";
import MartingaleResult from "./components/MartingaleResult";
import MartingaleInfo from "./components/MartingaleInfo";

type MartingaleData = {
  process: string;
  mode: string;
  T?: number;
  N?: number;
  M?: number;
  w0?: number;
};

type MartingaleResponse = {
  mode: string;
  params: MartingaleData;
  isMartingale: boolean;
  reason: string;
  chartData?: { [key: string]: number | string }[];
  steps?: string[];
  drift?: string;
  diffusion?: string;
  final?: string;
  partials?: { f_t: string; f_W: string; f_WW: string };
};

const MartingaleCalculator = () => {
  const [result, setResult] = useState<MartingaleResponse | undefined>(
    undefined
  );

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Martingale Tester
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1170px] mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start px-4 sm:px-6">
          {/* Input */}
          <div className="w-full max-w-md lg:max-w-sm">
            <MartingaleInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="w-full flex-1 mt-8 lg:mt-0">
            <MartingaleResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 mt-6">
          <MartingaleInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default MartingaleCalculator;
