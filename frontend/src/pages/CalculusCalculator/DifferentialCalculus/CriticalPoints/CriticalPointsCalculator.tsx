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

        <p className="text-gray-600 text-lg text-center">Coming Soon...</p>
      </div>
      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default CriticalPointsCalculator;
