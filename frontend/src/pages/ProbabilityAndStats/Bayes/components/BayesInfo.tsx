"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function BayesInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-2">
      <h2 className="text-xl font-bold mb-4 text-center">
        Understanding Bayes Theorem
      </h2>

      <p className="text-gray-700 mb-4">
        Bayes&apos; theorem describes the probability of an event, based on
        prior knowledge of conditions related to the event. It allows us to
        update our beliefs after observing new evidence.
      </p>

      <div className="text-center mb-4">
        <BlockMath math="P(A|B) = \frac{P(B|A)\,P(A)}{P(B)}" />
      </div>

      <p className="text-gray-700 mb-2">Where:</p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          <strong>P(A)</strong>: Prior probability of A.
        </li>
        <li>
          <strong>P(B)</strong>: Probability of observing B.
        </li>
        <li>
          <strong>P(B|A)</strong>: Likelihood of observing B given A.
        </li>
        <li>
          <strong>P(A|B)</strong>: Posterior probability of A given B (our
          updated belief).
        </li>
      </ul>

      <p className="text-gray-700">
        👉 Bayes&apos; theorem is widely used in fields like <em>medicine</em>{" "}
        (diagnosis given test results), <em>machine learning</em> (updating
        model probabilities), and <em>finance</em> (risk assessment given new
        evidence).
      </p>
    </div>
  );
}
