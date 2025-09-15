"use client";

import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "react-router-dom";

const StochasticCalculator = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Stochastic Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Choose a calculator to explore concepts step by step and visualize the
          results.
        </p>
      </div>

      {/* Cards (Stochastic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/*BINOMIAL DISTRIBUTION */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/binomial.png"
            alt="Binomial Distribution"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Binomial Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore the binomial distribution and its properties.
          </p>
          <Link to="/probabilityandstats/binomialdistribution">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StochasticCalculator;
