import NavBar from "@/components/NavBar";
import RefinanceForm from "./components/RefinanceForm";
import BottomCTA from "@/components/BottomCTA";

const RefinanceCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
            Refinance Mortgage Calculator
          </h1>

          <RefinanceForm />
        </div>
      </main>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </div>
  );
};

export default RefinanceCalculator;
