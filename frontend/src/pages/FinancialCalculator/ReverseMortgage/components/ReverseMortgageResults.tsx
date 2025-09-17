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
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-green-50 border border-green-300 p-4 sm:p-6 md:p-8 rounded-2xl shadow w-full max-w-3xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">
          Reverse Mortgage Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center text-gray-700">
          <p>
            <strong>Payout Type:</strong> {type}
          </p>
          <p>
            <strong>Years:</strong> {years}
          </p>
          <p>
            <strong>Annual Interest Rate:</strong> {interestRate}%
          </p>
          <p className="sm:col-span-2 text-lg sm:text-xl font-bold text-gray-900 mt-4">
            Amount Owed at End: ${amountOwedAtEnd.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReverseMortgageResults;
