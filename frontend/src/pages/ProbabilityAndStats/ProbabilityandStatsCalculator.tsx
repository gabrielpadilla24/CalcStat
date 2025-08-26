"use client";

import NavBar from "@/components/NavBar";
//import SubmitButton from "@/components/SubmitButton";
//import { Link } from "react-router-dom";

const ProbabilityAndStatsCalculator = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Probability and Statistics Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Choose a calculator to explore concepts step by step and visualize the
          results.
        </p>
      </div>

      {/* Cards (Prob & Stats) */}
    </div>
  );
};

export default ProbabilityAndStatsCalculator;
