"use client";

import { useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import BlackScholesInput from "./components/BlackScholesInput";
import BlackScholesResult, {
  BlackScholesResponse,
} from "./components/BlackScholesResult";
// import BlackScholesInfo from "./components/BlackScholesInfo";

export default function BlackScholesCalculator() {
  const [result, setResult] = useState<BlackScholesResponse | null>(null);

  // 👉 referencia a la sección de Info
  const infoRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Black–Scholes PDE Calculator
        </h1>

        {/* Grid principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="flex-1 max-w-[600px]">
            <BlackScholesInput onResult={setResult} infoRef={infoRef} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-[600px]">
            <BlackScholesResult result={result} />
          </div>
        </div>

        {/* Info Section */}
        <div ref={infoRef} id="blackscholes-info">
          {/* <BlackScholesInfo /> */}
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
}
