"use client";

import { useRef, useState } from "react";
import GirsanovInput from "./components/GirsanovInput";
import GirsanovResult from "./components/GirsanovResult";
import GirsanovInfo from "./components/GirsanovInfo";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

type GirsanovData = {
  mu: number;
  mu_tilde: number;
  sigma: number;
  T?: number;
  N?: number;
  M?: number;
  mode: "analytical" | "montecarlo";
};

type GirsanovResponse = {
  mode: string;
  params: GirsanovData;
  theta?: number;
  process_P?: string;
  process_Q?: string;
  radon_nikodym?: string;
  steps?: string[];
  error?: string;
};

export default function GirsanovCalculator() {
  const [result, setResult] = useState<GirsanovResponse | null>(null);
  const infoRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          📈 Girsanov’s Theorem Tool
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start">
          {/* Input */}
          <div className="w-full max-w-sm lg:w-1/3">
            <GirsanovInput onResult={setResult} infoRef={infoRef} />
          </div>

          {/* Result */}
          <div className="w-full max-w-3xl mt-8 lg:mt-0">
            <GirsanovResult result={result || undefined} />
          </div>
        </div>

        {/* Info section */}
        <div ref={infoRef} className="mt-6 max-w-[1230px] mx-auto px-4 sm:px-6">
          <GirsanovInfo />
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
}
