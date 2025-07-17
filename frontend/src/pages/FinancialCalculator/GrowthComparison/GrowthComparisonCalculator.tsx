import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import GrowthComparisonForm from "./components/GrowthComparisonForm";
import GrowthComparisonChart from "./components/GrowthComparisonChart";
import GrowthComparisonInfo from "./components/GrowthComparisonInfo"; // Si aún no existe, puedes comentarlo o crearlo

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

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Growth Comparison Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-4 px-6">
          {/* FORM */}
          <div className="flex-1 max-w-[500px]">
            <GrowthComparisonForm onResult={setResult} />
          </div>

          {/* CHART */}
          <div className="flex-1 max-w-[750px]">
            <GrowthComparisonChart
              timeline={result?.timeline ?? []}
              valoresPorTasa={result?.valoresPorTasa ?? []}
              interestRates={result?.interestRates ?? []}
            />
          </div>
        </div>

        {/* INFO SECTION (puede ser opcional o educativa como en Savings) */}
        <div className="mt-10">
          <GrowthComparisonInfo />
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default GrowthComparisonCalculator;
