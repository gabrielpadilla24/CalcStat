"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const PoissonInfo = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 md:p-8 text-gray-800">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          📚 Understanding the Poisson Distribution
        </h2>

        <p className="mb-4 text-sm sm:text-base md:text-lg">
          The <strong>Poisson Distribution</strong> is a discrete probability
          distribution that models the number of events occurring in a fixed{" "}
          <em>interval</em> of time or space, given that these events occur
          independently and with a constant average rate{" "}
          <InlineMath math="\\lambda" />.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">📝 Definition</h3>
        <p className="mb-4 text-sm sm:text-base md:text-lg">
          The probability of observing exactly <InlineMath math="k" /> events
          when the average rate is <InlineMath math="\\lambda" /> is:
        </p>

        <div className="overflow-x-auto">
          <BlockMath math={"P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}"} />
        </div>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          💡 Key Properties
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-sm sm:text-base md:text-lg">
          <li>
            <strong>Mean (Expected Value):</strong>{" "}
            <InlineMath math="E[X] = \\lambda" />
          </li>
          <li>
            <strong>Variance:</strong> <InlineMath math="Var(X) = \\lambda" />
          </li>
          <li>
            The support is <InlineMath math="k = 0, 1, 2, \dots" />.
          </li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          🚀 Applications
        </h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-sm sm:text-base md:text-lg">
          <li>Number of customers arriving at a store per hour.</li>
          <li>Phone calls received at a call center per minute.</li>
          <li>Decay events from a radioactive source.</li>
          <li>Number of misprints in a book chapter.</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">🧠 Example</h3>
        <p className="mb-2 text-sm sm:text-base md:text-lg">
          Suppose the average number of arrivals per hour is{" "}
          <InlineMath math="\\lambda = 5" />. The probability of exactly{" "}
          <InlineMath math="k = 8" /> arrivals in one hour is:
        </p>
        <div className="overflow-x-auto">
          <BlockMath math={"P(X=8) = \\frac{e^{-5} 5^8}{8!}"} />
        </div>
      </div>
    </div>
  );
};

export default PoissonInfo;
