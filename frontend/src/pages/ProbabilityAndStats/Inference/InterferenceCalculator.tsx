"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import InferenceInput from "./components/InferenceInput";
import InferenceResult from "./components/InferenceResult";
//import InferenceInfo from "./components/InferenceInfo";

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

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Confidence Intervals & Hypothesis Tests Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="flex-1 max-w-[500px]">
            <InferenceInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-[600px]">
            {result && <InferenceResult {...result} />}
          </div>
        </div>

        {/* Info card debajo */}
        <div className="max-w-[1000px] mx-auto mt-10 px-6">
          {/* <InferenceInfo /> */}
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
}
