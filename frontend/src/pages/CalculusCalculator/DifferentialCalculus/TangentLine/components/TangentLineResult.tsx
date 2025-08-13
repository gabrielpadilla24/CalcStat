import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type TangentLineResultProps = {
  original: string; // LaTeX de f(x)
  derivative: string; // LaTeX de f'(x)
  x0: number; // valor numérico (usa NaN cuando no hay)
  m: number; // valor numérico (usa NaN cuando no hay)
  y0: number; // valor numérico (usa NaN cuando no hay)
  fxTangent: string; // "y = ..." LaTeX (simplificada)
};

const isNonEmpty = (s: string | undefined | null): s is string =>
  typeof s === "string" && s.trim().length > 0;

const isFiniteNum = (n: unknown): n is number =>
  typeof n === "number" && Number.isFinite(n);

const SafeBlock: React.FC<{ math?: string }> = ({ math }) =>
  isNonEmpty(math ?? "") ? <BlockMath math={math as string} /> : null;

const TangentLineResult: React.FC<TangentLineResultProps> = ({
  original,
  derivative,
  x0,
  m,
  y0,
  fxTangent,
}) => {
  const hasExpr = isNonEmpty(original) && isNonEmpty(derivative);
  const hasX0 = isFiniteNum(x0);
  const hasM = isFiniteNum(m);
  const hasY0 = isFiniteNum(y0);
  const hasAllNumbers = hasX0 && hasM && hasY0;
  const hasFinal = isNonEmpty(fxTangent);

  // Construcciones de sustitución SOLO si hay números válidos:
  const mEvalLatex =
    hasX0 && isNonEmpty(derivative)
      ? `m = \\left.${derivative}\\right|_{x=${x0}}`
      : "";
  const y0EvalLatex =
    hasX0 && isNonEmpty(original)
      ? `y_0 = \\left.${original}\\right|_{x=${x0}}`
      : "";
  const tangentSubstLatex = hasAllNumbers ? `y = ${m}(x - ${x0}) + ${y0}` : "";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📐 Tangent Line Result</h2>

      {!hasExpr ? (
        <p className="text-gray-500 italic">
          Enter a function and compute its tangent line to see the result here.
        </p>
      ) : (
        <>
          {/* Function */}
          <div className="mb-3">
            <strong>Function:</strong>
            <div className="mt-1">
              <SafeBlock math={original} />
            </div>
          </div>

          {/* Derivative */}
          <div className="mb-6">
            <strong>Derivative:</strong>
            <div className="mt-1">
              <SafeBlock math={derivative} />
            </div>
          </div>

          {/* Step-by-step */}
          <h3 className="text-lg font-semibold mb-2">Step-by-Step</h3>

          {/* Paso 1: m */}
          <div className="mb-5">
            <p className="mb-2">Formula for slope:</p>
            <SafeBlock math={`m = f'(x_0)`} />
            {hasX0 && <SafeBlock math={mEvalLatex} />}
            {hasM && <SafeBlock math={`m = ${m}`} />}
          </div>

          {/* Paso 2: y0 */}
          <div className="mb-5">
            <p className="mb-2">Formula for y-intercept point:</p>
            <SafeBlock math={`y_0 = f(x_0)`} />
            {hasX0 && <SafeBlock math={y0EvalLatex} />}
            {hasY0 && <SafeBlock math={`y_0 = ${y0}`} />}
          </div>

          {/* Paso 3: Ecuación de la tangente */}
          <div className="mb-5">
            <p className="mb-2">Tangent line equation:</p>
            <SafeBlock math={`y = m(x - x_0) + y_0`} />
            {hasAllNumbers && <SafeBlock math={tangentSubstLatex} />}
            {hasFinal && (
              <div className="mt-2">
                {/* versión final simplificada del backend */}
                <SafeBlock math={fxTangent} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TangentLineResult;
