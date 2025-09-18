import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import TangentLineInput from "./components/TangentLineInput";
import TangentLineGraph from "./components/TangentLineGraph";
import TangentLineResult from "./components/TangentLineResult";

const TangentLineCalculator = () => {
  const [original, setOriginal] = useState<string>("");
  const [derivative, setDerivative] = useState<string>("");
  const [fxTangentStr, setFxTangentStr] = useState<string>("");

  const [x0, setX0] = useState<number>(NaN);
  const [m, setM] = useState<number>(NaN);
  const [y0, setY0] = useState<number>(NaN);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Tangent Line Calculator
        </h1>

        {/* Main container */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-center gap-8">
          {/* Left column: Input + Graph */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0 flex flex-col items-center">
            <div className="w-full">
              <TangentLineInput
                onResult={(orig, x0Val, fxTangent, der, mVal, y0Val) => {
                  setOriginal(orig);
                  setDerivative(der);
                  setFxTangentStr(fxTangent);
                  setX0(x0Val);
                  setM(mVal);
                  setY0(y0Val);
                }}
              />
            </div>

            {/* Graph */}
            <div className="w-full mt-6">
              <TangentLineGraph
                latex={original}
                tangentLatex={fxTangentStr}
                x0={x0}
                y0={y0}
                // Responsive height: smaller on mobile, larger on desktop
                height={
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 300
                    : 500
                }
              />
            </div>
          </div>

          {/* Right column: Result */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0 mt-8 lg:mt-0">
            <TangentLineResult
              original={original}
              derivative={derivative}
              x0={x0}
              m={m}
              y0={y0}
              fxTangent={fxTangentStr}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default TangentLineCalculator;
