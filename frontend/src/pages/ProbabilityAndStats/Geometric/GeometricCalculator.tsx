"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import GeometricInput from "./components/GeometricInput";
import GeometricResult from "./components/GeometricResult";
//import GeometricInfo from "./components/GeometricInfo";

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

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center items-stretch">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px]">
            <GeometricInput onResult={setResult} />
          </div>

          {/* RESULT */}
          <div className="flex-1 max-w-[600px]">
            <GeometricResult result={result} />
          </div>
        </div>

        {/* 🔹 Info Card abajo ocupando todo el ancho */}
        <div className="max-w-[1220px] mx-auto px-6 mt-10">
          {/* <GeometricInfo /> */}
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
