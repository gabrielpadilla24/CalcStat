"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const GirsanovInfo = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 mt-10">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          📚 Understanding Girsanov’s Theorem
        </h2>

        <p className="mb-4">
          <strong>Girsanov’s Theorem</strong> is a fundamental result in{" "}
          <em>stochastic calculus</em> and <em>mathematical finance</em>. It
          allows us to <strong>change the probability measure</strong> in a way
          that transforms the drift of a stochastic process, while keeping its
          volatility unchanged.
        </p>

        <h3 className="text-xl font-semibold mb-2">📝 Intuition</h3>
        <p className="mb-4">
          Suppose we have a process under the{" "}
          <strong>physical measure (P)</strong>:
        </p>
        <BlockMath math={"dX_t = \\mu \\, dt + \\sigma \\, dW_t"} />
        <p className="mb-4">
          Using Girsanov’s theorem, we can switch to a{" "}
          <strong>new probability measure (Q)</strong> such that:
        </p>
        <BlockMath math={"dX_t = \\tilde{\\mu} \\, dt + \\sigma \\, dW_t^Q"} />
        <p className="mb-4">
          where <InlineMath math="W_t^Q" /> is a Brownian motion under the new
          measure <InlineMath math="Q" />. The drift has changed from{" "}
          <InlineMath math="\\mu" /> to <InlineMath math="\\tilde{\\mu}" />, but
          the volatility <InlineMath math="\\sigma" /> remains the same.
        </p>

        <h3 className="text-xl font-semibold mb-2">🔑 Change of Drift</h3>
        <p className="mb-4">
          The amount by which the drift is adjusted is given by:
        </p>
        <BlockMath math={"\\theta = \\frac{\\mu - \\tilde{\\mu}}{\\sigma}"} />

        <h3 className="text-xl font-semibold mb-2">
          📐 Radon–Nikodym Derivative
        </h3>
        <p className="mb-4">
          The <em>Radon–Nikodym derivative</em> (likelihood ratio) defines the
          relationship between the two measures:
        </p>
        <BlockMath
          math={
            "Z_t = \\exp\\Big(-\\theta W_t - \\tfrac{1}{2} \\theta^2 t \\Big)"
          }
        />
        <p className="mb-4">
          This guarantees that probabilities under <InlineMath math="Q" /> can
          be expressed in terms of probabilities under <InlineMath math="P" />.
        </p>

        <h3 className="text-xl font-semibold mb-2">💡 Why is it Important?</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            It provides the <strong>mathematical foundation</strong> for{" "}
            <em>risk-neutral pricing</em> in finance.
          </li>
          <li>
            Ensures that discounted asset prices become{" "}
            <strong>martingales under Q</strong>.
          </li>
          <li>
            Essential for deriving the <em>Black–Scholes model</em> and other
            option pricing formulas.
          </li>
          <li>
            Allows simulation of processes under different measures by shifting
            the drift.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">⚙️ Applications</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>Option Pricing:</strong> Changing to the risk-neutral
            measure simplifies valuation.
          </li>
          <li>
            <strong>Financial Derivatives:</strong> Used to compute forward,
            futures, and swap values.
          </li>
          <li>
            <strong>Stochastic Control:</strong> Helps in optimal decision
            problems with uncertainty.
          </li>
          <li>
            <strong>Monte Carlo Simulation:</strong> Paths can be simulated
            under Q to estimate expected payoffs.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🧠 Example</h3>
        <p className="mb-2">
          Let <InlineMath math="\\mu = 0.1" />,{" "}
          <InlineMath math="\\tilde{\\mu} = 0.05" />, and{" "}
          <InlineMath math="\\sigma = 0.2" />.
        </p>
        <p className="mb-2">
          Then the change in drift is:
          <BlockMath math={"\\theta = \\frac{0.1 - 0.05}{0.2} = 0.25"} />
        </p>
        <p className="mb-2">
          Under P:
          <BlockMath math={"dX_t = 0.1 \\, dt + 0.2 \\, dW_t"} />
        </p>
        <p className="mb-2">
          Under Q:
          <BlockMath math={"dX_t = 0.05 \\, dt + 0.2 \\, dW_t^Q"} />
        </p>
        <p className="mb-2">
          Radon–Nikodym derivative:
          <BlockMath math={"Z_t = \\exp(-0.25 W_t - 0.5 \\cdot 0.25^2 t)"} />
        </p>
      </div>
    </div>
  );
};

export default GirsanovInfo;
