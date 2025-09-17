import ReverseMortgageForm from "./components/ReverseMortgageForm";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const ReverseMortgageCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      <main className="flex-grow w-full max-w-5xl mx-auto pt-10 px-4 mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          Reverse Mortgage Calculator
        </h1>
        <ReverseMortgageForm />
      </main>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </div>
  );
};

export default ReverseMortgageCalculator;
