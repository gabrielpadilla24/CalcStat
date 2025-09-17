import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import GrowthComparisonForm from "./components/GrowthComparisonForm";
import GrowthComparisonChart from "./components/GrowthComparisonChart";
import GrowthComparisonInfo from "./components/GrowthComparisonInfo";

type GrowthComparisonResponse = {
  finalValues: number[];
  interestRates: number[];
  timeline: number[];
  valoresPorTasa: number[][];
};

const GrowthComparisonCalculator = () => {
  const [result, setResult] = useState<GrowthComparisonResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Growth Comparison Calculator
        </h1>

        {/* Layout principal */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8">
          {/* FORM (más angosto) */}
          <div className="w-full lg:w-1/3">
            <GrowthComparisonForm onResult={setResult} />
          </div>

          {/* CHART (más ancho) */}
          <div className="w-full lg:w-2/3">
            <GrowthComparisonChart
              timeline={result?.timeline ?? []}
              valoresPorTasa={result?.valoresPorTasa ?? []}
              interestRates={result?.interestRates ?? []}
            />
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-12">
          <GrowthComparisonInfo />
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default GrowthComparisonCalculator;
