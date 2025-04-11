type IRRResultProps = {
  irr: number;
  cashFlows: number[];
};

const IRRResults = ({ irr, cashFlows }: IRRResultProps) => {
  if (typeof irr !== "number" || !Array.isArray(cashFlows)) {
    return (
      <div className="text-red-600 text-center mt-4">
        Error: Missing or invalid result data.
      </div>
    );
  }

  return (
    <div className="mt-10 bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner text-center">
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
        IRR: {irr.toFixed(4)}%
      </p>
    </div>
  );
};

export default IRRResults;
