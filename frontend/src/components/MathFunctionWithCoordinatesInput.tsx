// src/components/MathFunctionWithCoordinatesInput.tsx
import { useState } from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";

addStyles();

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

export interface MathFunctionWithCoordinatesInputProps<TResponse = unknown> {
  label?: string;
  examples?: string[];
  buttonText?: string;
  endpoint: string;
  payloadKey?: string; // "equation" por defecto
  onSuccess: (data: TResponse, latex: string) => void;
  className?: string;
  coordsLabel?: string;
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
  // 👉 números o vacío para poder limpiar el input
  const [x0, setX0] = useState<number | "">("");
  const [provideY0, setProvideY0] = useState(false);
  const [y0, setY0] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleCalculate = async () => {
    setErr(null);

    if (!latex.trim()) {
      setErr("Please enter a function.");
      return;
    }
    // Validaciones mínimas
    if (x0 !== "" && Number.isNaN(x0)) {
      setErr("Invalid x₀. Please enter a valid number.");
      return;
    }
    if (provideY0 && y0 !== "" && Number.isNaN(y0)) {
      setErr("Invalid y₀. Please enter a valid number.");
      return;
    }

    const body: Record<string, Json> = { [payloadKey]: latex };
    if (x0 !== "") body.x0 = x0; // número puro
    if (provideY0 && y0 !== "") body.y0 = y0;

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

  // helpers visuales para el preview
  const sx = x0 === "" ? "x_0" : String(x0);
  const sy = y0 === "" ? "y_0" : String(y0);

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

          {/* Coordenadas */}
          <div className="w-full text-left mt-4">
            <h3 className="text-base font-semibold mb-2">{coordsLabel}</h3>

            <div className="flex flex-col gap-3">
              {/* Fila x0 + toggle a la derecha */}
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <span className="font-medium">x₀:</span>
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    lang="en" // fuerza '.' como decimal
                    placeholder="e.g. 1.5"
                    value={x0}
                    onChange={(e) => {
                      const v = e.target.value;
                      setX0(v === "" ? "" : Number(v));
                    }}
                    onWheel={(e) =>
                      (e.currentTarget as HTMLInputElement).blur()
                    } // evita scroll que cambia el valor
                    className="w-40 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={provideY0}
                    onChange={(e) => setProvideY0(e.target.checked)}
                  />
                  <span>Also provide y₀</span>
                </label>
              </div>

              {/* y0 debajo si está activo */}
              {provideY0 && (
                <label className="flex items-center gap-2">
                  <span className="font-medium">y₀:</span>
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    lang="en"
                    placeholder="optional"
                    value={y0}
                    onChange={(e) => {
                      const v = e.target.value;
                      setY0(v === "" ? "" : Number(v));
                    }}
                    onWheel={(e) =>
                      (e.currentTarget as HTMLInputElement).blur()
                    }
                    className="w-40 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </label>
              )}
            </div>

            {/* Preview */}
            <div className="text-sm text-gray-600 mt-3">
              <p className="text-xs text-gray-500 mt-2">
                Tip: If you don’t provide y₀, it will be computed as f(x₀).
              </p>
              <StaticMathField>
                {provideY0
                  ? `\\left(${sx},\\;${sy}\\right)`
                  : `\\left(${sx},\\;f(${sx})\\right)`}
              </StaticMathField>
            </div>
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
