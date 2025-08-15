// src/pages/CalculusCalculator/ImplicitDifferentiation/ImplicitDiffCalculator.tsx
import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import ImplicitDiffInput from "./components/ImplicitDiffInput";
// import ImplicitDiffGraph from "./components/ImplicitDiffGraph"; // ← opcional, cuando esté listo
import ImplicitDiffResult from "./components/ImplicitDiffResult";

const ImplicitDiffCalculator = () => {
  const [original, setOriginal] = useState<string>("");
  const [implicit, setImplicit] = useState<string>("");
  const [steps, setSteps] = useState<string[] | undefined>();

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Implicit Differentiation Calculator
        </h1>

        {/* Contenedor principal (idéntico al de Derivatives) */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">
              <ImplicitDiffInput
                onResult={(orig: string, dy: string, stepArr?: string[]) => {
                  setOriginal(orig);
                  setImplicit(dy);
                  setSteps(stepArr);
                }}
              />
            </div>

            {/* Gráfico (opcional) */}
            <div className="w-full">
              {/* <ImplicitDiffGraph equation={original} implicit={implicit} /> */}
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <ImplicitDiffResult
              original={original}
              implicit={implicit}
              steps={steps}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default ImplicitDiffCalculator;
