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
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6 max-w-2xl mx-auto">
        <p className="text-gray-500">
          No computation yet. Submit inputs to see Itô’s Lemma in action.
        </p>
      </div>
    );
  }

  const { params, partials, drift, diffusion, final, steps } = result;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Itô’s Lemma Expansion
      </h2>

      {/* Step-by-step derivations */}
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">Given function:</p>
        <BlockMath math={`f(t, x) = ${params.f}`} />

        <p className="text-gray-700 font-medium">Partial derivatives:</p>
        <BlockMath math={`f_t = ${partials.f_t}`} />
        <BlockMath math={`f_x = ${partials.f_x}`} />
        <BlockMath math={`f_{xx} = ${partials.f_xx}`} />

        <p className="text-gray-700 font-medium">Drift term:</p>
        <BlockMath math={drift} />

        <p className="text-gray-700 font-medium">Diffusion term:</p>
        <BlockMath math={diffusion} />

        <p className="text-gray-700 font-medium">
          Final expression for df(t, Xₜ):
        </p>
        <BlockMath math={final} />
      </div>

      {/* Optional: show all steps */}
      {steps && steps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mt-6 mb-3">
            Step-by-step derivation
          </h3>
          <div className="space-y-3">
            {steps.map((s, idx) => (
              <BlockMath key={idx} math={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
