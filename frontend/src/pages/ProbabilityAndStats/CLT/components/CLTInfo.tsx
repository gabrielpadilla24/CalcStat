"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function CLTInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-6 max-w-[1230px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📘 Central Limit Theorem (CLT)
      </h2>

      <p className="text-gray-700 mb-4">
        The <strong>Central Limit Theorem (CLT)</strong> is one of the most
        important results in probability theory and statistics. It states that,
        regardless of the original distribution of a random variable, the{" "}
        <em>sampling distribution of the sample mean</em> tends to a{" "}
        <strong>Normal distribution</strong> as the sample size increases.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">
        Mathematical Formulation
      </h3>
      <p className="text-gray-700 mb-2">
        If we take independent random samples of size <code>n</code> from a
        population with mean <code>μ</code> and variance <code>σ²</code>, then
        the distribution of the standardized mean is:
      </p>

      <BlockMath
        math={
          "\\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\;\\xrightarrow{d}\\; N(0,1)"
        }
      />

      <p className="text-gray-600 text-sm mb-4">
        where <code>→d</code> means convergence in distribution.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Implications</h3>
      <ul className="list-disc ml-6 text-gray-700 space-y-1">
        <li>
          Even if the original distribution is <em>not Normal</em>, the sample
          mean becomes approximately Normal for large <code>n</code>.
        </li>
        <li>
          The mean of the sampling distribution is{" "}
          <BlockMath math={"E[\\bar{X}] = \\mu"} />
        </li>
        <li>
          The variance of the sampling distribution is{" "}
          <BlockMath math={"Var(\\bar{X}) = \\frac{\\sigma^2}{n}"} />
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Applications</h3>
      <p className="text-gray-700 mb-2">
        The CLT is the foundation of many statistical methods, including:
      </p>
      <ul className="list-disc ml-6 text-gray-700 space-y-1">
        <li>Confidence intervals for means.</li>
        <li>Hypothesis testing for population parameters.</li>
        <li>Financial modeling and risk estimation.</li>
      </ul>
    </div>
  );
}
