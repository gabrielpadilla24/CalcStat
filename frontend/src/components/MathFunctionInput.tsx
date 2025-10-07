"use client";

import React, { useEffect, useMemo, useState, ReactNode } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import { api } from "@/lib/api";

// Ensure MathQuill default styles once in client
addStyles();

/* ----------------------------- Types ----------------------------- */

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

interface MathField {
  latex: (l?: string) => string;
  focus: () => void;
  write: (latex: string) => void;
  cmd: (cmd: string) => void;
  keystroke: (keys: string) => void;
}

interface MathFunctionInputProps<
  TResponse = unknown,
  TExtra extends Record<string, Json> = Record<string, never>
> {
  label?: string;
  examples?: string[];
  buttonText?: string;

  /** e.g. "/derivatives" – must be relative to your api baseURL */
  endpoint: string;

  /** Key name expected by backend (default: "equation") */
  payloadKey?: string;

  /** Any extra fields to include in the body */
  extraPayload?: TExtra;

  /** Called with parsed JSON + the input latex */
  onSuccess: (data: TResponse, latex: string) => void;

  /** UI extras */
  className?: string;
  inputLeft?: ReactNode;
  extraContent?: ReactNode;

  /** optional preset value for the field */
  presetLatex?: string;

  /** external listeners */
  onLatexChange?: (latex: string) => void;
  onMathField?: (mf: MathField | null) => void;
}

/* --------------------------- Component --------------------------- */

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
  inputLeft,
  extraContent,
  presetLatex,
  onLatexChange,
  onMathField,
}: MathFunctionInputProps<TResponse, TExtra>) => {
  const [latex, setLatex] = useState(presetLatex ?? "");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Update if parent changes preset
  useEffect(() => {
    if (typeof presetLatex === "string") setLatex(presetLatex);
  }, [presetLatex]);

  // Notify parent of changes
  useEffect(() => {
    onLatexChange?.(latex);
  }, [latex, onLatexChange]);

  const payload = useMemo(
    () => ({
      ...(extraPayload ?? ({} as TExtra)),
      [payloadKey]: latex,
    }),
    [latex, extraPayload, payloadKey]
  );

  const handleCalculate = async () => {
    setErr(null);
    setLoading(true);
    try {
      // ✅ Axios handles JSON serialization; pass a plain object
      const res = await api.post<TResponse>(endpoint, payload);

      // Helpful for debugging prod issues
      console.log("✅ API success:", { endpoint, payload, data: res.data });

      onSuccess(res.data, latex);
    } catch {
      // Extract best possible message
      const msg = "Unexpected error contacting server";

      console.error("❌ API error:", { endpoint, payload, error: msg });
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-[1440px] mx-auto flex flex-col items-center justify-center px-4 sm:px-6 ${className}`}
    >
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center text-center">
          {label && (
            <label className="text-lg font-medium text-gray-700 mb-4">
              {label}
            </label>
          )}

          <div className="w-full flex flex-wrap items-center gap-3 mb-6">
            {inputLeft && (
              <div className="shrink-0 flex items-center justify-center">
                {inputLeft}
              </div>
            )}

            <EditableMathField
              latex={latex}
              onChange={(mf) => setLatex(mf.latex())}
              mathquillDidMount={(mf) => {
                onMathField?.(mf as unknown as MathField);
              }}
              className="text-xl w-full border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none"
            />
          </div>

          {extraContent}

          {examples.length > 0 && (
            <p className="text-sm text-gray-500 mb-4 break-words">
              Examples:&nbsp;
              {examples.map((ex, i) => (
                <code key={i} className="mr-2 whitespace-nowrap">
                  {ex}
                </code>
              ))}
            </p>
          )}

          <button
            onClick={handleCalculate}
            disabled={loading || !latex.trim()}
            className="w-full sm:w-auto bg-[#5FBA9B] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition"
          >
            {loading ? "Calculating..." : buttonText}
          </button>

          {err && (
            <div className="mt-4 text-sm text-red-600 max-w-full break-words">
              {err}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathFunctionInput;
