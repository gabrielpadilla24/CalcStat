import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import CriticalPointsInput from "./components/CriticalPointsInput";
import CriticalPointsGraph from "./components/CriticalPointsGraph";
import CriticalPointsResult from "./components/CriticalPointsResult";

type AbsoluteExtrema = {
  max: string | null;
  min: string | null;
};

const CriticalPointsCalculator = () => {
  const [original, setOriginal] = useState("");
  const [firstDerivative, setFirstDerivative] = useState("");
  const [secondDerivative, setSecondDerivative] = useState("");
  const [criticalPoints, setCriticalPoints] = useState<string[]>([]);
  const [classification, setClassification] = useState<string>("");
  const [absoluteExtrema, setAbsoluteExtrema] = useState<AbsoluteExtrema>({
    max: null,
    min: null,
  });

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Critical Points / Extrema
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0 flex flex-col items-center gap-6">
            <div className="w-full">
              <CriticalPointsInput
                onResult={(
                  orig: string,
                  fprime: string,
                  fsecond: string,
                  crits: string[],
                  secondDerivClass: string,
                  extrema: AbsoluteExtrema
                ) => {
                  setOriginal(orig);
                  setFirstDerivative(fprime);
                  setSecondDerivative(fsecond);
                  setCriticalPoints(crits);
                  setClassification(secondDerivClass);
                  setAbsoluteExtrema(extrema);
                }}
              />
            </div>

            {/* Gráfico */}
            <div className="w-full">
              <CriticalPointsGraph
                latex={original}
                firstDerivativeLatex={firstDerivative}
                secondDerivativeLatex={secondDerivative}
                absoluteExtrema={absoluteExtrema}
                height={400} // responsive baseline
              />
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0">
            <CriticalPointsResult
              original={original}
              firstDerivative={firstDerivative}
              secondDerivative={secondDerivative}
              criticalPoints={criticalPoints}
              classification={classification}
              absoluteExtrema={absoluteExtrema}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default CriticalPointsCalculator;
