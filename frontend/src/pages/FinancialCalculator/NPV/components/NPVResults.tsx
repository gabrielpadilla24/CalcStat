type NPVResultProps = {
  npv: number;
  years: number;
  interestRate: number;
  futureValue?: number;
};

const NPVResults = ({
  npv,
  futureValue,
  years,
  interestRate,
}: NPVResultProps) => {
  if (
    typeof npv !== "number" ||
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
    <div className="mt-8 sm:mt-10 bg-green-50 border border-green-200 p-4 sm:p-6 rounded-xl shadow-inner text-center w-full max-w-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">
        Net Present Value Summary
      </h2>

      {futureValue !== undefined && (
        <p className="text-gray-700 mb-1 text-sm sm:text-base">
          <strong>Future Value:</strong> ${futureValue.toLocaleString()}
        </p>
      )}

      <p className="text-gray-700 mb-1 text-sm sm:text-base">
        <strong>Years:</strong> {years}
      </p>

      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        <strong>Discount Rate:</strong> {interestRate}%
      </p>

      <p className="text-lg sm:text-xl font-bold text-gray-900">
        Net Present Value: ${npv.toLocaleString()}
      </p>
    </div>
  );
};

export default NPVResults;
