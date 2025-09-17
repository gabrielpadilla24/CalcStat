import { useState, useRef, useEffect } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import SavingsForm from "./components/SavingsForm";
import SavingsChart from "./components/SavingsChart";
import SavingsInfo from "./components/SavingsInfo";

type SavingsResult = {
  contribution: number;
  valores: number[];
  aportes: number[];
};

const SavingsCalculator = () => {
  const [result, setResult] = useState<SavingsResult | null>(null);

  // 👉 Sync chart height with form only for desktops
  const formRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current && window.innerWidth >= 1024) {
        // only set equal height on lg screens
        setFormHeight(formRef.current.offsetHeight);
      } else {
        setFormHeight(null); // let it auto-size on smaller devices
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [result]);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Savings Goal Calculator
        </h1>

        {/* Responsive layout */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 px-4">
          {/* FORM */}
          <div ref={formRef} className="w-full max-w-[500px]">
            <SavingsForm onResult={setResult} />
          </div>

          {/* CHART */}
          <div
            className="w-full max-w-[750px]"
            style={{ height: formHeight ? `${formHeight}px` : "auto" }}
          >
            <SavingsChart
              valores={result?.valores ?? []}
              aportes={result?.aportes ?? []}
              goal={
                result?.valores?.length
                  ? result.valores[result.valores.length - 1]
                  : 0
              }
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-4">
          <SavingsInfo />
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default SavingsCalculator;
