interface NPVResultsProps {
  result: {
    npv: number;
    futureValue: number;
    years: number;
    interestRate: number;
  };
}

const NPVResults = ({ result }: NPVResultsProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
      <h2 className="text-xl font-semibold mb-2">NPV Result</h2>
      <p className="text-lg">
        <strong>Future Value:</strong> ${result.futureValue.toFixed(2)}
      </p>
      <p className="text-lg">
        <strong>Discount Rate:</strong> {result.interestRate.toFixed(2)}%
      </p>
      <p className="text-lg">
        <strong>Years:</strong> {result.years}
      </p>
      <p className="text-xl mt-4 text-green-600 font-bold">
        Net Present Value: ${result.npv.toFixed(2)}
      </p>
    </div>
  );
};

export default NPVResults;
