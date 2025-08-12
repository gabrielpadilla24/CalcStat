import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import TangentLineInput from "./components/TangentLineInput";
//import TangentLineGraph from "./components/TangentLineGraph"; // <- crea este
import TangentLineResult from "./components/TangentLineResult"; // <- y este

const TangentLineCalculator = () => {
  const [original, setOriginal] = useState<string>("");
  const [tangent, setTangent] = useState<string>(""); // fxTangent (recta)
  const [derivative, setDerivative] = useState<string>(""); // f'(x)
  const [my, setMy] = useState<string>(""); // info extra (p.ej. m,y0)

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Tangent Line Calculator
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">
              <TangentLineInput
                onResult={(orig, fxTangent, der, myInfo) => {
                  setOriginal(orig);
                  setTangent(fxTangent);
                  setDerivative(der);
                  setMy(myInfo);
                }}
              />
            </div>

            {/* Gráfico (muestra vacío si aún no hay datos) */}
            <div className="w-full">
              {/* <TangentLineGraph expression={original} tangent={tangent} /> */}
            </div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            <TangentLineResult
              original={original}
              derivative={derivative}
              tangent={tangent}
              my={my}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default TangentLineCalculator;
