"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const InverseInfo = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-md p-4 sm:p-6 md:p-8 mt-6 sm:mt-10 text-gray-800 max-w-[1200px] mx-auto w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        📚 Understanding Matrix Inverse
      </h2>

      <p className="mb-4 text-sm sm:text-base break-words">
        The <strong>inverse of a square matrix</strong> is denoted as{" "}
        <InlineMath math="A^{-1}" /> and is defined such that{" "}
        <InlineMath math="A \cdot A^{-1} = I" />, where <InlineMath math="I" />{" "}
        is the identity matrix.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        🔹 When does it exist?
      </h3>
      <p className="mb-4 text-sm sm:text-base break-words">
        A matrix is invertible only if <InlineMath math="\det(A) \neq 0" />. If
        the determinant is 0, the matrix is called <em>singular</em> and has no
        inverse.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        📝 How to calculate it?
      </h3>
      <ul className="list-disc list-inside space-y-2 mb-4 text-sm sm:text-base">
        <li>
          <strong>For 2×2 matrices:</strong>
          <div className="overflow-x-auto w-full">
            <BlockMath
              math="A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}, \quad 
              A^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}"
            />
          </div>
        </li>
        <li>
          <strong>For 3×3 matrices:</strong> use the <em>adjugate method</em>{" "}
          (matrix of cofactors, transposed, divided by the determinant).
        </li>
        <li>
          <strong>General case (n×n):</strong> apply{" "}
          <em>Gauss–Jordan elimination</em> on{" "}
          <InlineMath math="[A \, | \, I]" /> until it becomes{" "}
          <InlineMath math="[I \, | \, A^{-1}]" />.
        </li>
      </ul>

      <h3 className="text-lg sm:text-xl font-semibold mb-2">💡 Key points</h3>
      <p className="text-sm sm:text-base leading-relaxed break-words">
        • Not all matrices have an inverse. <br />• Inverses are essential in
        solving linear systems <InlineMath math="Ax = b" /> (solution:{" "}
        <InlineMath math="x = A^{-1}b" />
        ). <br />• For large matrices, computing the inverse is expensive —
        often we solve systems directly instead of finding{" "}
        <InlineMath math="A^{-1}" />.
      </p>
    </div>
  );
};

export default InverseInfo;
