// src/pages/CalculusCalculator/DifferentialCalculus/ImplicitDiff/ImplicitDiffCalculator.tsx
//import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const ImplicitDiffCalculator = () => {
  // 👉 Estado placeholder (ajústalo cuando conectes el backend)
  //   const [equation, setEquation] = useState<string>("");     // F(x, y) = 0
  //   const [dydx, setDydx] = useState<string>("");             // dy/dx result (LaTeX o texto)
  //   const [steps, setSteps] = useState<string[] | undefined>(); // pasos opcionales

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Implicit Differentiation Calculator
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center lg:self-start">
            <div className="w-full">
              {/* TODO: ⬇️ Conecta tu componente de entrada
                  <ImplicitDiffInput
                    onResult={(eq, dy, stepArr) => {
                      setEquation(eq);
                      setDydx(dy);
                      setSteps(stepArr);
                    }}
                  />
              */}
            </div>

            <div className="w-full">
              {/* TODO: ⬇️ Conecta tu componente de gráfica (opcional)
                  <ImplicitDiffGraph equation={equation} />
              */}
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px] lg:self-start">
            {/* TODO: ⬇️ Conecta tu componente de resultados
                <ImplicitDiffResult
                  equation={equation}
                  dydx={dydx}
                  steps={steps}
                />
            */}
            {/* Placeholder visible mientras conectas */}
            <div className="bg-white shadow-md rounded-xl p-6 text-gray-700">
              <h2 className="text-2xl font-bold mb-4">Result</h2>
              <p className="text-gray-500 italic">
                Enter an implicit equation F(x, y) = 0 on the left to compute
                dy/dx.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default ImplicitDiffCalculator;
