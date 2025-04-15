import React from "react";

type GrowthComparisonResultsProps = {
  finalValues: number[] | null;
  interestRates: number[] | null;
};

const GrowthComparisonResults: React.FC<GrowthComparisonResultsProps> = ({
  finalValues,
  interestRates,
}) => {
  if (
    !finalValues ||
    !interestRates ||
    finalValues.length !== interestRates.length
  ) {
    return null;
  }

  return (
    <div className="animate-fade-in-up bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm text-center mt-4 ">
      <h3 className="text-xl font-semibold text-blue-800 mb-2">
        📊 Final Value Comparison
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-900">
        {interestRates.map((rate, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-600 mb-1">
              Return Rate {index + 1}
            </p>
            <p className="text-xl font-semibold">{rate}%</p>
            <p className="text-2xl font-bold mt-1">
              $
              {finalValues[index].toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600 mt-4">
        This is the projected value of your investment for each return rate.
      </p>
    </div>
  );
};

export default GrowthComparisonResults;
