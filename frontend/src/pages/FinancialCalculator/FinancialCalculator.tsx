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

  const showInvestment =
    selectedCategory === "All" || selectedCategory === "Investment";

  const showSavings =
    selectedCategory === "All" || selectedCategory === "Savings";

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
        {[
          { label: "All Financial", value: "All" },
          { label: "Compound", value: "Compound" },
          { label: "Loan", value: "Loan" },
          { label: "Investment", value: "Investment" },
          { label: "Savings", value: "Savings" },
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

      {/* Financial Calculator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/* Compound Interest */}
        {showCompound && (
          <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left flex flex-col justify-between">
            <img
              src="/img/compound.png"
              alt="Compound Interest Calculator"
              className="h-40 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Compound Interest Calculator
            </h2>
            <div className="flex flex-col justify-between h-full">
              <p className="text-sm text-gray-600 mb-4">
                Calculate compound growth over time. Great for savings,
                investments, and long-term financial planning.
              </p>
              <Link to="/compoundinterest">
                <SubmitButton text="Open Calculator" />
              </Link>
            </div>
          </div>
        )}

        {/* Mortgage-related cards */}
        {showMortgage &&
          [
            {
              title: "Mortgage Payments Calculator",
              desc: "Calculate your monthly mortgage payments. Perfect for home buyers, refinancing, and long-term loan planning.",
              img: "/img/mortgage.png",
              path: "/mortgage",
            },
            {
              title: "Fixed Rate Mortgage",
              desc: "Calculate predictable monthly payments with fixed interest rates.",
              img: "/img/fixedrate.png",
              path: "/mortgage/fixed",
            },
            {
              title: "ARM (Adjustable Rate)",
              desc: "Explore flexible mortgages with interest rates that may change over time.",
              img: "/img/arm.png",
              path: "/mortgage/arm",
            },
            {
              title: "Interest-Only Mortgage",
              desc: "Calculate payments for interest-only periods and plan ahead.",
              img: "/img/interestonly.png",
              path: "/mortgage/interest-only",
            },
            {
              title: "Balloon Payment Mortgage",
              desc: "See how large final payments affect your mortgage plan.",
              img: "/img/balloon.png",
              path: "/mortgage/balloon",
            },
            {
              title: "Refinance Mortgage",
              desc: "Explore if refinancing your current mortgage can save you money.",
              img: "/img/refinance.png",
              path: "/mortgage/refinance",
            },

            {
              title: "Reverse Mortgage",
              desc: "Estimate how much you can borrow using your home equity with a reverse mortgage.",
              img: "/img/reverse.png",
              path: "/mortgage/reversemortgage",
            },
          ].map(({ title, desc, img, path }) => (
            <div
              key={title}
              className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left flex flex-col justify-between"
            >
              <img
                src={img}
                alt={title}
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
              <div className="flex flex-col justify-between h-full">
                <p className="text-sm text-gray-600 mb-4">{desc}</p>
                <Link to={path}>
                  <SubmitButton text="Open Calculator" />
                </Link>
              </div>
            </div>
          ))}

        {/* Investment-related cards */}
        {showInvestment &&
          [
            {
              title: "Net Present Value Calculator",
              desc: "Calculate the Net Present Value of any investment. Ideal for project evaluation, cash flow analysis, and financial decision-making.",
              img: "/img/npv.png",
              path: "/financial/npv",
            },

            {
              title: "Internal Rate of Return",
              desc: "Calculate the Internal Rate of Return for any investment. Perfect for evaluating profitability, comparing projects, and guiding smart investment choices.",
              img: "/img/irr.png",
              path: "/financial/irr",
            },
          ].map(({ title, desc, img, path }) => (
            <div
              key={title}
              className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left flex flex-col justify-between"
            >
              <img
                src={img}
                alt={title}
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
              <div className="flex flex-col justify-between h-full">
                <p className="text-sm text-gray-600 mb-4">{desc}</p>
                <Link to={path}>
                  <SubmitButton text="Open Calculator" />
                </Link>
              </div>
            </div>
          ))}

        {/* Savings-related cards */}
        {showSavings &&
          [
            {
              title: "Savings Calculator",
              desc: "Plan your savings to reach any goal. Ideal for retirement, education, or big purchases — find out how much you need to save monthly or yearly to hit your target on time.",
              img: "/img/savings.png",
              path: "/financial/savings",
            },
          ].map(({ title, desc, img, path }) => (
            <div
              key={title}
              className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left flex flex-col justify-between"
            >
              <img
                src={img}
                alt={title}
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
              <div className="flex flex-col justify-between h-full">
                <p className="text-sm text-gray-600 mb-4">{desc}</p>
                <Link to={path}>
                  <SubmitButton text="Open Calculator" />
                </Link>
              </div>
            </div>
          ))}
      </div>

      <BottomCTA buttonText="Browse All Calculators" href="/calculators" />
    </div>
  );
};

export default FinancialCalculator;
