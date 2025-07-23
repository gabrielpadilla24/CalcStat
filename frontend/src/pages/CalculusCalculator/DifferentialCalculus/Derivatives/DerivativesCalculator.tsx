import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DerivativesInput from "./components/DerivativesInput";
import DerivativesResult from "./components/DerivativesResult";

const DerivativesCalculator = () => {
  const [expression, setExpression] = useState("");
  const [derivative, setDerivative] = useState("");

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Derivatives Calculator
        </h1>

        {/* Input and Result */}
        <DerivativesInput
          onResult={(exp: string, der: string) => {
            setExpression(exp);
            setDerivative(der);
          }}
        />
        <DerivativesResult expression={expression} derivative={derivative} />
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default DerivativesCalculator;
