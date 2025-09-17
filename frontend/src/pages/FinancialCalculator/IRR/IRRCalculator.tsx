import { useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import IRRForm from "./components/IRRForm";
import IRRChart from "./components/IRRChart";
import IRRInfo from "./components/IRRInfo";

type IRRResponse = {
  irr: number;
  cashFlows: number[];
  discountRates: number[];
  npvs: number[];
};

const IRRCalculator = () => {
  const [result, setResult] = useState<IRRResponse | null>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleScrollToInfo = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Internal Rate of Return Calculator
        </h1>

        {/* Layout principal */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8">
          {/* FORM (más angosto) */}
          <div className="w-full lg:w-1/3">
            <IRRForm onResult={setResult} onLearnMore={handleScrollToInfo} />
          </div>

          {/* CHART (más ancho) */}
          <div className="w-full lg:w-2/3">
            <IRRChart
              irr={result?.irr ?? 0}
              discountRates={result?.discountRates ?? []}
              npvs={result?.npvs ?? []}
            />
          </div>
        </div>

        {/* INFO SECTION */}
        <div ref={infoRef} className="mt-12">
          <IRRInfo />
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default IRRCalculator;
