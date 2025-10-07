"use client";

import MathFunctionInput from "@/components/MathFunctionInput";

type DerivativesResponse = {
  original?: string;
  derivative?: string;
  steps?: string[];
  tipo?: string;
  original_latex?: string;
  derivative_latex?: string;

  // fallback keys (sometimes backends differ)
  expression?: string;
  result?: string;
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
}) => {
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <MathFunctionInput<DerivativesResponse>
        label="Enter a function to differentiate:"
        endpoint="/derivatives"
        payloadKey="equation"
        buttonText="Calculate Derivative"
        onSuccess={(data) => {
          // map with safe fallbacks
          const expression = data.original ?? data.expression ?? "";
          const derivative = data.derivative ?? data.result ?? "";
          const steps = data.steps ?? [];
          const rule = data.tipo ?? undefined;
          const expressionLatex = data.original_latex ?? undefined;
          const derivativeLatex = data.derivative_latex ?? undefined;

          // debug in console (useful on Vercel)
          console.log("🧮 Derivatives API response:", {
            expression,
            derivative,
            steps,
            rule,
            expressionLatex,
            derivativeLatex,
            raw: data,
          });

          onResult(
            expression,
            derivative,
            steps,
            rule,
            expressionLatex,
            derivativeLatex
          );
        }}
      />
    </div>
  );
};

export default DerivativesInput;
