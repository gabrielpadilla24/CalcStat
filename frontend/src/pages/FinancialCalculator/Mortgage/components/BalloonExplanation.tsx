import React from "react";

const BalloonExplanation: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-[1200px] mx-auto border border-gray-200">
      <h1 className="text-4xl font-bold text-center mt-2 mb-6 text-gray-900">
        🎈 What is a Balloon Mortgage?
      </h1>

      <p className="mb-4">
        A <strong>Balloon Mortgage</strong> starts off with regular monthly
        payments that are calculated as if you were paying off the loan over a
        standard term, such as 30 years. However, the loan actually ends much
        earlier — at a predefined year known as the{" "}
        <strong>balloon year</strong>.
      </p>

      <p className="mb-4">
        🧮 For example, you might make monthly payments for 7 years (84 months)
        like a 30-year mortgage, but at the end of year 7, you’ll be required to
        pay off the remaining balance in one lump sum — this is called the{" "}
        <strong>Balloon Payment</strong>.
      </p>

      <p className="mb-4">
        💥 This final payment can be quite large depending on your interest rate
        and how much of the principal you've paid down. It’s important to plan
        for that large payment — either by refinancing, selling, or having the
        funds ready.
      </p>

      <p className="mb-4">
        🧠 <strong>Why choose a Balloon Mortgage?</strong> It often comes with
        lower monthly payments and may be ideal if you plan to sell or refinance
        before the balloon payment is due.
      </p>

      <p className="mb-4">
        ⚠️ <strong>Risk:</strong> If you’re not prepared to make the balloon
        payment or can’t refinance in time, it can lead to financial strain or
        even foreclosure.
      </p>

      <p className="text-sm text-gray-600 text-center mt-6 italic">
        Always consult with a financial advisor before choosing a balloon
        mortgage. 💼
      </p>
    </div>
  );
};

export default BalloonExplanation;
