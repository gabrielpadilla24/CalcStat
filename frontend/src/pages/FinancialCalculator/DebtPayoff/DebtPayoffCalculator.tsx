import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DebtPayoffForm from "./components/DebtPayoffForm";

const DebtPayoffCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Debt Payoff Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-[600px]">
            <DebtPayoffForm onResult={() => {}} />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default DebtPayoffCalculator;
