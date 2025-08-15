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
  write: (latex: string) => void;
  cmd: (cmd: string) => void;
  keystroke: (keys: string) => void;
};

export default function IntegralsInput({ onResult }: Props) {
  const [mode, setMode] = useState<"indef" | "def">("indef");
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");

  const mfRef = useRef<MathField | null>(null);

  // endpoint fijo; mandamos metadata en extraPayload
  const endpoint = "http://localhost:8000/integrals";
  const extraPayload = useMemo(() => {
    const base: Record<string, string> = {
      type: mode === "def" ? "def" : "indef",
    };
    if (mode === "def") {
      base.a = a;
      base.b = b;
    }
    return base;
  }, [mode, a, b]);

  /** 🔧 Escribe plantilla y ubica cursor dentro de los paréntesis */
  const writeTemplate = (def: boolean) => {
    const mf = mfRef.current;
    if (!mf) return;

    if (def) {
      mf.latex("\\int _{ }^{ }\\left(\\right)dx");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Integral:</span>

        {/* Botones que INSERTAN la plantilla al presionarlos */}
        <div className="inline-flex rounded-md shadow-sm overflow-hidden border">
          <button
            type="button"
            onClick={() => {
              setMode("indef");
              writeTemplate(false);
            }}
            className={`px-3 py-1 text-sm ${
              mode === "indef" ? "bg-gray-900 text-white" : "bg-white"
            }`}
            title="Insert \int(...) dx"
          >
            Indef
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("def");
              writeTemplate(true);
            }}
            className={`px-3 py-1 text-sm border-l ${
              mode === "def" ? "bg-gray-900 text-white" : "bg-white"
            }`}
            title="Insert \int_{a}^{b}(...) dx"
          >
            Def
          </button>
        </div>

        {/* Límites opcionales para la plantilla definida */}
        <div className="flex items-center gap-2 ml-2">
          <label className="text-sm">
            a:
            <input
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="a"
              className="ml-1 w-20 rounded border px-2 py-1 text-sm"
            />
          </label>
          <label className="text-sm">
            b:
            <input
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="b"
              className="ml-1 w-20 rounded border px-2 py-1 text-sm"
            />
          </label>
        </div>
      </div>

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
        onMathField={(mf) => (mfRef.current = mf)} // 👈 recibimos el MathField
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
        Tip: pulsa <strong>Indef</strong> o <strong>Def</strong> para insertar
        la plantilla
        <code> \int(\ )\, dx</code> o{" "}
        <code>
          \int_{"{a}"}^{"{b}"}(\ )\, dx
        </code>
        . Escribe solo la función dentro de los paréntesis.
      </p>
    </div>
  );
}
