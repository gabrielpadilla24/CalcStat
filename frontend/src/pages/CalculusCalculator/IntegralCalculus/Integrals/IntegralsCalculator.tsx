"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import IntegralsInput from "./components/IntegralsInput";
// import IntegralsGraph from "./components/IntegralsGraph";
// import IntegralsResult from "./components/IntegralsResult";

const IntegralsCalculator = () => {
  const [original, setOriginal] = useState("");
  const [integral, setIntegral] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [tipo, setTipo] = useState<string | undefined>(undefined);
  const [originalLatex, setOriginalLatex] = useState("");
  const [integralLatex, setIntegralLatex] = useState("");

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Integrals Calculator
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
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
                  setSteps(pasos || []);
                  setTipo(tipoCalc);
                  setOriginalLatex(exprLatex || "");
                  setIntegralLatex(integLatex || "");
                }}
              />
            </div>

            {/* 👉 Gráfico (si tienes componente) */}
            {/* <div className="w-full mt-6">
              <IntegralsGraph
                expressionLatex={originalLatex}
                integralLatex={integralLatex}
              />
            </div> */}
          </div>

          {/* Columna derecha: Resultados (si tienes componente) */}
          <div className="flex-1 w-full max-w-[600px]">
            {/* <IntegralsResult
              original={original}
              integral={integral}
              steps={steps}
              tipo={tipo}
              originalLatex={originalLatex}
              integralLatex={integralLatex}
            /> */}

            {/* Placeholder simple si aún no tienes componente: */}
            <div className="bg-white rounded-xl shadow p-5 border">
              <h3 className="font-semibold mb-2">Result</h3>
              {integral ? (
                <>
                  <p className="mb-1">
                    <strong>Original:</strong> {original}
                  </p>
                  <p className="mb-1">
                    <strong>Integral:</strong> {integral}
                  </p>
                  {tipo && (
                    <p className="mb-1">
                      <strong>Type:</strong> {tipo}
                    </p>
                  )}
                  {!!steps.length && (
                    <div className="mt-2">
                      <p className="font-medium">Steps:</p>
                      <ol className="list-decimal ml-5">
                        {steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500">
                  Run a calculation to see results.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default IntegralsCalculator;
