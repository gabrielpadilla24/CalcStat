"use client";

import LinearSystemInput, { EqRow } from "@/components/LinearSystemInput";

type EqSystemResponse = {
  equations?: EqRow[]; // si tu backend ya devuelve 'equations'
  received_equations?: EqRow[]; // o si viene como 'received_equations'
  coeffmatrix?: string; // matriz en LaTeX (A o [A|b])
};

const EqSystemInput = ({
  onResult,
}: {
  onResult: (result: { equations: EqRow[]; coeffmatrix?: string }) => void;
}) => (
  <LinearSystemInput<EqSystemResponse>
    label="Enter your system of equations"
    endpoint="http://localhost:8000/eqsystem"
    buttonText="Calculate System"
    onSuccess={(data) =>
      onResult({
        equations: data.equations ?? data.received_equations ?? [],
        coeffmatrix: data.coeffmatrix ?? "",
      })
    }
  />
);

export default EqSystemInput;
