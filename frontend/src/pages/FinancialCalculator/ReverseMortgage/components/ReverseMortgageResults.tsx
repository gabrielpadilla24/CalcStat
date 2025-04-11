import React from "react";

type ReverseMortgageResultProps = {
  type: "Lump Sum" | "Monthly Advance";
  years: number;
  interestRate: number;
  amountOwedAtEnd: number;
};

const ReverseMortgageResults: React.FC<ReverseMortgageResultProps> = ({
  type,
  years,
  interestRate,
  amountOwedAtEnd,
}) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-green-50 border border-green-300 p-6 rounded-2xl shadow w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Reverse Mortgage Summary
        </h2>
        <p className="text-gray-700 mb-1">
          <strong>Payout Type:</strong> {type}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Years:</strong> {years}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Annual Interest Rate:</strong> {interestRate}%
        </p>
        <p className="text-xl font-bold text-gray-900">
          Amount Owed at End: ${amountOwedAtEnd.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ReverseMortgageResults;
