// src/pages/CalculusCalculator/IntegralCalculus/Integrals/components/IntegralsInput.tsx
"use client";

import { useMemo, useRef, useState } from "react";
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
  const [mode, setMode] = useState<"indef" | "def">("indef");

  const mfRef = useRef<MathField | null>(null);

  // Plantilla sincronizada con el hijo (MathFunctionInput)
  const [preset, setPreset] = useState<string>("");

  // Para posicionar el cursor cuando el campo adopte la plantilla
  const lastTemplateRef = useRef<string>("");
  const needCursorRef = useRef<boolean>(false);

  const endpoint = "http://localhost:8000/integrals";
  const extraPayload = useMemo(
    () => ({ type: mode === "def" ? "def" : "indef" }),
    [mode]
  );

  const insertTemplate = (def: boolean) => {
    const template = def
      ? `\\int _{ }^{ }\\left(\\right)dx`
      : `\\int\\left(\\right)dx`;

    // 1) sincronizar con el hijo (esto es lo que se enviará al backend)
    lastTemplateRef.current = template;
    needCursorRef.current = true;
    setPreset(template);

    // 2) feedback inmediato en MathQuill
    const mf = mfRef.current;
    if (mf) {
      mf.latex(template);
      mf.focus();
      // desde el final: x ← d ← ) → dentro de (...)
      mf.keystroke("Left");
      mf.keystroke("Left");
      mf.keystroke("Left");
    }
  };

  const handleLatexChange = (current: string) => {
    if (!needCursorRef.current || current !== lastTemplateRef.current) return;
    const mf = mfRef.current;
    if (!mf) return;
    mf.focus();
    mf.keystroke("Left");
    mf.keystroke("Left");
    mf.keystroke("Left");
    needCursorRef.current = false;
  };

  return (
    <div className="w-full">
      <MathFunctionInput<IntegralsResponse, Record<string, string>>
        label={
          mode === "def"
            ? "Enter the function to integrate (definite):"
            : "Enter the function to integrate (indefinite):"
        }
        endpoint={endpoint}
        payloadKey="equation"
        extraPayload={extraPayload}
        buttonText={
          mode === "def"
            ? "Calculate Definite Integral"
            : "Calculate Indefinite Integral"
        }
        // 👉 botones DENTRO de la card (debajo del input)
        extraContent={
          <div className="w-full flex justify-center mb-3">
            <div className="inline-flex rounded-md shadow-sm overflow-hidden border">
              <button
                type="button"
                onClick={() => {
                  setMode("indef");
                  insertTemplate(false);
                }}
                className={`px-3 py-1 text-sm ${
                  mode === "indef" ? "bg-gray-900 text-white" : "bg-white"
                }`}
                title="Insert ∫( )dx"
              >
                Indef
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("def");
                  insertTemplate(true);
                }}
                className={`px-3 py-1 text-sm border-l ${
                  mode === "def" ? "bg-gray-900 text-white" : "bg-white"
                }`}
                title="Insert ∫_{ }^{ }( )dx"
              >
                Def
              </button>
            </div>
          </div>
        }
        presetLatex={preset} // sincroniza valor controlado
        onLatexChange={handleLatexChange} // coloca el cursor dentro
        onMathField={(mf) => (mfRef.current = mf)} // referencia al MathQuill
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
        Tip: usa los botones dentro de la tarjeta para insertar la plantilla
        <code> ∫( )dx</code> o{" "}
        <code>
          ∫<sub> </sub>
          <sup> </sup>( )dx
        </code>
        . Escribe solo el integrando dentro de los paréntesis.
      </p>
    </div>
  );
}
