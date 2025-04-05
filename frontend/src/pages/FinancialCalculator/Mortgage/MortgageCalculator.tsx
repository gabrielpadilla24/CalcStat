import NavBar from "@/components/NavBar";
import MortgageForm from "./components/MortgageForm";

const MortgageCalculator = () => {
  return (
    <>
      <NavBar />
      {/* 🔽 Contenedor principal */}
      <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-12">
          Mortgage Calculator
        </h1>
        <MortgageForm />
      </div>
    </>
  );
};

export default MortgageCalculator;
