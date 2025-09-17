"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import InferenceInput from "./components/InferenceInput";
import InferenceResult from "./components/InferenceResult";
// import InferenceInfo from "./components/InferenceInfo";

type InferenceResponse = {
  test: string;
  statistic: number;
  p_value: number;
  alpha: number;
  alternative?: string;
  ci?: number[];
  latex_ci?: string;
  decision: string;
  df_between?: number;
  df_within?: number;
  error?: string;
};

export default function InferenceCalculator() {
  const [result, setResult] = useState<InferenceResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Confidence Intervals & Hypothesis Tests Calculator
        </h1>

        {/* Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 justify-center items-center lg:items-start px-2 sm:px-6">
          {/* Input */}
          <div className="flex-1 w-full max-w-full sm:max-w-[500px]">
            <InferenceInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px] mt-6 lg:mt-0">
            {result && <InferenceResult {...result} />}
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1000px] mx-auto mt-8 sm:mt-10 px-2 sm:px-6">
          {/* <InferenceInfo /> */}
        </div>
      </div>

      {/* CTA */}
      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
}
