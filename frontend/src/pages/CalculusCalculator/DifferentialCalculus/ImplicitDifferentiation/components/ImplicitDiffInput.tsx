// src/pages/CalculusCalculator/ImplicitDifferentiation/components/ImplicitDiffInput.tsx
import MathFunctionInput from "@/components/MathFunctionInput";

type ImplicitDiffResponse = {
  original: string; // ← coincide con el backend
  implicit: string; // ← coincide con el backend
  steps?: string[];
  // Si en el futuro devuelves KaTeX/LaTeX, puedes añadir:
  // original_latex?: string;
  // implicit_latex?: string;
};

const ImplicitDiffInput = ({
  onResult,
}: {
  onResult: (original: string, implicit: string, steps?: string[]) => void;
}) => (
  <MathFunctionInput<ImplicitDiffResponse>
    label="Enter an equation for implicit differentiation (dy/dx):"
    endpoint="/implicitdiff"
    payloadKey="equation"
    buttonText="Calculate Implicit Derivative"
    onSuccess={(data) => {
      // steps puede venir undefined; pasamos siempre un array si prefieres:
      onResult(data.original, data.implicit, data.steps);
    }}
  />
);

export default ImplicitDiffInput;
