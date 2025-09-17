"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const BlackScholesInfo = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 mt-10">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          📚 Understanding the Black–Scholes PDE
        </h2>

        <p className="mb-4">
          The <strong>Black–Scholes PDE</strong> is the foundation of{" "}
          <em>modern option pricing</em>. It arises by modeling the stock price
          as a <em>Geometric Brownian Motion (GBM)</em> and constructing a
          risk-free portfolio that eliminates randomness. This ensures that the
          option value satisfies a deterministic partial differential equation.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          📝 Step 1: Start with GBM
        </h3>
        <p className="mb-4">
          Assume the asset price <InlineMath math="S_t" /> evolves as:
        </p>
        <BlockMath math={"dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t"} />

        <h3 className="text-xl font-semibold mb-2">
          📝 Step 2: Construct a Portfolio
        </h3>
        <p className="mb-4">
          Form a portfolio consisting of the option and the underlying:
        </p>
        <BlockMath math={"\\Pi = V - \\Delta S"} />

        <h3 className="text-xl font-semibold mb-2">
          📝 Step 3: Eliminate Randomness
        </h3>
        <p className="mb-4">
          By choosing <InlineMath math="\\Delta" /> properly, the stochastic
          term vanishes. The portfolio becomes risk-free and must grow at the
          risk-free rate <InlineMath math="r" />.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          📝 Step 4: Obtain the PDE
        </h3>
        <p className="mb-4">
          The option value <InlineMath math="V(t,S)" /> satisfies the following
          PDE:
        </p>
        <BlockMath
          math={
            "\\frac{\\partial V}{\\partial t} + \\tfrac{1}{2} \\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + r S \\frac{\\partial V}{\\partial S} - rV = 0"
          }
        />

        <h3 className="text-xl font-semibold mb-2">
          📝 Step 5: Boundary Conditions
        </h3>
        <p className="mb-2">At maturity, the option equals its payoff:</p>
        <BlockMath math={"V(T, S) = \\max(S - K, 0) \\quad (\\text{Call})"} />
        <BlockMath math={"V(T, S) = \\max(K - S, 0) \\quad (\\text{Put})"} />

        <h3 className="text-xl font-semibold mb-2">💡 Why is it Important?</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            Provides the <strong>mathematical foundation</strong> for option
            pricing.
          </li>
          <li>
            Ensures that under the <strong>risk-neutral measure</strong>, asset
            prices evolve consistently with no arbitrage.
          </li>
          <li>
            The PDE solution leads to the <em>Black–Scholes formula</em> for
            European options.
          </li>
          <li>
            Can also be solved with <strong>Monte Carlo</strong> or{" "}
            <strong>finite-difference</strong> methods.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🧠 Example</h3>
        <p className="mb-2">
          Suppose <InlineMath math="S_0 = 100" />, <InlineMath math="K = 100" />
          , <InlineMath math="r = 0.05" />, and{" "}
          <InlineMath math="\\sigma = 0.2" />.
        </p>
        <p className="mb-2">
          The PDE becomes:
          <BlockMath
            math={
              "\\frac{\\partial V}{\\partial t} + 0.5 (0.2)^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + 0.05 S \\frac{\\partial V}{\\partial S} - 0.05 V = 0"
            }
          />
        </p>
        <p className="mb-2">
          With boundary condition for a call:
          <BlockMath math={"V(T, S) = \\max(S - 100, 0)"} />
        </p>
      </div>
    </div>
  );
};

export default BlackScholesInfo;
