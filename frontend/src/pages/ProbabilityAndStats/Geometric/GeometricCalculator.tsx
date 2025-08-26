"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import GeometricInput from "./components/GeometricInput";
import GeometricResult from "./components/GeometricResult";
import GeometricGraph from "./components/GeometricGraph";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type GeometricResponse = {
  p: number;
  query: ProbabilityQuery;
  support: number[];
  pmf: number[];
  cdf: number[];
  prob_result: number;
  prob_latex: string;
};

const GeometricCalculator = () => {
  const [result, setResult] = useState<GeometricResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Geometric Distribution Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px] h-[747px]">
            {/* 🔹 Aquí va el callback, igual que en Binomial y Poisson */}
            <GeometricInput onResult={setResult} />
          </div>

          {/* RESULT + GRAPH */}
          <div className="flex-1 max-w-[600px]">
            <GeometricResult result={result} />

            {result && (
              <GeometricGraph
                support={result.support}
                pmf={result.pmf}
                cdf={result.cdf}
                height={400}
              />
            )}
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

export default GeometricCalculator;
