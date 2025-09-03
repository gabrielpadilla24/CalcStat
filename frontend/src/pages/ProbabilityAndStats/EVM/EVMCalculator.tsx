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

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Expected Value, Variance & Moments Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* INPUT */}
          <div className="flex-1 max-w-[600px]">
            <EVMInput onResult={(res) => setResult(res)} />
          </div>

          {/* RESULT */}
          <div className="flex-1 max-w-[600px]">
            {result && <EVMResult {...result} />}
          </div>
        </div>
        <EVMInfo />
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probability-statistics"
      />
    </>
  );
};

export default EVMCalculator;
