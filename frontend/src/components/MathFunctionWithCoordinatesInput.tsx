// src/components/MathFunctionInputWithCoordinate.tsx
import { useMemo, useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

addStyles();

// JSON-safe type para el payload
type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

interface MathFunctionInputWithCoordinateProps<
  TResponse = unknown,
  TExtra extends Record<string, Json> = Record<string, never>
> {
  label?: string;
  examples?: string[];
  buttonText?: string;
  endpoint: string;
  functionKey?: string; // p. ej. "equation" | "function"
  coordinateKey?: string; // p. ej. "x_value"
  extraPayload?: TExtra;
  onSuccess: (data: TResponse, latex: string, xValue: number) => void;
  className?: string;
}

const MathFunctionInputWithCoordinate = <
  TResponse,
  TExtra extends Record<string, Json> = Record<string, never>
>({
  label = "Enter a function and x-coordinate:",
  examples = ["sin(x)", "log(x)", "1/x", "x^2", "e^x"],
  buttonText = "Calculate",
  endpoint,
  functionKey = "equation",
  coordinateKey = "x_value",
  extraPayload,
  onSuccess,
  className = "",
}: MathFunctionInputWithCoordinateProps<TResponse, TExtra>) => {
  const [latex, setLatex] = useState("");
  const [xValue, setXValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const body = useMemo(() => {
    return JSON.stringify({
      ...(extraPayload ?? ({} as TExtra)),
      [functionKey]: latex,
      [coordinateKey]: parseFloat(xValue),
    });
  }, [latex, xValue, extraPayload, functionKey, coordinateKey]);

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
      onSuccess(data, latex, parseFloat(xValue));
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

          {/* Campo para la función */}
          <EditableMathField
            latex={latex}
            onChange={(mf) => setLatex(mf.latex())}
            className="text-xl w-full border border-gray-300 px-4 py-2 mb-4 rounded-lg bg-white focus:outline-none"
          />

          {/* Campo para la coordenada x */}
          <input
            type="number"
            step="any"
            value={xValue}
            onChange={(e) => setXValue(e.target.value)}
            placeholder="Enter x value"
            className="w-full border border-gray-300 px-4 py-2 mb-6 rounded-lg bg-white focus:outline-none"
          />

          <p className="text-sm text-gray-500 mb-4">
            Examples:&nbsp;
            {examples.map((ex, i) => (
              <code key={i} className="mr-2">
                {ex}
              </code>
            ))}
          </p>

          <button
            onClick={handleCalculate}
            disabled={loading || !latex.trim() || xValue.trim() === ""}
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

export default MathFunctionInputWithCoordinate;
