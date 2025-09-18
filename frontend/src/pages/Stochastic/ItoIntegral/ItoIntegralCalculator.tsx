"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import ItoIntegralInput from "./components/ItoIntegralInput";
import ItoIntegralResult from "./components/ItoIntegralResult";
import ItoIntegralInfo from "./components/ItoIntegralInfo";

type ItoData = {
  integrand: string;
  T: number;
  N: number;
  M: number;
  w0: number;
};

type ItoResponse = {
  params: ItoData;
  chartData: { [key: string]: number | string }[];
};

const ItoIntegralCalculator = () => {
  const [result, setResult] = useState<ItoResponse | undefined>(undefined);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Itô Integral Calculator
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start mb-6">
          {/* Input form */}
          <div className="w-full max-w-md lg:max-w-sm lg:w-1/3">
            <ItoIntegralInput onResult={setResult} />
          </div>

          {/* Simulation result */}
          <div className="w-full max-w-3xl mt-8 lg:mt-0">
            <ItoIntegralResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1220px] mx-auto w-full px-4 sm:px-6">
          <ItoIntegralInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default ItoIntegralCalculator;
