import NavBar from "@/components/NavBar";
import RefinanceForm from "./components/RefinanceForm";

const RefinanceCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-5xl mx-auto pt-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Refinance Mortgage Calculator
        </h1>
        <RefinanceForm />
      </div>
    </div>
  );
};

export default RefinanceCalculator;
