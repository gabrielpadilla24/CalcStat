"use client";

import LinearSystemInput, { EqRow } from "@/components/LinearSystemInput";

type EqSystemResponse = {
  equations?: EqRow[]; // si tu backend ya devuelve 'equations'
  received_equations?: EqRow[]; // o si viene como 'received_equations'
  latex?: string; // matriz en LaTeX (A o [A|b])
};

const EqSystemInput = ({
  onResult,
}: {
  onResult: (result: { equations: EqRow[]; latex?: string }) => void;
}) => (
  <LinearSystemInput<EqSystemResponse>
    label="Enter your system of equations"
    endpoint="http://localhost:8000/eqsystem"
    buttonText="Calculate System"
    onSuccess={(data) =>
      onResult({
        equations: data.equations ?? data.received_equations ?? [],
        latex: data.latex ?? "",
      })
    }
  />
);

export default EqSystemInput;
