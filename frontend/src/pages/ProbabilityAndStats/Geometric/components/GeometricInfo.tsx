"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const GeometricInfo = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 mt-10">
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          📚 Understanding the Geometric Distribution
        </h2>

        <p className="mb-4">
          The <strong>Geometric Distribution</strong> models the number of{" "}
          <em>trials</em> until the first <em>success</em> in a sequence of
          independent Bernoulli trials, each with probability of success{" "}
          <InlineMath math="p" />.
        </p>

        <h3 className="text-xl font-semibold mb-2">📝 Definition</h3>
        <p className="mb-4">
          The probability that the first success occurs on the{" "}
          <InlineMath math="k" />
          -th trial is:
        </p>

        <BlockMath
          math={"P(X = k) = (1-p)^{k-1} p, \\quad k = 1, 2, 3, \\dots"}
        />

        <h3 className="text-xl font-semibold mb-2">💡 Key Properties</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>Mean (Expected Value):</strong>{" "}
            <InlineMath math="E[X] = \dfrac{1}{p}" />
          </li>
          <li>
            <strong>Variance:</strong>{" "}
            <InlineMath math="Var(X) = \dfrac{1-p}{p^2}" />
          </li>
          <li>
            Support: <InlineMath math="X = 1, 2, 3, \dots" />
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🚀 Applications</h3>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Number of coin flips until the first head appears.</li>
          <li>
            Reliability testing: number of items tested until finding the first
            defective one.
          </li>
          <li>
            Customer service: number of calls until the first answered call.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🧠 Example</h3>
        <p className="mb-2">
          Suppose the probability of success is <InlineMath math="p = 0.25" />.
          The probability that the first success happens on the 3rd trial is:
        </p>

        <BlockMath math={"P(X=3) = (1-0.25)^{2} (0.25) = 0.1406"} />
      </div>
    </div>
  );
};

export default GeometricInfo;
