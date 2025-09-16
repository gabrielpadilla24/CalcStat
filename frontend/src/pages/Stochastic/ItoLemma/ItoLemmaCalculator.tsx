"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import ItoLemmaInput from "./components/ItoLemmaInput";
import ItoLemmaResult from "./components/ItoLemmaResult";
import ItoLemmaInfo from "./components/ItoLemmaInfo";

type ItoLemmaData = {
  f: string;
  mu: string;
  sigma: string;
};

type ItoLemmaResponse = {
  params: ItoLemmaData;
  partials: { f_t: string; f_x: string; f_xx: string };
  drift: string;
  diffusion: string;
  final: string;
  steps: string[];
};

const ItoLemmaCalculator = () => {
  const [result, setResult] = useState<ItoLemmaResponse | undefined>(undefined);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Itô’s Lemma Calculator
        </h1>

        {/* Inputs + Result */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* Input form */}
          <div className="w-full lg:w-1/3 max-w-md">
            <ItoLemmaInput onResult={setResult} />
          </div>

          {/* Result */}
          <div className="flex-1 max-w-xl">
            <ItoLemmaResult result={result} />
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-[1100px] mx-auto px-6 mt-6">
          <ItoLemmaInfo />
        </div>
      </div>

      <BottomCTA
        buttonText="Back to Stochastic Calculus"
        href="/stochastic-calculus"
      />
    </>
  );
};

export default ItoLemmaCalculator;
