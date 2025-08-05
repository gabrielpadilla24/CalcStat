import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DerivativesInput from "./components/DerivativesInput";
import DerivativesResult from "./components/DerivativesResult";

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

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Derivatives Calculator
        </h1>

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

        <DerivativesResult
          expression={expression}
          expressionLatex={expressionLatex}
          derivative={derivative}
          derivativeLatex={derivativeLatex}
          steps={steps}
          rule={rule}
        />
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default DerivativesCalculator;
