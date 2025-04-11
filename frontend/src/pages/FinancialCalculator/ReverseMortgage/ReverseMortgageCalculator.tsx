import ReverseMortgageForm from "./components/ReverseMortgageForm";
import NavBar from "@/components/NavBar";

const ReverseMortgageCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-5xl mx-auto pt-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Reverse Mortgage Calculator
        </h1>
        <ReverseMortgageForm />
      </div>
    </div>
  );
};

export default ReverseMortgageCalculator;
