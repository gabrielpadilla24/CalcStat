import { useEffect, useState } from "react";

type IRRResultProps = {
  irr: number;
  cashFlows: number[];
};

const IRRResults = ({ irr, cashFlows }: IRRResultProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 40); // Delay para transición
    return () => clearTimeout(timer);
  }, []);

  if (typeof irr !== "number" || !Array.isArray(cashFlows)) {
    return (
      <div className="text-red-600 text-center mt-4">
        Error: Missing or invalid result data.
      </div>
    );
  }

  return (
    <div
      className={`mt-10 bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner text-center transform transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Internal Rate of Return Summary
      </h2>

      <p className="text-gray-700 mb-1">
        <strong>Cash Flows:</strong>{" "}
        {cashFlows.map((cf, i) => (
          <span key={i}>
            {cf >= 0 ? `$${cf}` : `-$${Math.abs(cf)}`}
            {i < cashFlows.length - 1 && ", "}
          </span>
        ))}
      </p>

      <p className="text-xl font-bold text-gray-900 mt-4">
        IRR: {irr.toFixed(2)}%
      </p>
    </div>
  );
};

export default IRRResults;
