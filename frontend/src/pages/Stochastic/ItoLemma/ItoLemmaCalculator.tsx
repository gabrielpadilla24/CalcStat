"use client";

import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const ItoLemmaCalculator = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Itô’s Lemma Calculator
        </h1>

        {/* Inputs + Result (to be added later) */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          <div className="flex-1 max-w-[600px]">
            {/* ItoLemmaInput will go here */}
          </div>
          <div className="flex-1 max-w-[800px]">
            {/* ItoLemmaResult will go here */}
          </div>
        </div>

        {/* Info card (to be added later) */}
        <div className="max-w-[1170px] mx-auto px-6 mt-6">
          {/* ItoLemmaInfo will go here */}
        </div>
      </div>

      <BottomCTA buttonText="Back to Stochastic Calculus" href="/stochastic" />
    </>
  );
};

export default ItoLemmaCalculator;
