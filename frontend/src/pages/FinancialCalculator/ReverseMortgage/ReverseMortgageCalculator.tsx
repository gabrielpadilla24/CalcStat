import ReverseMortgageForm from "./components/ReverseMortgageForm";
const ReverseMortgageCalculator = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Reverse Mortgage Calculator
      </h1>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl">
        <ReverseMortgageForm />
      </div>
    </div>
  );
};

export default ReverseMortgageCalculator;
