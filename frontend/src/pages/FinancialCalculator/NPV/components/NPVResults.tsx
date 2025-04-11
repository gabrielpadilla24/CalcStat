type NPVResultProps = {
  npv: number;
  futureValue: number;
  years: number;
  interestRate: number;
};

const NPVResults = ({
  npv,
  futureValue,
  years,
  interestRate,
}: NPVResultProps) => {
  if (
    typeof npv !== "number" ||
    typeof futureValue !== "number" ||
    typeof years !== "number" ||
    typeof interestRate !== "number"
  ) {
    return (
      <div className="text-red-600 text-center mt-4">
        Error: Missing or invalid result data.
      </div>
    );
  }

  return (
    <div className="mt-10 bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Net Present Value Summary
      </h2>
      <p className="text-gray-700 mb-1">
        <strong>Future Value:</strong> ${futureValue.toLocaleString()}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Years:</strong> {years}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Discount Rate:</strong> {interestRate}%
      </p>
      <p className="text-xl font-bold text-gray-900">
        Net Present Value: ${npv.toLocaleString()}
      </p>
    </div>
  );
};

export default NPVResults;
