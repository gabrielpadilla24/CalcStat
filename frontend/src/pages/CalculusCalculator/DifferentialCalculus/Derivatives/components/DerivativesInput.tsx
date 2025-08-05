import React, { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

addStyles();

type DerivativesInputProps = {
  onResult: (
    expression: string,
    derivative: string,
    steps?: string[],
    rule?: string,
    expressionLatex?: string,
    derivativeLatex?: string
  ) => void;
};

const DerivativesInput: React.FC<DerivativesInputProps> = ({ onResult }) => {
  const [latex, setLatex] = useState("");

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://localhost:8000/derivatives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ equation: latex }),
      });

      if (!response.ok) throw new Error("Error sending request");

      const data = await response.json();
      console.log("Backend response:", data);

      // ✅ Llamamos a onResult con todos los datos necesarios
      onResult(
        data.original,
        data.derivative,
        data.steps,
        data.tipo,
        data.original_latex,
        data.derivative_latex
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[500px] bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="flex flex-col items-center text-center">
          <label className="text-lg font-medium text-gray-700 mb-4">
            Enter a function to differentiate:
          </label>

          <EditableMathField
            latex={latex}
            onChange={(mathField) => setLatex(mathField.latex())}
            className="text-xl w-full border border-gray-300 px-4 py-2 mb-6 rounded-lg bg-white focus:outline-none"
          />

          <p className="text-sm text-gray-500 mb-4">
            Examples: <code>sin(x)</code>, <code>log(x)</code>, <code>1/x</code>
            , <code>x^2</code>, <code>e^x</code>
          </p>

          <button
            onClick={handleCalculate}
            className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition"
          >
            Calculate Derivative
          </button>
        </div>
      </div>
    </div>
  );
};

export default DerivativesInput;
