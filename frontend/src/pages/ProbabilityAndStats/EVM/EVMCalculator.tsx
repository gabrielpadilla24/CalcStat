"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import EVMInput from "./components/EVMInput";
import EVMResult from "./components/EVMResult";
import EVMInfo from "./components/EVMInfo";

type EVMResponse = {
  expectedValue?: number;
  variance?: number;
  moments?: { order: number; value: number }[];
  error?: string;
};

const EVMCalculator = () => {
  const [result, setResult] = useState<EVMResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Expected Value, Variance & Moments Calculator
        </h1>

        {/* Input + Result layout */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 px-2 sm:px-6 justify-center items-center lg:items-stretch">
          {/* INPUT */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px]">
            <EVMInput onResult={(res) => setResult(res)} />
          </div>

          {/* RESULT */}
          <div className="flex-1 w-full max-w-full sm:max-w-[600px]">
            {result && <EVMResult {...result} />}
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1170px] mx-auto px-2 sm:px-6 mt-8 sm:mt-10">
          <EVMInfo />
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

export default EVMCalculator;
