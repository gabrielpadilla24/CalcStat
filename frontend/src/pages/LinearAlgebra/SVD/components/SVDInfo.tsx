"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const SVDInfo = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        📚 Understanding Singular Value Decomposition (SVD)
      </h2>

      <p className="mb-4">
        The <strong>Singular Value Decomposition (SVD)</strong> is a powerful
        factorization that expresses any matrix{" "}
        <InlineMath math="A \in \mathbb{R}^{m \times n}" /> as:
      </p>

      <div className="flex justify-center mb-4">
        <BlockMath math="\mathbf{A} = \mathbf{U}\,\boldsymbol{\Sigma}\,\mathbf{V}^{\top}" />
      </div>

      <h3 className="text-xl font-semibold mb-2">🔎 Components</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          <InlineMath math="\mathbf{U}" />: <InlineMath math="m \times m" />{" "}
          orthogonal matrix (left singular vectors).
        </li>
        <li>
          <InlineMath math="\boldsymbol{\Sigma}" />: diagonal{" "}
          <InlineMath math="m \times n" /> matrix with non-negative{" "}
          <strong>singular values</strong>{" "}
          <InlineMath math="\sigma_1 \geq \sigma_2 \geq \dots \geq 0" />.
        </li>
        <li>
          <InlineMath math="\mathbf{V}" />: <InlineMath math="n \times n" />{" "}
          orthogonal matrix (right singular vectors).
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">📝 Key Properties</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          <strong>Rank</strong>: equals the number of non-zero singular values.
        </li>
        <li>
          <strong>Condition number</strong>:{" "}
          <InlineMath math="\kappa(A) = \frac{\sigma_{\max}}{\sigma_{\min}}" />.
        </li>
        <li>
          <strong>Orthogonality</strong>: columns of <InlineMath math="U" /> and{" "}
          <InlineMath math="V" /> are orthonormal.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">🚀 Applications</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          Principal Component Analysis (PCA) and dimensionality reduction.
        </li>
        <li>Data compression and noise filtering.</li>
        <li>Solving ill-conditioned linear systems.</li>
        <li>Latent Semantic Analysis (LSA) in NLP.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">🧮 Example</h3>
      <p className="mb-2">
        For <InlineMath math="A = \begin{bmatrix}2 & 4 \\ 1 & 2\end{bmatrix}" />
        :
      </p>
      <BlockMath math="\mathbf{A} = \mathbf{U}\,\boldsymbol{\Sigma}\,\mathbf{V}^{\top}" />
      <BlockMath math="\mathbf{U} \approx \begin{bmatrix}-0.894 & -0.447 \\ -0.447 & 0.894\end{bmatrix}" />
      <BlockMath math="\boldsymbol{\Sigma} = \begin{bmatrix}5 & 0 \\ 0 & 0\end{bmatrix}" />
      <BlockMath math="\mathbf{V}^{\top} \approx \begin{bmatrix}-0.447 & -0.894 \\ -0.894 & 0.447\end{bmatrix}" />
    </div>
  );
};

export default SVDInfo;
