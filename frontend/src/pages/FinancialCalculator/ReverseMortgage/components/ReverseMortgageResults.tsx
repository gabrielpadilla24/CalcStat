import React from "react";

type ReverseMortgageResultsProps = {
  amountOwedAtEnd: number;
  type: "Lump Sum" | "Monthly Advance";
  years: number;
  interestRate: number;
};

const ReverseMortgageResults: React.FC<ReverseMortgageResultsProps> = ({
  amountOwedAtEnd,
  type,
  years,
  interestRate,
}) => {
  return (
    <div className="mt-8 bg-green-50 border border-green-300 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-green-800 mb-4">
        Reverse Mortgage Summary
      </h2>
      <p className="text-gray-800">
        <strong>Payout Type:</strong> {type}
      </p>
      <p className="text-gray-800">
        <strong>Years:</strong> {years}
      </p>
      <p className="text-gray-800">
        <strong>Annual Interest Rate:</strong> {interestRate}%
      </p>
      <p className="text-gray-900 text-lg mt-4">
        <strong>Amount Owed at End:</strong> $
        {amountOwedAtEnd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default ReverseMortgageResults;
