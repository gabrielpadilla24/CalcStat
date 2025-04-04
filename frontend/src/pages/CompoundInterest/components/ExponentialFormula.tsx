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
    <div className="bg-white shadow-md rounded-xl p-6 mt-8 max-w-[1350px] mx-auto border border-gray-200">
      <h1 className="text-4xl font-bold text-center mt-12 mb-4">
        📐 Formula Breakdown
      </h1>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        📘 Formula Used
      </h2>

      <p className="mb-2 text-gray-700">
        This calculator uses the formula for exponential growth with periodic
        contributions:
      </p>

      <div className="bg-gray-100 p-4 rounded text-base overflow-x-auto mb-4 text-center">
        <BlockMath math={generalFormula} />
      </div>

      {showSubstituted && (
        <>
          <h3 className="text-md font-semibold text-gray-800 mt-6 mb-2">
            🔢 With Your Values
          </h3>
          <div className="bg-yellow-50 p-4 rounded text-base overflow-x-auto text-center border border-yellow-200">
            <BlockMath math={substitutedFormula} />
          </div>
        </>
      )}

      <p className="text-gray-600 text-sm mt-6 mb-1">
        <strong>Where:</strong>
      </p>
      <ul className="list-disc list-inside text-gray-600 text-sm">
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
