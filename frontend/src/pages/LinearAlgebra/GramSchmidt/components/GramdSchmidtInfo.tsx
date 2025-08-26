"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const GramSchmidtInfo = () => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mt-10 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        📚 Understanding the Gram–Schmidt Process
      </h2>

      <p className="mb-4">
        The <strong>Gram–Schmidt process</strong> takes a set of linearly
        independent vectors <InlineMath math="\{v_1, v_2, \dots, v_n\}" /> in{" "}
        <InlineMath math="\mathbb{R}^n" /> and generates an{" "}
        <strong>orthonormal basis</strong>
        <InlineMath math="\{q_1, q_2, \dots, q_n\}" /> for the same subspace.
      </p>

      <h3 className="text-xl font-semibold mb-2">📝 Step-by-Step Definition</h3>
      <ol className="list-decimal list-inside space-y-2 mb-4">
        <li>
          Start with <InlineMath math="u_1 = v_1" />.
        </li>
        <li>
          Normalize: <InlineMath math="q_1 = \frac{u_1}{\|u_1\|}" />.
        </li>
        <li>
          For each <InlineMath math="v_k" /> (with{" "}
          <InlineMath math="k \geq 2" />
          ):
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li>
              Subtract projections:{" "}
              <BlockMath
                math={
                  "u_k = v_k - \\sum_{j=1}^{k-1} \\langle v_k, q_j \\rangle q_j"
                }
              />
            </li>
            <li>
              Normalize: <BlockMath math="q_k = \frac{u_k}{\|u_k\|}" />
            </li>
          </ul>
        </li>
      </ol>

      <h3 className="text-xl font-semibold mb-2">💡 Key Concepts</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          The result is an <strong>orthonormal set</strong>:{" "}
          <InlineMath math="\langle q_i, q_j \rangle = 0 \;\; (i \neq j)" /> and{" "}
          <InlineMath math="\|q_i\| = 1" />.
        </li>
        <li>
          Works in any finite-dimensional inner product space (not just{" "}
          <InlineMath math="\mathbb{R}^n" />
          ).
        </li>
        <li>
          If vectors are linearly dependent, one step produces{" "}
          <InlineMath math="u_k = 0" />, and the process stops.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">🚀 Applications</h3>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>Constructing orthonormal bases.</li>
        <li>QR decomposition of matrices.</li>
        <li>Simplifying computations in linear algebra.</li>
        <li>Used in numerical methods and signal processing.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">🧠 Example</h3>
      <p className="mb-2">Suppose we have:</p>
      <BlockMath
        math={
          "v_1 = \\begin{bmatrix}1 \\\\ 1 \\\\ 0\\end{bmatrix}, \\quad v_2 = \\begin{bmatrix}1 \\\\ 0 \\\\ 1\\end{bmatrix}"
        }
      />
      <p className="mb-2">
        Step 1: Normalize <InlineMath math="v_1" />
      </p>
      <BlockMath
        math={
          "q_1 = \\frac{1}{\\sqrt{2}} \\begin{bmatrix}1 \\\\ 1 \\\\ 0\\end{bmatrix}"
        }
      />
      <p className="mb-2">Step 2: Subtract projection and normalize:</p>
      <BlockMath math={"u_2 = v_2 - \\langle v_2, q_1 \\rangle q_1"} />
      <BlockMath math={"q_2 = \\frac{u_2}{\\|u_2\\|}"} />
    </div>
  );
};

export default GramSchmidtInfo;
