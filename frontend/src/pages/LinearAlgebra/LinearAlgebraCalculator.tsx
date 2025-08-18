import { useState } from "react";
import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import BottomCTA from "@/components/BottomCTA";
import { Link } from "react-router-dom";

const LinearAlgebraCalculator = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Linear Algebra");

  const showLinear = selectedCategory === "Linear Algebra";

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Linear Algebra Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Choose the branch of linear algebra you want to explore. We’ll help
          you solve step by step and visualize the results.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center gap-4 flex-wrap mb-10 px-4">
        {[{ label: "Linear Algebra", value: "Linear Algebra" }].map(
          ({ label, value }) => (
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
          )
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/* --- LINEAR ALGEBRA SECTION --- */}
        {showLinear && (
          <>
            {/* Card: Determinant */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
              <img
                src="/img/determinant.png"
                alt="Determinant"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Determinant
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Understand the rules. Visualize the change. Learn determinants
                the smart way.
              </p>
              <Link to="/linearalgebra/determinant">
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

export default LinearAlgebraCalculator;
