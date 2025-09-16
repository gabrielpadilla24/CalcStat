"use client";

import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const ItoIntegralCalculator = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Itô Integral Calculator
        </h1>

        {/* Aquí luego agregaremos input y resultados */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          <div className="flex-1 max-w-[600px]">{/* INPUT */}</div>
          <div className="flex-1 max-w-[600px]">{/* RESULT */}</div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default ItoIntegralCalculator;
