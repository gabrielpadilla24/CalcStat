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

      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Martingale Tester
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="w-full lg:w-1/3 max-w-sm">
            <MartingaleInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-3xl">
            <MartingaleResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1170px] mx-auto px-6 mt-6">
          <MartingaleInfo />
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Stochastic Calculus"
        href="/stochastic-calculus"
      />
    </>
  );
};

export default MartingaleCalculator;
