// src/pages/CalculusCalculator/DifferentialCalculus/TangentLine/components/TangentLineInput.tsx
import { useState } from "react";
import MathFunctionInput from "@/components/MathFunctionInput";

type TangentLineResponse = {
  original: string;
  x0: number; // número
  fxTangent: string; // LaTeX o texto
  derivative: string;
  m: number; // número
  y0: number; // número
};

const TangentLineInput = ({
  onResult,
}: {
  onResult: (
    original: string,
    x0: number,
    fxTangent: string,
    derivative: string,
    m: number,
    y0: number
  ) => void;
}) => {
  const [x0, setX0] = useState<string>("");

  const extraPayload = (() => {
    if (!x0.trim()) return {};
    const n = Number(x0);
    return Number.isFinite(n) ? { x0: n } : {};
  })();

  return (
    <MathFunctionInput<TangentLineResponse, { x0?: number }>
      label="Enter a function to find the tangent line:"
      endpoint="http://localhost:8000/tangentline"
      payloadKey="equation"
      extraPayload={extraPayload}
      buttonText="Calculate Tangent Line"
      extraContent={
        <>
          <div className="w-full text-left mt-2 mb-2">
            <label className="flex items-center gap-3">
              <span className="font-medium">x₀:</span>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                lang="en"
                placeholder="Enter x value (e.g. 1.5)"
                value={x0}
                onChange={(e) => setX0(e.target.value)}
                onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                className="w-40 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">
              If left empty, the backend may compute y₀ as f(x₀) only when x₀ is
              provided.
            </p>
          </div>

          {/* 🔗 Link estilo "Financial Calculators" */}
          <div className="mt-3">
            <a
              href="/calculus/derivatives"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500"
            >
              see how to calculate the derivatives
              <span aria-hidden>›</span>
            </a>
          </div>
        </>
      }
      onSuccess={(data) => {
        onResult(
          data.original,
          data.x0, // ✅ número del backend
          data.fxTangent, // LaTeX de la recta
          data.derivative,
          data.m, // ✅ número del backend
          data.y0 // ✅ número del backend
        );
      }}
    />
  );
};

export default TangentLineInput;
