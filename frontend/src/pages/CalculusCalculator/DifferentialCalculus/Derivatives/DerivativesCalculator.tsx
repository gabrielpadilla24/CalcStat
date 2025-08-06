import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DerivativesInput from "./components/DerivativesInput";
import DerivativesResult from "./components/DerivativesResult";
import DerivativesGraph from "./components/DerivativesGraph"; // 👈 Asegúrate de importar esto

const DerivativesCalculator = () => {
  const [expression, setExpression] = useState("");
  const [expressionLatex, setExpressionLatex] = useState<string | undefined>();
  const [derivative, setDerivative] = useState("");
  const [derivativeLatex, setDerivativeLatex] = useState<string | undefined>();
  const [steps, setSteps] = useState<string[] | undefined>();
  const [rule, setRule] = useState<string | undefined>();

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Derivatives Calculator
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* 🔹 Columna izquierda: Input + Gráfico */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            {/* Input */}
            <div className="w-full">
              <DerivativesInput
                onResult={(
                  exp: string,
                  der: string,
                  stepArr?: string[],
                  tipo?: string,
                  expLatex?: string,
                  derLatex?: string
                ) => {
                  setExpression(exp);
                  setDerivative(der);
                  setSteps(stepArr);
                  setRule(tipo);
                  setExpressionLatex(expLatex);
                  setDerivativeLatex(derLatex);
                }}
              />
            </div>

            {/* Graph */}
            <div className="w-full">
              <DerivativesGraph />
            </div>
          </div>

          {/* 🔹 Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <DerivativesResult
              expression={expression}
              expressionLatex={expressionLatex}
              derivative={derivative}
              derivativeLatex={derivativeLatex}
              steps={steps}
              rule={rule}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default DerivativesCalculator;
