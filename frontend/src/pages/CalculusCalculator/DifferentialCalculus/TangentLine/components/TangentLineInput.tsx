// src/.../TangentLine/components/TangentLineInput.tsx
import { useState } from "react";
import MathFunctionInput from "@/components/MathFunctionInput";

type TangentLineResponse = {
  original: string;
  x0: number;
  fxTangent: string;
  derivative: string;
  my: string;
};

const TangentLineInput = ({
  onResult,
}: {
  onResult: (
    original: string,
    x0: number,
    fxTangent: string,
    derivative: string,
    my: string
  ) => void;
}) => {
  const [x0, setX0] = useState<string>("");

  const extraPayload = (() => {
    if (!x0.trim()) return {};
    const n = Number(x0);
    return Number.isFinite(n) ? { x0: n } : {};
  })();

  const x0Sent = !x0.trim() ? NaN : Number(x0);

  return (
    <MathFunctionInput<TangentLineResponse, { x0?: number }>
      label="Enter a function to find the tangent line:"
      endpoint="http://localhost:8000/tangentline"
      payloadKey="equation"
      extraPayload={extraPayload}
      buttonText="Calculate Tangent Line"
      extraContent={
        /* 🔹 Este bloque queda dentro de la MISMA card, debajo del campo de función */
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
      }
      onSuccess={(data) => {
        console.log("📍 x0 enviado:", x0Sent);
        console.log("📥 Respuesta del backend:", data);
        onResult(
          data.original,
          x0Sent,
          data.fxTangent,
          data.derivative,
          data.my
        );
      }}
    />
  );
};

export default TangentLineInput;
