"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import PoissonInput from "./components/PoissonInput";

const PoissonCalculator = () => {
  const [result, setResult] = useState<any | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Poisson Distribution Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          {/* INPUT */}
          <div className="flex-1 max-w-[500px]">
            <PoissonInput onResult={setResult} />
          </div>

          {/* RESULT (por ahora vacío, se añadirá luego) */}
          <div className="flex-1 max-w-[600px]">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
              <p className="text-gray-500">Results will appear here.</p>
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

export default PoissonCalculator;
