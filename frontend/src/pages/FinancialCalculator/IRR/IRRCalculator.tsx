import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import IRRForm from "./components/IRRForm";

const IRRCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Internal Rate of Return Calculator
        </h1>

        <div className="flex justify-center">
          <IRRForm />
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default IRRCalculator;
