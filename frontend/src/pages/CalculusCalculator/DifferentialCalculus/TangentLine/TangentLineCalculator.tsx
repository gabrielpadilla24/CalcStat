import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import TangentLineInput from "./components/TangentLineInput";
// import TangentLineGraph from "./components/TangentLineGraph";
import TangentLineResult from "./components/TangentLineResult";

const TangentLineCalculator = () => {
  const [original, setOriginal] = useState<string>("");
  const [derivative, setDerivative] = useState<string>(""); // f'(x) LaTeX
  const [fxTangentStr, setFxTangentStr] = useState<string>(""); // "y = ..." LaTeX

  // 👉 Tipos estrictos: usamos NaN como valor “no inicializado” (sigue siendo number)
  const [x0, setX0] = useState<number>(NaN);
  const [m, setM] = useState<number>(NaN);
  const [y0, setY0] = useState<number>(NaN);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Tangent Line Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
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

            {/* Gráfico (opcional) */}
            <div className="w-full">
              {/* <TangentLineGraph expression={original} tangent={fxTangentStr} pointX={x0} /> */}
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
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
