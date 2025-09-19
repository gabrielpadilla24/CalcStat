import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import LimitsInput from "./components/LimitsInput";
import LimitsResult from "./components/LimitsResult";
import LimitsGraph from "./components/LimitsGraph";

export default function LimitsCalculator() {
  // LaTeX devuelto por el backend
  const [original, setOriginal] = useState<string>(""); // \lim_{x\to\infty}(...)
  const [limit, setLimit] = useState<string>(""); // valor del límite en LaTeX
  const [func, setFunc] = useState<string>(""); // función pura (sin notación de límite)

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Limits Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-6 px-4 sm:px-6 lg:px-8">
          {/* Left column: Input */}
          <div className="w-full">
            <LimitsInput
              onResult={(orig, lim, fx) => {
                setOriginal(orig);
                setLimit(lim);
                setFunc(fx);
              }}
            />
          </div>

          {/* Right column: Result */}
          <div className="w-full">
            <LimitsResult original={original} limit={limit} />
          </div>
        </div>

        {/* Graph centered below */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-[1250px]">
            <LimitsGraph latex={func} limitLatex={limit} />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
}
