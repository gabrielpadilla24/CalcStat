"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DeterminantInput from "../Determinant/components/DeterminantInput"; // se puede reusar
import InverseResult from "./components/InverseResult"; // 👈 importar

type InverseResponse = {
  matrix: number[][];
  inverse?: string[][]; // 👈 el backend devuelve strings con format_number
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
            <DeterminantInput onResult={setResult} />
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
          </div>
        </div>
      </div>
      <BottomCTA buttonText="Back to Linear Algebra" href="/linear-algebra" />
    </>
  );
};

export default InverseCalculator;
