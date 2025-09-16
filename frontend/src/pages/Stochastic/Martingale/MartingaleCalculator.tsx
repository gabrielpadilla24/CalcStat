"use client";

import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const MartingaleCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Martingale Tester
        </h1>

        {/* Inputs + Result (coming soon) */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          <div className="w-full lg:w-1/3 max-w-sm">
            {/* 🔹 MartingaleInput (to be added) */}
          </div>
          <div className="flex-1 max-w-3xl">
            {/* 🔹 MartingaleResult (to be added) */}
          </div>
        </div>

        {/* Info section (coming soon) */}
        <div className="max-w-[1170px] mx-auto px-6 mt-6">
          {/* 🔹 MartingaleInfo (to be added) */}
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default MartingaleCalculator;
