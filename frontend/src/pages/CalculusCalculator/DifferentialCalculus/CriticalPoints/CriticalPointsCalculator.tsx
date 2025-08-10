// src/pages/calculus/CriticalPointsCalculator.tsx
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const CriticalPointsCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Critical Points / Extrema
          </h1>
          <p className="text-gray-600 text-lg">Coming Soon...</p>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default CriticalPointsCalculator;
