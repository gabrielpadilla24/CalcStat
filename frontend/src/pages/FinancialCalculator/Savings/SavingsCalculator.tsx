import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
// import SavingsForm from "./components/SavingsForm";

const SavingsCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Savings Goal Calculator
        </h1>

        <div className="flex justify-center">
          {/* <SavingsForm /> */}
          <div className="text-center text-gray-600 text-lg">
            Coming soon...
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default SavingsCalculator;
