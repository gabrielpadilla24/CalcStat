import NavBar from "../components/NavBar";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Our Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Explore our suite of intelligent calculators designed to make math and
          data analysis smarter, faster, and more visual.
        </p>
      </div>

      {/* Calculator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/* Financial */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left">
          <img
            src="/img/financialimg.png"
            alt="Financial Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Financial Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Handle compound interest, annuities, loan amortization, and
            investment growth effortlessly.
          </p>
          <Link to="/financial">
            <SubmitButton text="Go to Financial" />
          </Link>
        </div>

        {/* Quant */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left opacity-50 cursor-not-allowed">
          <img
            src="/img/quantimg.png"
            alt="Quant Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Quant Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            From risk models to optimization tools, explore financial logic with
            precision.
          </p>
          <button
            disabled
            className="bg-gray-300 text-white px-6 py-2 rounded-md"
          >
            Coming Soon
          </button>
        </div>

        {/* Stochastic */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left opacity-50 cursor-not-allowed">
          <img
            src="/img/stochasticimg.png"
            alt="Stochastic Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Stochastic Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Model uncertainty and randomness in complex systems.
          </p>
          <button
            disabled
            className="bg-gray-300 text-white px-6 py-2 rounded-md"
          >
            Coming Soon
          </button>
        </div>

        {/* Calculus */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left opacity-50 cursor-not-allowed">
          <img
            src="/img/calculusimg.png"
            alt="Calculus Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Calculus Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Tackle differential, integral, and multivariable calculus with ease.
          </p>
          <button
            disabled
            className="bg-gray-300 text-white px-6 py-2 rounded-md"
          >
            Coming Soon
          </button>
        </div>

        {/* Linear Algebra */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left opacity-50 cursor-not-allowed">
          <img
            src="/img/linearimg.png"
            alt="Linear Algebra Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Linear Algebra Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Work with matrices, vectors, transformations and systems of
            equations.
          </p>
          <button
            disabled
            className="bg-gray-300 text-white px-6 py-2 rounded-md"
          >
            Coming Soon
          </button>
        </div>

        {/* Probability & Stats */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] text-left opacity-50 cursor-not-allowed">
          <img
            src="/img/probstatsimg.png"
            alt="Probability & Stats Calculator"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Probability & Statistics
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Calculate probabilities, visualize distributions, and analyze data
            with precision.
          </p>
          <button
            disabled
            className="bg-gray-300 text-white px-6 py-2 rounded-md"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
