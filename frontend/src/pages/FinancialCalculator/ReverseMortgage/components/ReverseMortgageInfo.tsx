import React from "react";

const ReverseMortgageInfo: React.FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-blue-50 border border-blue-300 p-6 rounded-2xl shadow w-full max-w-2xl text-left">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          📘 How Reverse Mortgages Work
        </h2>

        <p className="text-gray-700 mb-4">
          A <strong>reverse mortgage</strong> allows homeowners to borrow
          against the value of their home 🏡 without needing to make monthly
          payments like traditional loans.
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            📍 <strong>Eligibility depends on several factors</strong> —
            including your location, the value of your home, and most
            importantly, your age.
          </li>
          <li>
            🎂 <strong>You usually need to be over 62 years old</strong> to
            qualify for a reverse mortgage in most regions.
          </li>
          <li>
            ⚖️ <strong>Terms can vary</strong> depending on lenders and loan
            types. This is a general educational overview.
          </li>
        </ul>

        <div className="text-gray-700 mb-4">
          🕐 <strong>When do you repay?</strong>
          <br />
          Reverse mortgages don’t have a fixed monthly due date. Instead,
          repayment is usually required when:
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>The home is sold 🏠</li>
            <li>The owner permanently moves out 🧳</li>
            <li>Or even after the owner passes away 🕊️</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 italic mt-6 text-center">
          ⚠️ This calculator is for educational purposes only and does not
          constitute financial advice. Please speak to a certified professional
          before making any major financial decisions.
        </p>
      </div>
    </div>
  );
};

export default ReverseMortgageInfo;
