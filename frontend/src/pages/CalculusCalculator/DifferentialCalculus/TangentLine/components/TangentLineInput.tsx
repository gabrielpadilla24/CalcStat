// src/pages/CalculusCalculator/DifferentialCalculus/TangentLine/components/TangentLineInput.tsx
import { useState } from "react";
import MathFunctionInput from "@/components/MathFunctionInput";

type TangentLineResponse = {
  original: string;
  x0: number; // el backend debe devolverlo
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

  // Payload extra que viaja junto a { equation: <latex> }
  const extraPayload = (() => {
    // si está vacío no lo mandamos
    if (x0.trim() === "") return {};
    // parse a número (el backend lo espera como float)
    const n = Number(x0);
    return Number.isFinite(n) ? { x0: n } : {};
  })();

  return (
    <div className="w-full">
      {/* Campo coordenada X (simple y claro) */}
      <div className="w-[600px] mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-3">
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
        <p className="text-xs text-gray-500 mt-2">
          If left empty, the backend may compute y₀ as f(x₀) only when x₀ is
          provided.
        </p>
      </div>

      {/* Input de función (usa extraPayload para enviar x0) */}
      <MathFunctionInput<TangentLineResponse, { x0?: number }>
        label="Enter a function to find the tangent line:"
        endpoint="http://localhost:8000/tangentline"
        payloadKey="equation"
        extraPayload={extraPayload}
        buttonText="Calculate Tangent Line"
        onSuccess={(data) => {
          console.log("📥 Respuesta del backend:", data);
          onResult(
            data.original,
            data.x0,
            data.fxTangent,
            data.derivative,
            data.my
          );
        }}
      />
    </div>
  );
};

export default TangentLineInput;
