"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import RegressionInput from "./components/RegressionInput";
import RegressionResult from "./components/RegressionResult";

type RegressionResponse = {
  coefficients: Record<string, number>;
  stderr: Record<string, number>;
  tvalues: Record<string, number>;
  pvalues: Record<string, number>;
  r2: number;
  r2_adj: number;
  fstat?: number;
  f_pvalue?: number;
  equation_latex: string;
  error?: string;
};

export default function RegressionCalculator() {
  const [result, setResult] = useState<RegressionResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Linear Regression Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input */}
          <div className="flex-1 max-w-[500px]">
            <RegressionInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-[600px]">
            {result && <RegressionResult {...result} />}
          </div>
        </div>

        {/* 👉 Aquí después podemos añadir RegressionGraph y RegressionInfo */}
      </div>

      <BottomCTA
        buttonText="Back to Probability & Statistics"
        href="/probabilityandstats"
      />
    </>
  );
}
