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

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Limits Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">
              <LimitsInput
                onResult={(orig, lim, fx) => {
                  setOriginal(orig);
                  setLimit(lim);
                  setFunc(fx); // guardamos la función pura
                }}
              />
            </div>

            <div className="w-full">
              <LimitsGraph latex={func} limitLatex={limit} />
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <LimitsResult original={original} limit={limit} />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
}
