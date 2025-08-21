"use client";

import LinearSystemInput, { EqRow } from "@/components/LinearSystemInput";

type EqSystemResponse = {
  equations?: EqRow[];
  received_equations?: EqRow[];
  coeffmatrix?: string; // [A|b] LaTeX
  status?: string; // "Success" | "No unique solution"
  solution?: Record<string, number>;
  solution_latex?: string; // LaTeX del vector solución
  variables?: string[];
};

const EqSystemInput = ({
  onResult,
}: {
  onResult: (result: {
    equations: EqRow[];
    coeffmatrix?: string;
    status?: string;
    solution?: Record<string, number>;
    solution_latex?: string;
    variables?: string[];
  }) => void;
}) => (
  <LinearSystemInput<EqSystemResponse>
    label="Enter your system of equations"
    endpoint="http://localhost:8000/eqsystem"
    buttonText="Calculate System"
    onSuccess={(data) =>
      onResult({
        equations: data.equations ?? data.received_equations ?? [],
        coeffmatrix: data.coeffmatrix ?? "",
        status: data.status,
        solution: data.solution,
        solution_latex: data.solution_latex,
        variables: data.variables,
      })
    }
  />
);

export default EqSystemInput;
