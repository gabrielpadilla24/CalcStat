"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import QVInput from "./components/QVInput";
import QVResult from "./components/QVResult";
import QVInfo from "./components/QVInfo";

type QVData = {
  process: string;
  mode: string;
  T?: number;
  N?: number;
  M?: number;
  a?: number;
  b?: number;
  mu?: number;
  sigma?: number;
};

type QVResponse = {
  mode: string;
  params: QVData;
  formula?: string;
  qv_formula?: string;
  qv_value?: string;
  steps?: string[];
  chartData?: { [key: string]: number | string }[];
  trajectoriesShown?: number;
  trajectoriesTotal?: number;
};

const QVCalculator = () => {
  const [result, setResult] = useState<QVResponse | undefined>(undefined);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Quadratic Variation Calculator
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start">
          {/* Input form */}
          <div className="w-full max-w-sm lg:w-1/3">
            <QVInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="w-full max-w-3xl mt-8 lg:mt-0">
            <QVResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1230px] mx-auto px-4 sm:px-6 mt-6">
          <QVInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default QVCalculator;
