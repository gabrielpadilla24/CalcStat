import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import SubmitButton from "@/components/SubmitButton";
import BottomCTA from "@/components/BottomCTA";

const FinancialCalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const showCompound =
    selectedCategory === "All" || selectedCategory === "Compound";

  const showMortgage =
    selectedCategory === "All" || selectedCategory === "Loan";

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header Section */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Financial Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Plan smarter. Whether you're calculating interest, loans, or
          investments — our financial tools help you stay ahead.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center gap-4 flex-wrap mb-10 px-4">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-lg transition ${
            selectedCategory === "All"
              ? "bg-[#5FBA9B] text-white"
              : "bg-white text-[#5FBA9B] border border-[#5FBA9B] hover:bg-[#e0f7f1]"
          }`}
        >
          All Financial
        </button>
        <button
          onClick={() => setSelectedCategory("Compound")}
          className={`px-5 py-2 rounded-lg transition ${
            selectedCategory === "Compound"
              ? "bg-[#5FBA9B] text-white"
              : "bg-white text-[#5FBA9B] border border-[#5FBA9B] hover:bg-[#e0f7f1]"
          }`}
        >
          Compound
        </button>
        <button
          onClick={() => setSelectedCategory("Loan")}
          className={`px-5 py-2 rounded-lg transition ${
            selectedCategory === "Loan"
              ? "bg-[#5FBA9B] text-white"
              : "bg-white text-[#5FBA9B] border border-[#5FBA9B] hover:bg-[#e0f7f1]"
          }`}
        >
          Loan
        </button>
        <button
          onClick={() => setSelectedCategory("Investment")}
          className={`px-5 py-2 rounded-lg transition ${
            selectedCategory === "Investment"
              ? "bg-[#5FBA9B] text-white"
              : "bg-white text-[#5FBA9B] border border-[#5FBA9B] hover:bg-[#e0f7f1]"
          }`}
        >
          Investment
        </button>
        <button
          onClick={() => setSelectedCategory("Savings")}
          className={`px-5 py-2 rounded-lg transition ${
            selectedCategory === "Savings"
              ? "bg-[#5FBA9B] text-white"
              : "bg-white text-[#5FBA9B] border border-[#5FBA9B] hover:bg-[#e0f7f1]"
          }`}
        >
          Savings
        </button>
      </div>

      {/* Financial Calculator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {showCompound && (
          <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left">
            <img
              src="/img/compound.png"
              alt="Compound Interest Calculator"
              className="h-40 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Compound Interest Calculator
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Calculate compound growth over time. Great for savings,
              investments, and long-term financial planning.
            </p>
            <Link to="/compoundinterest">
              <SubmitButton text="Open Calculator" />
            </Link>
          </div>
        )}

        {showMortgage && (
          <>
            {/* General Mortgage Calculator */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left">
              <img
                src="/img/mortgage.png"
                alt="Mortgage Payments Calculator"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Mortgage Payments Calculator
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Calculate your monthly mortgage payments. Perfect for home
                buyers, refinancing, and long-term loan planning.
              </p>
              <Link to="/mortgage">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>

            {/* Fixed Rate */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left">
              <img
                src="/img/fixedrate.png"
                alt="Fixed Rate Mortgage Calculator"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Fixed Rate Mortgage
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Calculate predictable monthly payments with fixed interest
                rates.
              </p>
              <Link to="/mortgage/fixed">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>

            {/* ARM */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left">
              <img
                src="/img/arm.png"
                alt="Adjustable Rate Mortgage Calculator"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                ARM (Adjustable Rate)
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Explore flexible mortgages with interest rates that may change
                over time.
              </p>
              <Link to="/mortgage/arm">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>

            {/* Interest Only */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left">
              <img
                src="/img/interestonly.png"
                alt="Interest Only Mortgage Calculator"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Interest-Only Mortgage
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Calculate payments for interest-only periods and plan ahead.
              </p>
              <Link to="/mortgage/interest-only">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>

            {/* Balloon Payment */}
            <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left">
              <img
                src="/img/balloon.png"
                alt="Balloon Payment Mortgage Calculator"
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Balloon Payment Mortgage
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                See how large final payments affect your mortgage plan.
              </p>
              <Link to="/mortgage/balloon">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>
          </>
        )}
      </div>

      <BottomCTA buttonText="Browse All Calculators" href="/calculators" />
    </div>
  );
};

export default FinancialCalculator;
