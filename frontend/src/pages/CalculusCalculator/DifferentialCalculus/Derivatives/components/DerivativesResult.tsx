import React from "react";

type DerivativesResultProps = {
  expression: string;
  derivative: string;
};

const DerivativesResult: React.FC<DerivativesResultProps> = ({
  expression,
  derivative,
}) => {
  if (!expression || !derivative) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8 max-w-xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4">🧮 Derivative Result</h2>

      <p className="mb-2">
        <span className="font-semibold">Original Expression:</span>{" "}
        <span className="text-blue-600">{expression}</span>
      </p>

      <p>
        <span className="font-semibold">Derivative:</span>{" "}
        <span className="text-green-600">{derivative}</span>
      </p>
    </div>
  );
};

export default DerivativesResult;
