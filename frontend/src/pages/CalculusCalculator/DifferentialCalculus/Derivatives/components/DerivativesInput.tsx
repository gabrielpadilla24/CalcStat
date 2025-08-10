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
  <MathFunctionInput<DerivativesResponse>
    label="Enter a function to differentiate:"
    endpoint="http://localhost:8000/derivatives"
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
);

export default DerivativesInput;
