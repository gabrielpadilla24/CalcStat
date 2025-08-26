"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import BinomialInput from "./components/BinomialInput";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type BinomialParams = {
  n: number;
  p: number;
  query: ProbabilityQuery;
};

const BinomialCalculator = () => {
  const [params, setParams] = useState<BinomialParams | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Binomial Distribution Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px]">
            <BinomialInput onChange={setParams} />
          </div>

          {/* RESULT (placeholder) */}
          <div className="flex-1 max-w-[600px]">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              {!params ? (
                <p className="text-gray-500 text-center">
                  No distribution selected yet.
                </p>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Input Preview</h2>
                  <p>
                    <strong>n:</strong> {params.n}
                  </p>
                  <p>
                    <strong>p:</strong> {params.p}
                  </p>
                  <p>
                    <strong>Query:</strong>{" "}
                    {params.query.kind === "equal" &&
                      `P(X = ${params.query.k})`}
                    {params.query.kind === "leq" && `P(X ≤ ${params.query.k})`}
                    {params.query.kind === "geq" && `P(X ≥ ${params.query.k})`}
                    {params.query.kind === "between" &&
                      `P(${params.query.a} ≤ X ≤ ${params.query.b})`}
                  </p>
                </div>
              )}
            </div>
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

export default BinomialCalculator;
