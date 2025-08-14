import { useState } from "react";
import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import BottomCTA from "@/components/BottomCTA";
import { Link } from "react-router-dom";

const CalculusLandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const showMainCards = selectedCategory === "All";
  const showSingle = selectedCategory === "Single";
  //const showMulti = selectedCategory === "Multi";
  //const showIntegral = selectedCategory === "Integrals";

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Calculus Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Choose the branch of calculus you want to explore. We’ll help you
          solve step by step and visualize the results.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center gap-4 flex-wrap mb-10 px-4">
        {[
          { label: "All Topics", value: "All" },
          { label: "Single Variable", value: "Single" },
          { label: "Multivariable", value: "Multi" },
          { label: "Integrals", value: "Integrals" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedCategory(value)}
            className={`px-5 py-2 rounded-lg transition ${
              selectedCategory === value
                ? "bg-[#5FBA9B] text-white"
                : "bg-white text-[#5FBA9B] border border-[#5FBA9B] hover:bg-[#e0f7f1]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/* --- MAIN SECTION CARDS --- */}
        {showMainCards && (
          <>
            {/* Single Variable Calculus */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/single-variable.png"
                alt="Single Variable"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Single Variable Calculus
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Limits, derivatives, optimization, continuity, and functions of
                a single variable.
              </p>
              <button onClick={() => setSelectedCategory("Single")}>
                <SubmitButton text="Explore Calculators" />
              </button>
            </div>

            {/* Multivariable Calculus */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/multivariable.png"
                alt="Multivariable"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Multivariable Calculus
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Work with functions of several variables. Includes partial
                derivatives, gradients, and surface integrals.
              </p>
              <button onClick={() => setSelectedCategory("Multi")}>
                <SubmitButton text="Explore Calculators" />
              </button>
            </div>

            {/* Integral Calculator */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/integrals.png"
                alt="Integrals"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Integral Calculator
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Compute definite and indefinite integrals. Visualize area under
                curves and step-by-step antiderivatives.
              </p>
              <button onClick={() => setSelectedCategory("Integrals")}>
                <SubmitButton text="Explore Calculators" />
              </button>
            </div>
          </>
        )}

        {/* --- SINGLE VARIABLE SECTION --- */}
        {showSingle && (
          <>
            {/* Card: Derivatives */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/derivatives.png"
                alt="Derivatives"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Derivatives
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Understand the rules. Visualize the change. Learn derivatives
                the smart way.
              </p>
              <Link to="/calculus/derivatives">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>

            {/* Card: Critical Points */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/criticalpoints.png" // cambia por la imagen que quieras
                alt="Critical Points"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Critical Points / Extrema
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Find and classify maxima, minima, and saddle points of
                functions.
              </p>
              <Link to="/calculus/criticalpoints">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>

            {/* Card: Tangent Line */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/tangentline.png" // cambia por la imagen que quieras
                alt="Tangent Line"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Tangent Line
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Calculate the equation of the tangent line to a curve at a
                specific point.
              </p>
              <Link to="/calculus/tangentline">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>

            {/* Card: Inflection Points */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/inflectionpoints.png"
                alt="Inflection Points"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Inflection Points
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Find where the concavity of a function changes. Identify and
                classify inflection points step by step.
              </p>
              <Link to="/calculus/inflectionpoints">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>
          </>
        )}
      </div>

      <BottomCTA buttonText="Explore All Calculators" href="/calculators" />
    </div>
  );
};

export default CalculusLandingPage;
