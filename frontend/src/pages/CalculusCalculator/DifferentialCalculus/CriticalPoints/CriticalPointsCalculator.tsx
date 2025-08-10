// src/pages/calculus/CriticalPointsCalculator.tsx
import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import CriticalPointsInput from "./components/CriticalPointsInput";
import CriticalPointsGraph from "./components/CriticalPointsGraph"; // 👉 placeholder: crea este componente
import CriticalPointsResult from "./components/CriticalPointsResult"; // 👉 placeholder: crea este componente

type AbsoluteExtrema = {
  max: string | null;
  min: string | null;
};

const CriticalPointsCalculator = () => {
  const [original, setOriginal] = useState("");
  const [firstDerivative, setFirstDerivative] = useState("");
  const [secondDerivative, setSecondDerivative] = useState("");
  const [criticalPoints, setCriticalPoints] = useState<string[]>([]);
  const [inflectionPoints, setInflectionPoints] = useState<string[]>([]);
  const [classification, setClassification] = useState<string>("");
  const [absoluteExtrema, setAbsoluteExtrema] = useState<AbsoluteExtrema>({
    max: null,
    min: null,
  });

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Critical Points / Extrema
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">
              <CriticalPointsInput
                onResult={(
                  orig: string,
                  fprime: string,
                  fsecond: string,
                  crits: string[],
                  infls: string[],
                  secondDerivClass: string,
                  extrema: AbsoluteExtrema
                ) => {
                  setOriginal(orig);
                  setFirstDerivative(fprime);
                  setSecondDerivative(fsecond);
                  setCriticalPoints(crits);
                  setInflectionPoints(infls);
                  setClassification(secondDerivClass);
                  setAbsoluteExtrema(extrema);
                }}
              />
            </div>

            {/* 👉 Solo invocamos el gráfico; puede mostrar vacío si aún no hay data */}
            <div className="w-full">
              <CriticalPointsGraph
                expression={original}
                firstDerivative={firstDerivative}
                secondDerivative={secondDerivative}
                criticalPoints={criticalPoints}
                inflectionPoints={inflectionPoints}
              />
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <CriticalPointsResult
              original={original}
              firstDerivative={firstDerivative}
              secondDerivative={secondDerivative}
              criticalPoints={criticalPoints}
              inflectionPoints={inflectionPoints}
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
