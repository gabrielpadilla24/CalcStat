import React from "react";

const SavingsInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-5xl mx-auto mt-6 text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        📚 How This Calculator Works
      </h1>

      <p className="mb-4 text-base leading-relaxed sm:text-lg">
        This calculator helps you plan monthly savings to reach a goal — whether
        it's 🎓 education, 🚗 a new car, 🏠 a down payment, or ✈️ your next
        adventure.
      </p>

      <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-3">
        <li>
          🎯 <strong>Set your target:</strong> Enter how much you want to save,
          in how many years, and the expected interest rate.
        </li>
        <li>
          📆 <strong>Monthly contributions:</strong> The tool assumes you’ll
          contribute the same amount every month.
        </li>
        <li>
          📈 <strong>Compound growth:</strong> Interest is compounded monthly to
          simulate realistic growth.
        </li>
        <li>
          🧮 <strong>Smart calculations:</strong> It computes the exact monthly
          amount needed and visualizes your progress.
        </li>
        <li>
          📊 <strong>Live chart:</strong> The graph shows how your money grows
          each year — including how much was saved vs. how much came from
          interest.
        </li>
      </ul>

      <p className="mt-6 text-sm sm:text-base italic text-gray-600 text-center">
        ⚠️ This tool is for educational purposes only and should not be
        considered financial advice. Talk to a certified advisor for
        personalized guidance.
      </p>
    </div>
  );
};

export default SavingsInfo;
