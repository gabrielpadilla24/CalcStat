// src/pages/CalculusCalculator/IntegralCalculus/Integrals/components/IntegralsInput.tsx
"use client";

import { useMemo, useState } from "react";
import MathFunctionInput from "@/components/MathFunctionInput";

type IntegralsResponse = {
  original: string;
  integral: string;
  steps?: string[];
  tipo?: "definite" | "indefinite";
  original_latex?: string;
  integral_latex?: string;
};

type Props = {
  onResult: (
    expression: string,
    integral: string,
    steps?: string[],
    tipo?: string,
    expressionLatex?: string,
    integralLatex?: string
  ) => void;
};

// Payload que cumple con Record<string, Json>
type ExtraPayload = { type: "indef" } | { type: "def"; a?: number; b?: number };

export default function IntegralsInput({ onResult }: Props) {
  const [mode, setMode] = useState<"indef" | "def">("indef");
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");

  const extraPayload: ExtraPayload = useMemo(() => {
    if (mode === "indef") return { type: "indef" };
    const aNum = Number(a);
    const bNum = Number(b);
    const payload: { type: "def"; a?: number; b?: number } = { type: "def" };
    if (Number.isFinite(aNum)) payload.a = aNum;
    if (Number.isFinite(bNum)) payload.b = bNum;
    return payload;
  }, [mode, a, b]);

  const buttonText =
    mode === "indef"
      ? "Calculate Indefinite Integral"
      : "Calculate Definite Integral";

  return (
    <div className="w-full">
      <MathFunctionInput<IntegralsResponse, ExtraPayload>
        label={"Enter the integrand f(x) (with respect to dx):"}
        endpoint={"http://localhost:8000/integrals"}
        payloadKey="equation"
        extraPayload={extraPayload}
        buttonText={buttonText}
        /* 👇 Todo esto aparece DENTRO de la misma card */
        extraContent={
          <div className="w-full mt-2">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-gray-700">Type:</span>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="inttype"
                  value="indef"
                  checked={mode === "indef"}
                  onChange={() => setMode("indef")}
                />
                <span>Indefinite</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="inttype"
                  value="def"
                  checked={mode === "def"}
                  onChange={() => setMode("def")}
                />
                <span>Definite</span>
              </label>

              {mode === "def" && (
                <div className="ml-2 flex items-center gap-2">
                  <span className="text-gray-600">Limits:</span>
                  <input
                    type="number"
                    step="any"
                    placeholder="a"
                    className="w-20 border rounded-md px-2 py-1 text-sm"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                  />
                  <span className="text-gray-500">→</span>
                  <input
                    type="number"
                    step="any"
                    placeholder="b"
                    className="w-20 border rounded-md px-2 py-1 text-sm"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                  />
                </div>
              )}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Tip: escribe solo el <em>integrando</em> (p. ej., <code>x^2</code>
              , <code>sin(x)</code>). Asumimos integración con respecto a{" "}
              <code>dx</code>.{mode === "def" && " Incluye los límites a y b."}
            </p>
          </div>
        }
        onSuccess={(data) =>
          onResult(
            data.original,
            data.integral,
            data.steps,
            data.tipo,
            data.original_latex,
            data.integral_latex
          )
        }
      />
    </div>
  );
}
