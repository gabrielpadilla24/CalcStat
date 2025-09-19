"use client";

// DerivativesInput.tsx
import MathFunctionInput from "@/components/MathFunctionInput";

type DerivativesResponse = {
  original: string;
  derivative: string;
  steps?: string[];
  tipo?: string;
  original_latex?: string;
  derivative_latex?: string;
};

const DerivativesInput = ({
  onResult,
}: {
  onResult: (
    expression: string,
    derivative: string,
    steps?: string[],
    rule?: string,
    expressionLatex?: string,
    derivativeLatex?: string
  ) => void;
}) => (
  <div className="w-full max-w-[600px] mx-auto">
    <MathFunctionInput<DerivativesResponse>
      label="Enter a function to differentiate:"
      endpoint="/derivatives"
      payloadKey="equation"
      buttonText="Calculate Derivative"
      onSuccess={(data) =>
        onResult(
          data.original,
          data.derivative,
          data.steps,
          data.tipo,
          data.original_latex,
          data.derivative_latex
        )
      }
    />
  </div>
);

export default DerivativesInput;
