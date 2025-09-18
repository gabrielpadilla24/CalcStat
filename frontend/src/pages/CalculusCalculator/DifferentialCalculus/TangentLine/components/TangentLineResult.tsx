import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type TangentLineResultProps = {
  original: string; // LaTeX de f(x)
  derivative: string; // LaTeX de f'(x)
  x0: number;
  m: number;
  y0: number;
  fxTangent: string; // "y = ..." LaTeX
};

const isNonEmpty = (s: string | undefined | null): s is string =>
  typeof s === "string" && s.trim().length > 0;

const isFiniteNum = (n: unknown): n is number =>
  typeof n === "number" && Number.isFinite(n);

const SafeBlock: React.FC<{ math?: string }> = ({ math }) =>
  isNonEmpty(math ?? "") ? (
    <div className="overflow-x-auto">
      <BlockMath math={math as string} />
    </div>
  ) : null;

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

  // LaTeX step-by-step
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
    <div className="bg-white shadow-md rounded-xl p-6 w-full text-gray-800">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        📐 Tangent Line Result
      </h2>

      {!hasExpr ? (
        <p className="text-gray-500 italic">
          Enter a function and compute its tangent line to see the result here.
        </p>
      ) : (
        <div className="space-y-6">
          {/* Function */}
          <div>
            <strong>Function:</strong>
            <SafeBlock math={original} />
          </div>

          {/* Derivative */}
          <div>
            <strong>Derivative:</strong>
            <SafeBlock math={derivative} />
          </div>

          {/* Step-by-step */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              Step-by-Step
            </h3>

            {/* Step 1: slope */}
            <div className="mb-5">
              <p className="mb-2 font-medium">Formula for slope:</p>
              <SafeBlock math={`m = f'(x_0)`} />
              {hasX0 && <SafeBlock math={mEvalLatex} />}
              {hasM && <SafeBlock math={`m = ${m}`} />}
            </div>

            {/* Step 2: y0 */}
            <div className="mb-5">
              <p className="mb-2 font-medium">Formula for y-coordinate:</p>
              <SafeBlock math={`y_0 = f(x_0)`} />
              {hasX0 && <SafeBlock math={y0EvalLatex} />}
              {hasY0 && <SafeBlock math={`y_0 = ${y0}`} />}
            </div>

            {/* Step 3: Tangent equation */}
            <div>
              <p className="mb-2 font-medium">Tangent line equation:</p>
              <SafeBlock math={`y = m(x - x_0) + y_0`} />
              {hasAllNumbers && <SafeBlock math={tangentSubstLatex} />}
              {hasFinal && (
                <div className="mt-2">
                  <SafeBlock math={fxTangent} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TangentLineResult;
