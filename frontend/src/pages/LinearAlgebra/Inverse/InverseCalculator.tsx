"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import InverseInput from "./components/InverseInput";
import InverseResult from "./components/InverseResult";
import InverseInfo from "./components/InverseInfo"; // 👈 importar la tarjeta educativa

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
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Matrix Inverse Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="flex-1 max-w-[600px]">
            <InverseInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-[600px]">
            <InverseResult
              matrix={result?.matrix}
              inverse={result?.inverse}
              latex={result?.latex}
              error={result?.error}
              explanation={result?.explanation}
            />

            {/* Card educativa 👇 */}
            <InverseInfo />
          </div>
        </div>
      </div>
      <BottomCTA buttonText="Back to Linear Algebra" href="/linearalgebra" />
    </>
  );
};

export default InverseCalculator;
