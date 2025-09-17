import React from "react";

const GrowthComparisonInfo: React.FC = () => {
  return (
    <div className="bg-white mt-6 rounded-xl shadow-md p-4 sm:p-6 md:p-8 w-full max-w-4xl lg:max-w-5xl mx-auto text-center">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-800">
        📘 How This Calculator Works
      </h3>

      <p className="text-gray-700 text-sm sm:text-base mb-4">
        This tool helps you visualize how your investment grows over time
        depending on the return rate. You enter an initial amount, two return
        rates, and the time period, and we’ll show you the difference in growth.
      </p>

      <ul className="text-left text-gray-700 list-disc list-inside mb-4 space-y-2 text-sm sm:text-base">
        <li>📈 Compound growth is calculated annually for each return rate.</li>
        <li>
          💰 The initial amount stays the same across both rates to ensure a
          fair comparison.
        </li>
        <li>
          ⏳ The longer the investment period, the more noticeable the
          difference becomes — especially with higher rates.
        </li>
      </ul>

      <p className="text-gray-600 text-xs sm:text-sm">
        This calculator is for educational purposes only and does not constitute
        financial advice. Always consult a certified advisor before making
        investment decisions.
      </p>
    </div>
  );
};

export default GrowthComparisonInfo;
