"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type ItoLemmaData = {
  f: string;
  mu: string;
  sigma: string;
};

type ItoLemmaResponse = {
  params: ItoLemmaData;
  partials: { f_t: string; f_x: string; f_xx: string };
  drift: string;
  diffusion: string;
  final: string;
  steps: string[];
};

export default function ItoLemmaResult({
  result,
}: {
  result?: ItoLemmaResponse;
}) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6 w-full max-w-2xl mx-auto">
        <p className="text-gray-500 text-center">
          No computation yet. Submit inputs to see Itô’s Lemma in action.
        </p>
      </div>
    );
  }

  const { params, partials, drift, diffusion, final, steps } = result;

  // 🔹 Wrapper para fórmulas responsivas
  const MathBlock = ({ math }: { math: string }) => (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <BlockMath math={math} />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
        Itô’s Lemma Expansion
      </h2>

      {/* Step-by-step derivations */}
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">Given function:</p>
        <MathBlock math={`f(t, x) = ${params.f}`} />

        <p className="text-gray-700 font-medium">Partial derivatives:</p>
        <MathBlock math={`f_t = ${partials.f_t}`} />
        <MathBlock math={`f_x = ${partials.f_x}`} />
        <MathBlock math={`f_{xx} = ${partials.f_xx}`} />

        <p className="text-gray-700 font-medium">Drift term:</p>
        <MathBlock math={drift} />

        <p className="text-gray-700 font-medium">Diffusion term:</p>
        <MathBlock math={diffusion} />

        <p className="text-gray-700 font-medium">
          Final expression for df(t, Xₜ):
        </p>
        <MathBlock math={final} />
      </div>

      {/* Optional: show all steps */}
      {steps && steps.length > 0 && (
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">
            Step-by-step derivation
          </h3>
          <div className="space-y-3">
            {steps.map((s, idx) => (
              <MathBlock key={idx} math={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
