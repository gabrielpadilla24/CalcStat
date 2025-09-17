"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import InverseInput from "./components/InverseInput";
import InverseResult from "./components/InverseResult";
import InverseInfo from "./components/InverseInfo";

type InverseResponse = {
  matrix: string[][];
  inverse?: string[][];
  latex?: string;
  error?: string;
  explanation?: string;
};

const InverseCalculator = () => {
  const [result, setResult] = useState<InverseResponse | null>(null);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Matrix Inverse Calculator
        </h1>

        {/* Layout Input + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center items-stretch">
          {/* Input */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px]">
            <InverseInput onResult={setResult} />
          </div>

          {/* Result + Info */}
          <div className="flex-1 w-full max-w-full lg:max-w-[600px] flex flex-col gap-6">
            <InverseResult
              matrix={result?.matrix}
              inverse={result?.inverse}
              latex={result?.latex}
              error={result?.error}
              explanation={result?.explanation}
            />
            <InverseInfo />
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default InverseCalculator;
