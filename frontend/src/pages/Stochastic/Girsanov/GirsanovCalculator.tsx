"use client";

import { useRef, useState } from "react";
import GirsanovInput from "./components/GirsanovInput";
import GirsanovResult from "./components/GirsanovResult";
import GirsanovInfo from "./components/GirsanovInfo";

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
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        📈 Girsanov’s Theorem Tool
      </h1>

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
        {/* Input */}
        <div className="flex-1 max-w-[600px]">
          <GirsanovInput onResult={setResult} infoRef={infoRef} />
        </div>

        {/* Result */}
        <div className="flex-1 max-w-[600px]">
          <GirsanovResult result={result || undefined} />
        </div>
      </div>

      {/* Info section */}
      <div ref={infoRef} className="mt-16">
        <GirsanovInfo />
      </div>
    </div>
  );
}
