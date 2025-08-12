// src/components/MathFunctionInput.tsx
import { useMemo, useState, type ReactNode } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

addStyles();

// JSON-safe
type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

interface MathFunctionInputProps<
  TResponse = unknown,
  TExtra extends Record<string, Json> = Record<string, never>
> {
  label?: string;
  examples?: string[];
  buttonText?: string;
  endpoint: string;
  payloadKey?: string; // "equation" | "function"
  extraPayload?: TExtra;
  onSuccess: (data: TResponse, latex: string) => void;
  className?: string;
  /** 🔹 NUEVO: contenido adicional debajo del campo de función (dentro de la misma card) */
  extraContent?: ReactNode;
}

const MathFunctionInput = <
  TResponse,
  TExtra extends Record<string, Json> = Record<string, never>
>({
  label = "Enter a function:",
  examples = ["sin(x)", "log(x)", "1/x", "x^2", "e^x"],
  buttonText = "Calculate",
  endpoint,
  payloadKey = "equation",
  extraPayload,
  onSuccess,
  className = "",
  extraContent, // 🔹 NUEVO
}: MathFunctionInputProps<TResponse, TExtra>) => {
  const [latex, setLatex] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const body = useMemo(() => {
    return JSON.stringify({
      ...(extraPayload ?? ({} as TExtra)),
      [payloadKey]: latex,
    });
  }, [latex, extraPayload, payloadKey]);

  const handleCalculate = async () => {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Request failed");
      }
      const data = (await res.json()) as TResponse;
      onSuccess(data, latex);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unexpected error";
      setErr(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-[1440px] mx-auto flex flex-col items-center justify-center px-6 ${className}`}
    >
      <div className="w-[600px] bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="flex flex-col items-center text-center">
          <label className="text-lg font-medium text-gray-700 mb-4">
            {label}
          </label>

          <EditableMathField
            latex={latex}
            onChange={(mf) => setLatex(mf.latex())}
            className="text-xl w-full border border-gray-300 px-4 py-2 mb-4 rounded-lg bg-white focus:outline-none"
          />

          {/* 🔹 Renderizamos el contenido extra dentro de la card */}
          {extraContent}

          <p className="text-sm text-gray-500 mb-4 mt-2">
            Examples:&nbsp;
            {examples.map((ex, i) => (
              <code key={i} className="mr-2">
                {ex}
              </code>
            ))}
          </p>

          <button
            onClick={handleCalculate}
            disabled={loading || !latex.trim()}
            className="bg-[#5FBA9B] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition"
          >
            {loading ? "Calculating..." : buttonText}
          </button>

          {err && <div className="mt-4 text-sm text-red-600">{err}</div>}
        </div>
      </div>
    </div>
  );
};

export default MathFunctionInput;
