"use client";

import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import BottomCTA from "@/components/BottomCTA";
import { Link } from "react-router-dom";

const CalculusLandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Calculus Calculators
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl">
          Choose the branch of calculus you want to explore. We’ll help you
          solve step by step and visualize the results.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/* Derivatives */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between">
          <img
            src="/img/derivatives.webp"
            alt="Derivatives"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Derivatives
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Understand the rules. Visualize the change. Learn derivatives the
            smart way.
          </p>
          <Link to="/calculus/derivatives">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Critical Points */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between">
          <img
            src="/img/criticalpoints.webp"
            alt="Critical Points"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Critical Points / Extrema
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Find and classify maxima, minima, and saddle points of functions.
          </p>
          <Link to="/calculus/criticalpoints">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Tangent Line */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between">
          <img
            src="/img/tangentline.webp"
            alt="Tangent Line"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Tangent Line
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Calculate the equation of the tangent line to a curve at a specific
            point.
          </p>
          <Link to="/calculus/tangentline">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Inflection Points */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between">
          <img
            src="/img/inflectionpoints.webp"
            alt="Inflection Points"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
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

        {/* Implicit Differentiation */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between">
          <img
            src="/img/implicitdifferentiation.webp"
            alt="Implicit Differentiation"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Implicit Differentiation
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Differentiate equations that define y implicitly.
          </p>
          <Link to="/calculus/implicitdiff">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Limits */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between">
          <img
            src="/img/limits.webp"
            alt="Limits"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Limits
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Calculate limits of functions at specific points.
          </p>
          <Link to="/calculus/limits">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>
      </div>

      <BottomCTA buttonText="Explore All Calculators" href="/calculators" />
    </div>
  );
};

export default CalculusLandingPage;
