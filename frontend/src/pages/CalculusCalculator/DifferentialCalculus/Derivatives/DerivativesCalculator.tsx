import { useState } from "react";
import DerivativesInput from "./components/DerivativesInput";
import DerivativesResult from "./components/DerivativesResult";

const DerivativesCalculator = () => {
  const [expression, setExpression] = useState("");
  const [derivative, setDerivative] = useState("");

  return (
    <>
      <DerivativesInput
        onResult={(exp: string, der: string) => {
          setExpression(exp);
          setDerivative(der);
        }}
      />
      <DerivativesResult expression={expression} derivative={derivative} />
    </>
  );
};

export default DerivativesCalculator;
