"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const NormalInfo = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-6 sm:mt-10">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 text-gray-800">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center sm:text-left">
          📚 Understanding the Normal Distribution
        </h2>

        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          The <strong>Normal Distribution</strong> (also called{" "}
          <em>Gaussian Distribution</em>) is the most important continuous
          probability distribution. It describes data that tends to cluster
          around a central mean (<InlineMath math="\mu" />
          ), with variability measured by the standard deviation (
          <InlineMath math="\sigma" />
          ).
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">📝 Definition</h3>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          The probability density function (PDF) of a Normal distribution is:
        </p>

        <div className="overflow-x-auto">
          <BlockMath
            math={
              "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\tfrac{1}{2} \\left( \\tfrac{x - \\mu}{\\sigma} \\right)^2}"
            }
          />
        </div>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          💡 Key Properties
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-sm sm:text-base">
          <li>
            <strong>Mean (μ):</strong> Center of the distribution.
          </li>
          <li>
            <strong>Standard Deviation (σ):</strong> Spread of the data around
            the mean.
          </li>
          <li>
            <strong>68-95-99.7 Rule:</strong> About 68% of data lies within{" "}
            <InlineMath math="\mu \pm 1\sigma" />, 95% within{" "}
            <InlineMath math="\mu \pm 2\sigma" />, and 99.7% within{" "}
            <InlineMath math="\mu \pm 3\sigma" />.
          </li>
          <li>The distribution is symmetric around the mean.</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          🚀 Applications
        </h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-sm sm:text-base">
          <li>Modeling exam/test scores.</li>
          <li>Heights, weights, and other natural measurements.</li>
          <li>Financial returns and stock market behavior.</li>
          <li>Measurement errors in experiments.</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">🧠 Example</h3>
        <p className="mb-2 text-sm sm:text-base leading-relaxed">
          Suppose exam scores are Normally distributed with mean{" "}
          <InlineMath math="\mu = 70" /> and standard deviation{" "}
          <InlineMath math="\sigma = 10" />. The probability of a student
          scoring less than 80 is:
        </p>

        <div className="overflow-x-auto">
          <BlockMath math={"P(X \\leq 80) = F(80)"} />
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center sm:text-left">
          where <InlineMath math="F(x)" /> is the cumulative distribution
          function (CDF).
        </p>
      </div>
    </div>
  );
};

export default NormalInfo;
