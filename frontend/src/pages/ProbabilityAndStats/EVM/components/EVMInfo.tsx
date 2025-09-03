"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function EVMInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-6 max-w-[1230px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📘 Expected Value, Variance & Moments
      </h2>

      <p className="text-gray-700 mb-4">
        In probability theory, the <strong>expected value</strong>,{" "}
        <strong>variance</strong>, and <strong>moments</strong> are fundamental
        metrics used to describe the behavior of a random variable.
      </p>

      {/* Expected Value */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Expected Value</h3>
      <p className="text-gray-700 mb-2">
        The expected value (mean) of a random variable represents its long-run
        average outcome:
      </p>
      <BlockMath math={"E[X] = \\sum_i x_i P(x_i)"} />
      <BlockMath math={"E[X] = \\int_{-\\infty}^{\\infty} x f(x) dx"} />
      <p className="text-gray-600 text-sm mb-4">
        (The first formula applies to discrete random variables, the second to
        continuous ones.)
      </p>

      {/* Variance */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Variance</h3>
      <p className="text-gray-700 mb-2">
        Variance measures how spread out the values of the random variable are
        around the mean:
      </p>
      <BlockMath math={"Var(X) = E[(X - E[X])^2]"} />
      <BlockMath math={"Var(X) = E[X^2] - (E[X])^2"} />

      {/* Moments */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Moments</h3>
      <p className="text-gray-700 mb-2">
        Moments provide deeper insight into the distribution. The{" "}
        <em>k-th moment</em> of a random variable is defined as:
      </p>
      <BlockMath math={"\\mu_k = E[X^k]"} />

      <ul className="list-disc ml-6 text-gray-700 mt-2">
        <li>
          1st moment: <em>mean</em> (expected value).
        </li>
        <li>
          2nd central moment: <em>variance</em>.
        </li>
        <li>
          Higher moments describe <em>skewness</em> and <em>kurtosis</em>.
        </li>
      </ul>
    </div>
  );
}
