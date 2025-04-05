import NavBar from "@/components/NavBar";

const MortgageCalculator = () => {
  return (
    <>
      <NavBar />
      {/* 🔽 Contenedor principal */}
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Mortgage Calculator
        </h1>
      </div>
    </>
  );
};

export default MortgageCalculator;
