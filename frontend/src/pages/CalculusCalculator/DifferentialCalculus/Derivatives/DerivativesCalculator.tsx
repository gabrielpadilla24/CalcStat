import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DerivativesInput from "./components/DerivativesInput";
import DerivativesResult from "./components/DerivativesResult";

const DerivativesCalculator = () => {
  const [expression, setExpression] = useState("");
  const [derivative, setDerivative] = useState("");
  const [steps, setSteps] = useState<string[] | undefined>(undefined);
  const [rule, setRule] = useState<string | undefined>(undefined); // 👈 nuevo

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Derivatives Calculator
        </h1>

        {/* Input and Result */}
        <DerivativesInput
          onResult={(
            exp: string,
            der: string,
            stepArr?: string[],
            tipo?: string
          ) => {
            setExpression(exp);
            setDerivative(der);
            setSteps(stepArr);
            setRule(tipo); // 👈 capturamos la regla
          }}
        />
        <DerivativesResult
          expression={expression}
          derivative={derivative}
          steps={steps}
          rule={rule} // 👈 se la pasamos al componente de resultado
        />
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default DerivativesCalculator;
