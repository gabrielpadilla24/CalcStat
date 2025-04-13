import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import IRRForm from "./components/IRRForm";
import IRRChart from "./components/IRRChart";

type IRRResponse = {
  irr: number;
  cashFlows: number[];
  discountRates: number[];
  npvs: number[];
};

const IRRCalculator = () => {
  const [result, setResult] = useState<IRRResponse | null>(null);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Internal Rate of Return Calculator
        </h1>

        {/* CENTERED FLEX CONTAINER */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-4 px-6">
          {/* FORM */}
          <div className="flex-1 max-w-[500px]">
            <IRRForm onResult={setResult} />
          </div>

          {/* CHART */}
          <div className="flex-1 max-w-[750px]">
            <IRRChart
              irr={result?.irr ?? 0}
              discountRates={result?.discountRates ?? []}
              npvs={result?.npvs ?? []}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default IRRCalculator;
