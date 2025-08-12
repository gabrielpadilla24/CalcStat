import { useState } from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";

addStyles();

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

export interface MathFunctionWithCoordinatesInputProps<TResponse = unknown> {
  label?: string;
  examples?: string[];
  buttonText?: string;
  endpoint: string;
  payloadKey?: string; // por defecto "equation"
  onSuccess: (data: TResponse, latex: string) => void;
  className?: string;
  coordsLabel?: string; // título del bloque de coordenadas
}

const MathFunctionWithCoordinatesInput = <TResponse,>({
  label = "Enter a function:",
  examples = ["sin(x)", "log(x)", "1/x", "x^2", "e^x"],
  buttonText = "Calculate",
  endpoint,
  payloadKey = "equation",
  onSuccess,
  className = "",
  coordsLabel = "Point of Tangency",
}: MathFunctionWithCoordinatesInputProps<TResponse>) => {
  const [latex, setLatex] = useState("");
  const [x0, setX0] = useState("");
  const [provideY0, setProvideY0] = useState(false);
  const [y0, setY0] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const norm = (v: string) => v.replace(",", ".").trim();
  const parseNum = (v: string) => {
    if (!v.trim()) return undefined;
    const n = Number(norm(v));
    return Number.isFinite(n) ? n : undefined;
  };

  const handleCalculate = async () => {
    setErr(null);

    if (!latex.trim()) {
      setErr("Please enter a function.");
      return;
    }
    const xParsed = parseNum(x0);
    if (x0.trim() && xParsed === undefined) {
      setErr("Invalid x₀. Please enter a valid number.");
      return;
    }
    const yParsed = provideY0 ? parseNum(y0) : undefined;
    if (provideY0 && y0.trim() && yParsed === undefined) {
      setErr("Invalid y₀. Please enter a valid number.");
      return;
    }

    const body: Record<string, Json> = {
      [payloadKey]: latex,
    };
    if (typeof xParsed === "number") body.x0 = xParsed;
    if (typeof yParsed === "number") body.y0 = yParsed;

    try {
      setLoading(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
          {/* Función */}
          <label className="text-lg font-medium text-gray-700 mb-4">
            {label}
          </label>

          <EditableMathField
            latex={latex}
            onChange={(mf) => setLatex(mf.latex())}
            className="text-xl w-full border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none"
          />

          {/* Coordenadas: en la misma tarjeta, debajo */}
          <div className="w-full text-left mt-4">
            <h3 className="text-base font-semibold mb-2">{coordsLabel}</h3>

            <div className="flex flex-col gap-3">
              {/* x0 */}
              <label className="flex items-center gap-2">
                <span className="font-medium">x₀:</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1.5"
                  value={x0}
                  onChange={(e) => setX0(e.target.value)}
                  className="w-40 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </label>

              {/* toggle + y0 debajo */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={provideY0}
                    onChange={(e) => setProvideY0(e.target.checked)}
                  />
                  <span>Also provide y₀</span>
                </label>

                {provideY0 && (
                  <label className="flex items-center gap-2">
                    <span className="font-medium">y₀:</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="optional"
                      value={y0}
                      onChange={(e) => setY0(e.target.value)}
                      className="w-40 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="text-sm text-gray-600 mt-3">
              <span className="block mb-1 font-medium text-gray-700">
                Preview:
              </span>
              <StaticMathField>
                {provideY0
                  ? `\\left(${norm(x0) || "x_0"},\\;${
                      norm(y0) || "y_0"
                    }\\right)`
                  : `\\left(${norm(x0) || "x_0"},\\;f(${
                      norm(x0) || "x_0"
                    })\\right)`}
              </StaticMathField>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Tip: If you don’t provide y₀, it will be computed as f(x₀).
            </p>
          </div>

          {/* Examples */}
          <p className="text-sm text-gray-500 my-4">
            Examples:&nbsp;
            {examples.map((ex, i) => (
              <code key={i} className="mr-2">
                {ex}
              </code>
            ))}
          </p>

          {/* Botón */}
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

export default MathFunctionWithCoordinatesInput;
