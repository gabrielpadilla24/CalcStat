"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import InferenceInput from "./components/InferenceInput";
import InferenceResult from "./components/InferenceResult";

type InferenceResponse = {
  test: string;
  statistic: number;
  p_value: number;
  alpha: number;
  alternative: string;
  ci: number[];
  latex_ci: string;
  decision: string;
  error?: string;
};

const InferenceCalculator = () => {
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
          <div className="flex-1 max-w-[600px]">
            <InferenceInput onResult={(res) => setResult(res)} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-[600px]">
            {result && <InferenceResult {...result} />}
          </div>
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
};

export default InferenceCalculator;
