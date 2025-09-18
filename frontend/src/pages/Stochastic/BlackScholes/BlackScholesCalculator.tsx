"use client";

import { useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import BlackScholesInput from "./components/BlackScholesInput";
import BlackScholesResult, {
  BlackScholesResponse,
} from "./components/BlackScholesResult";
import BlackScholesInfo from "./components/BlackScholesInfo";

export default function BlackScholesCalculator() {
  const [result, setResult] = useState<BlackScholesResponse | null>(null);

  // 👉 reference to the Info section
  const infoRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Black–Scholes PDE Calculator
        </h1>

        {/* Main Container */}
        <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start">
          {/* Input */}
          <div className="w-full lg:w-1/3 max-w-md">
            <BlackScholesInput onResult={setResult} infoRef={infoRef} />
          </div>

          {/* Result */}
          <div className="w-full lg:flex-1 mt-8 lg:mt-0">
            <BlackScholesResult result={result} />
          </div>
        </div>

        {/* Info Section */}
        <div
          ref={infoRef}
          id="blackscholes-info"
          className="w-full max-w-[1230px] mx-auto px-4 sm:px-6 mt-8"
        >
          <BlackScholesInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
}
