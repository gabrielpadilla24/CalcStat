"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const BinomialInfo = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 text-gray-800">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
          📚 Understanding the Binomial Distribution
        </h2>

        {/* Intro */}
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          The <strong>Binomial Distribution</strong> is a discrete probability
          distribution that models the number of <em>successes</em> in{" "}
          <InlineMath math="n" /> independent trials, each with probability{" "}
          <InlineMath math="p" /> of success.
        </p>

        {/* Definition */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">📝 Definition</h3>
        <p className="mb-4 text-sm sm:text-base">
          The probability of obtaining exactly <InlineMath math="k" /> successes
          in <InlineMath math="n" /> trials is:
        </p>
        <div className="overflow-x-auto">
          <BlockMath math={"P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}"} />
        </div>

        {/* Properties */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          💡 Key Properties
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-sm sm:text-base">
          <li>
            <strong>Mean (Expected Value):</strong>{" "}
            <InlineMath math="E[X] = np" />
          </li>
          <li>
            <strong>Variance:</strong> <InlineMath math="Var(X) = np(1-p)" />
          </li>
          <li>
            The support is <InlineMath math="k = 0, 1, 2, \dots, n" />.
          </li>
        </ul>

        {/* Applications */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          🚀 Applications
        </h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-sm sm:text-base">
          <li>Modeling coin flips (success/failure outcomes).</li>
          <li>Quality control (defective vs non-defective items).</li>
          <li>Genetics (probability of inheriting a trait).</li>
          <li>Finance (defaults in a portfolio of loans).</li>
        </ul>

        {/* Example */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">🧠 Example</h3>
        <p className="mb-2 text-sm sm:text-base">
          Suppose <InlineMath math="n = 10" /> and <InlineMath math="p = 0.2" />
          . The probability of exactly <InlineMath math="k = 4" /> successes is:
        </p>
        <div className="overflow-x-auto">
          <BlockMath math={"P(X=4) = \\binom{10}{4} (0.2)^4 (0.8)^6"} />
        </div>
      </div>
    </div>
  );
};

export default BinomialInfo;
