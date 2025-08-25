"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const EigenInfo = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        📚 Understanding Eigenvalues & Eigenvectors
      </h2>

      <p className="mb-4">
        Given a square matrix{" "}
        <InlineMath math="A \in \mathbb{R}^{n \times n}" />, a{" "}
        <strong>eigenvector</strong> <InlineMath math="v \neq 0" /> and its{" "}
        <strong>eigenvalue</strong> <InlineMath math="\lambda" /> satisfy{" "}
        <InlineMath math="A\,v = \lambda\,v" />. Geometrically,{" "}
        <InlineMath math="A" /> scales (and possibly flips){" "}
        <InlineMath math="v" /> without changing its direction.
      </p>

      <h3 className="text-xl font-semibold mb-2">
        📝 How are eigenvalues found?
      </h3>
      <p className="mb-2">
        They are roots of the <em>characteristic equation</em>:
      </p>
      <BlockMath math="\det(A - \lambda I) = 0" />
      <p className="mb-4">
        For each eigenvalue <InlineMath math="\lambda" />, an eigenvector is any
        non‑zero solution of <InlineMath math="(A - \lambda I)\,v = 0" /> (i.e.,
        the nullspace).
      </p>

      <h3 className="text-xl font-semibold mb-2">🔧 Practical workflow</h3>
      <ol className="list-decimal list-inside space-y-2 mb-4">
        <li>
          Build <InlineMath math="A - \lambda I" /> and compute{" "}
          <InlineMath math="\det(A - \lambda I)" />.
        </li>
        <li>
          Solve <InlineMath math="\det(A - \lambda I)=0" /> to get eigenvalues{" "}
          <InlineMath math="\{\lambda_i\}" />.
        </li>
        <li>
          For each <InlineMath math="\lambda_i" />, solve{" "}
          <InlineMath math="(A - \lambda_i I)v=0" /> to obtain eigenvectors.
        </li>
        <li>
          (Optional) Verify numerically:{" "}
          <InlineMath math="A v \approx \lambda v" />.
        </li>
      </ol>

      <h3 className="text-xl font-semibold mb-2">💡 Key concepts</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          <strong>Algebraic vs. geometric multiplicity:</strong>{" "}
          <InlineMath math="\text{alg mult}(\lambda)" /> is its root
          multiplicity;{" "}
          <InlineMath math="\text{geom mult}(\lambda)=\dim\ker(A-\lambda I)" />.
          Always <InlineMath math="\text{geom} \le \text{alg}" />.
        </li>
        <li>
          <strong>Diagonalization:</strong>{" "}
          <InlineMath math="A = P \Lambda P^{-1}" /> if and only if the
          eigenvectors form a basis (sum of geometric multiplicities equals{" "}
          <InlineMath math="n" />
          ).
        </li>
        <li>
          <strong>Symmetric real matrices:</strong> eigenvalues are real and
          there exists an <em>orthonormal</em> eigenbasis:{" "}
          <InlineMath math="A = Q \Lambda Q^{\mathsf T}" /> (Spectral Theorem).
        </li>
        <li>
          <strong>Scaling/normalization:</strong> any non‑zero multiple of an
          eigenvector is also an eigenvector; it’s common to normalize{" "}
          <InlineMath math="\|v\|=1" />.
        </li>
        <li>
          <strong>Complex cases:</strong> real matrices can have complex
          eigenvalues/eigenvectors, appearing in conjugate pairs.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">🚀 Applications</h3>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>
          Principal Component Analysis (PCA) and dimensionality reduction.
        </li>
        <li>Stability analysis of dynamical systems.</li>
        <li>Vibration modes in mechanical/structural systems.</li>
        <li>
          Markov chains (stationary distributions via eigenvectors of{" "}
          <InlineMath math="P^{\mathsf T}" />
          ).
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">🧠 Tips</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>
          Numerical routines (e.g., QR algorithm, power iteration) are preferred
          for large matrices.
        </li>
        <li>
          If <InlineMath math="\det(A)=0" />, then <InlineMath math="0" /> is an
          eigenvalue.
        </li>
        <li>Eigenvectors for distinct eigenvalues are linearly independent.</li>
      </ul>
    </div>
  );
};

export default EigenInfo;
