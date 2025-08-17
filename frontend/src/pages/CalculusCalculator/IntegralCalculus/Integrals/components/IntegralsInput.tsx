// src/pages/CalculusCalculator/IntegralCalculus/Integrals/components/IntegralsInput.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type MathField = {
  latex: (l?: string) => string;
  focus: () => void;
  keystroke: (keys: string) => void;
};

export default function IntegralsInput({ onResult }: Props) {
  const mfRef = useRef<MathField | null>(null);

  // plantilla mostrada/controlada por el hijo
  const [preset, setPreset] = useState<string>("");

  const INDEF_TEMPLATE = "\\int _{ }^{ }\\left(\\right)dx";

  // Solo enviamos "indef" al backend
  const extraPayload = useMemo(() => ({ type: "indef" }), []);

  // Para recolocar el cursor si el hijo re-renderiza con el preset
  const needsCursorRef = useRef<boolean>(true);

  // Al montar: dejar la indefinida puesta y el cursor dentro de (...)
  useEffect(() => {
    setPreset(INDEF_TEMPLATE);

    const mf = mfRef.current;
    if (!mf) return;

    mf.latex(INDEF_TEMPLATE);
    mf.focus();
    // Desde el final: x ← d ← (espacio \,) ← )  → queda dentro de (...)
    mf.keystroke("Left");
    mf.keystroke("Left");
    mf.keystroke("Left");
    mf.keystroke("Left");
    needsCursorRef.current = false;
  }, []);

  // Si el hijo repinta con preset, volvemos a poner el cursor dentro
  const handleLatexChange = (current: string) => {
    if (!needsCursorRef.current) return;
    if (current !== INDEF_TEMPLATE) return;

    const mf = mfRef.current;
    if (!mf) return;

    mf.focus();
    mf.keystroke("Left");
    mf.keystroke("Left");
    mf.keystroke("Left");
    mf.keystroke("Left");
    needsCursorRef.current = false;
  };

  return (
    <div className="w-full">
      <MathFunctionInput<IntegralsResponse, Record<string, string>>
        label={"Enter the function to integrate:"}
        endpoint={"http://localhost:8000/integrals"}
        payloadKey="equation"
        extraPayload={extraPayload}
        buttonText={"Calculate Indefinite Integral"}
        presetLatex={preset}
        onLatexChange={handleLatexChange}
        onMathField={(mf) => (mfRef.current = mf)}
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

      <p className="mt-2 text-xs text-gray-500">
        Tip: el campo inicia con <code>\int\,\left(\right)\,dx</code>. Escribe
        solo el integrando dentro de los paréntesis.
      </p>
    </div>
  );
}
