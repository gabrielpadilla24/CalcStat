// src/pages/calculus/CriticalPointsCalculator.tsx
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const CriticalPointsCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Critical Points / Extrema
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6"></div>
        {/* Columna izquierda*/}
        <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
          <div className="w-full">{/* Aquí va el input para la función */}</div>
        </div>
      </div>
      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default CriticalPointsCalculator;
