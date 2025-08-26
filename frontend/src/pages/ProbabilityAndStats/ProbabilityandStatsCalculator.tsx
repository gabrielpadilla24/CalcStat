"use client";

import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "react-router-dom";

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

        {/* POISSON DISTRIBUTION */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/poisson.png"
            alt="Poisson Distribution"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Poisson Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore the Poisson distribution and its properties.
          </p>
          <Link to="/probabilityandstats/poissondistribution">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* GEOMETRIC DISTRIBUTION */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/geometric.png"
            alt="Geometric Distribution"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Geometric Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore the geometric distribution and its properties.
          </p>
          <Link to="/probabilityandstats/geometricdistribution">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Normal Distribution */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/normal.png"
            alt="Normal Distribution"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Normal Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore the normal distribution and its properties.
          </p>
          <Link to="/probabilityandstats/normaldistribution">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Exponential Distribution */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/exponential.png"
            alt="Exponential Distribution"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Exponential Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore the exponential distribution and its properties.
          </p>
          <Link to="/probabilityandstats/exponentialdistribution">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* UNIFORM DISTRIBUTION */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/uniform.png"
            alt="Uniform Distribution"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Uniform Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore the uniform distribution and its properties.
          </p>
          <Link to="/probabilityandstats/uniformdistribution">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityAndStatsCalculator;
