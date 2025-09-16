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
        {/*Brownian Motion Simulator */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/brownian.png"
            alt="Brownian Motion Simulator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Brownian Motion Simulator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore the Brownian motion and its properties.
          </p>
          <Link to="/stochastic/brownian">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Ito Integral Calculator */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/ito_integral.png"
            alt="Itô Integral Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Itô Integral Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Calculate Itô integrals for various stochastic processes.
          </p>
          <Link to="/stochastic/itointegral">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Ito Lemma Calculator */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/ito_lemma.png"
            alt="Itô's Lemma Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Itô's Lemma Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Apply Itô's lemma to different stochastic functions.
          </p>
          <Link to="/stochastic/itolemma">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* SDE Solver */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/sde.png"
            alt="SDE Solver"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">SDE Solver</h2>
          <p className="text-sm text-gray-600 mb-4">
            Solve stochastic differential equations using the Euler–Maruyama
            method.
          </p>
          <Link to="/stochastic/sde">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Martingale Tester */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/martingale.png"
            alt="Martingale Tester"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Martingale Tester
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Test various martingale strategies and their outcomes.
          </p>
          <Link to="/stochastic/martingale">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Expected Value Calculator */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/ev.png"
            alt="Expected Value Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Expected Value Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Calculate the expected value of various stochastic processes.
          </p>
          <Link to="/stochastic/ev">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StochasticCalculator;
