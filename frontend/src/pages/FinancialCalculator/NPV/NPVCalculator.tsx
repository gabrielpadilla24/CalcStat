import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import NPVForm from "./components/NPVForm";

const NPVCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          Net Present Value Calculator
        </h1>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <NPVForm />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default NPVCalculator;
