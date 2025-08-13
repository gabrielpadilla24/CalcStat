import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type TangentLineResultProps = {
  original: string; // ecuación original en LaTeX
  derivative: string; // derivada en LaTeX
  x0: number; // valor de x0
  m: number; // pendiente
  y0: number; // valor de y en x0
  fxTangent: string; // ecuación final de la tangente en LaTeX
};

const TangentLineResult: React.FC<TangentLineResultProps> = ({
  original,
  derivative,
  x0,
  m,
  y0,
  fxTangent,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">📐 Tangent Line Result</h2>

      {/* Función original */}
      <p className="mb-2">
        <strong>Function:</strong> <BlockMath math={original} />
      </p>

      {/* Derivada */}
      <p className="mb-2">
        <strong>Derivative:</strong> <BlockMath math={derivative} />
      </p>

      {/* Cálculo paso a paso */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Step-by-Step</h3>

        {/* Paso 1: fórmula de m */}
        <p className="mb-2">
          Formula for slope:
          <BlockMath math={"m = f'(x_0)"} />
        </p>
        {/* Sustitución en m */}
        <BlockMath math={`m = ${derivative.replace(/x/g, `(${x0})`)}`} />
        <BlockMath math={`m = ${m}`} />

        {/* Paso 2: fórmula de y₀ */}
        <p className="mt-4 mb-2">
          Formula for y-intercept point:
          <BlockMath math={"y_0 = f(x_0)"} />
        </p>
        {/* Sustitución en y₀ */}
        <BlockMath math={`y_0 = ${original.replace(/x/g, `(${x0})`)}`} />
        <BlockMath math={`y_0 = ${y0}`} />

        {/* Paso 3: ecuación de la tangente */}
        <p className="mt-4 mb-2">
          Tangent line equation:
          <BlockMath math={"y = m(x - x_0) + y_0"} />
        </p>
        {/* Sustitución en la ecuación */}
        <BlockMath math={`y = ${m}(x - ${x0}) + ${y0}`} />
        <p className="text-center font-bold">{fxTangent}</p>
      </div>
    </div>
  );
};

export default TangentLineResult;
