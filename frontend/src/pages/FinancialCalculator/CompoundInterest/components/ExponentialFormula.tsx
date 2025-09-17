import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface ExponentialFormulaProps {
  P: number;
  r: number;
  t: number;
  C: number;
  frequency: string;
  showSubstituted: boolean;
}

const ExponentialFormula: React.FC<ExponentialFormulaProps> = ({
  P,
  r,
  t,
  C,
  frequency,
  showSubstituted,
}) => {
  const rawAnnualC = frequency === "Monthly" ? C * 12 : C;
  const annualC = Number(rawAnnualC.toFixed(1));

  const generalFormula = String.raw`
    FV = P \cdot (1 + r)^t + C \cdot \left( \frac{(1 + r)^t - 1}{r} \right)
  `;

  const substitutedFormula = String.raw`
    FV = ${P} \cdot (1 + ${r})^{${t}} + ${annualC} \cdot \left( \frac{(1 + ${r})^{${t}} - 1}{${r}} \right)
  `;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 mt-8 max-w-4xl md:max-w-6xl mx-auto border border-gray-200">
      {/* Título */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-8 mb-4">
        📐 Formula Breakdown
      </h1>

      {/* Subtítulo */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        📘 Formula Used
      </h2>

      <p className="mb-2 text-gray-700 text-sm sm:text-base">
        This calculator uses the formula for exponential growth with periodic
        contributions:
      </p>

      {/* Fórmula general */}
      <div className="bg-gray-100 p-3 sm:p-4 rounded text-base overflow-x-auto mb-4 text-center">
        <div className="min-w-[280px] inline-block">
          <BlockMath math={generalFormula} />
        </div>
      </div>

      {/* Fórmula sustituida */}
      {showSubstituted && (
        <>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-6 mb-2">
            🔢 With Your Values
          </h3>
          <div className="bg-yellow-50 p-3 sm:p-4 rounded text-base overflow-x-auto text-center border border-yellow-200">
            <div className="min-w-[280px] inline-block">
              <BlockMath math={substitutedFormula} />
            </div>
          </div>
        </>
      )}

      {/* Explicación */}
      <p className="text-gray-600 text-xs sm:text-sm mt-6 mb-1">
        <strong>Where:</strong>
      </p>
      <ul className="list-disc list-inside text-gray-600 text-xs sm:text-sm space-y-1">
        <li>
          <strong>P</strong>: Initial amount = {P}
        </li>
        <li>
          <strong>r</strong>: Interest rate = {r}
        </li>
        <li>
          <strong>t</strong>: Time in years = {t}
        </li>
        <li>
          <strong>C</strong>: Contribution per period ={" "}
          {frequency === "Monthly" ? `${C} × 12 = ${annualC}` : C}
        </li>
      </ul>
    </div>
  );
};

export default ExponentialFormula;
