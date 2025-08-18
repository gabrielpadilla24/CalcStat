"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import IntegralsInput from "./components/IntegralsInput";
// import IntegralsGraph from "./components/IntegralsGraph";
import IntegralsResult from "./components/IntegralsResult";

const IntegralsCalculator = () => {
  const [original, setOriginal] = useState("");
  const [integral, setIntegral] = useState("");
  const [steps, setSteps] = useState<string[] | undefined>(undefined);
  const [tipo, setTipo] = useState<string | undefined>(undefined);
  const [originalLatex, setOriginalLatex] = useState<string | undefined>(
    undefined
  );
  const [integralLatex, setIntegralLatex] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Integrals Calculator
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + (opcional) Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">
              <IntegralsInput
                onResult={(
                  expr,
                  integ,
                  pasos,
                  tipoCalc,
                  exprLatex,
                  integLatex
                ) => {
                  setOriginal(expr);
                  setIntegral(integ);
                  setSteps(pasos);
                  setTipo(tipoCalc);
                  setOriginalLatex(exprLatex);
                  setIntegralLatex(integLatex);
                }}
              />
            </div>

            {/* Gráfico (si luego lo agregas) */}
            {/* <div className="w-full mt-6">
              <IntegralsGraph
                expressionLatex={originalLatex}
                integralLatex={integralLatex}
              />
            </div> */}
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <IntegralsResult
              original={original}
              integral={integral}
              steps={steps}
              tipo={tipo}
              originalLatex={originalLatex}
              integralLatex={integralLatex}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default IntegralsCalculator;
