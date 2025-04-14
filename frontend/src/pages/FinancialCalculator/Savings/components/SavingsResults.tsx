import React from "react";

type SavingsResultsProps = {
  contribution: number;
};

const SavingsResults: React.FC<SavingsResultsProps> = ({ contribution }) => {
  return (
    <div className="animate-fade-in-up bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm text-center">
      <h3 className="text-xl font-semibold text-green-800 mb-2">
        🎯 Monthly Contribution Needed
      </h3>
      <p className="text-3xl font-bold text-green-900">
        $
        {contribution.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Save this amount each month to reach your goal on time.
      </p>
    </div>
  );
};

export default SavingsResults;
