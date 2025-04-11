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

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Internal Rate of Return Calculator
        </h1>

        <div className="flex flex-col items-center gap-12">
          <IRRForm onResult={setResult} />

          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-5xl mx-auto">
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
