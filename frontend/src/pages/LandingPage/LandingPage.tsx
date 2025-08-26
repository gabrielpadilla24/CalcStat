import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import { useRef } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const calculatorsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="flex flex-col items-center text-center px-4 pt-10 pb-20 min-h-[70vh]">
        <img
          src="/img/logo.png"
          alt="Ilustración de calculadora"
          className="w-full max-w-md mb-8"
        />

        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Smarter, faster calculations made simple
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          CalcStat delivers intelligent tools for advanced math and data
          analysis — making your calculations faster, more accurate, and visual.
        </p>

        <button
          onClick={() =>
            calculatorsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className=" bg-[#5FBA9B] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-[#4ea487] transition"
        >
          Discover our calculators
        </button>
      </div>

      <div className="w-full bg-[#4A9A80] py-10 px-4 flex justify-center items-center">
        <p className="text-white text-2xl md:text-3xl font-semibold text-center max-w-3xl">
          Data-driven thinking starts with the right tools, built for clarity,
          insight, and confidence at every step
        </p>
      </div>

      <div ref={calculatorsRef} className="text-center mt-16 px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          A calculator for every need
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dive into endless possibilities — explore tools built to simplify your
          most complex decisions.
        </p>
      </div>

      {/* Quant Card */}
      <div className="w-full mt-10 flex justify-center">
        <div
          className="relative overflow-visible"
          style={{
            width: "calc(48vw + 550px)", // total width: card (48vw) + image overflow (550px)
          }}
        >
          {/* Card */}
          <div
            className="bg-[#F0F0E6] flex flex-col justify-center px-8 py-8 shadow-md rounded-md border border-[#e0e0e0] relative z-10"
            style={{
              width: "45vw",
              height: "472.5px", // Reducido un 10% de 525px (525px - 10%)
            }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4 pl-5">
              Quant Calculator
            </h2>
            <p className="text-base text-gray-600 mb-6 pl-5 max-w-md">
              From risk models to optimization tools, our Quant Calculator helps
              you explore financial logic with precision and speed.
            </p>
            <div className="w-fit pl-5">
              <SubmitButton text="Go to Quant" />
            </div>

            {/* Overlapping image aligned to the right */}
            <div className="absolute right-[-600px] top-1/2 -translate-y-1/2 z-20">
              <img
                src="/img/quantimg.png"
                alt="Quant visual"
                className="h-[430px] rounded-md shadow-md" // Reducido un 10% de 460px (460px - 10%)
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stochastic Card */}
      <div className="w-full mt-10 flex justify-center">
        <div
          className="relative overflow-visible flex justify-end"
          style={{
            width: "calc(45vw + 600px)", // same total width
          }}
        >
          {/* Overlapping image aligned to the left */}
          <div className="absolute right-[670px] top-1/2 -translate-y-1/2 z-20">
            <img
              src="/img/stochasticimg.png"
              alt="Stochastic visual"
              className="h-[430px] rounded-md shadow-md"
            />
          </div>

          {/* Card */}
          <div
            className="bg-[#F0F0E6] flex flex-col justify-center px-8 py-8 shadow-md rounded-md border border-[#e0e0e0] relative z-10"
            style={{
              width: "45vw",
              height: "472.5px",
            }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4 pr-5 ml-20 text-left">
              Stochastic Calculator
            </h2>
            <p className="text-base text-gray-600 mb-6 pr-5 max-w-md ml-20 text-left">
              Model uncertainty and randomness in complex systems — our
              Stochastic Calculator brings advanced math to life.
            </p>
            <div className="w-fit pr-5 ml-20">
              <SubmitButton text="Go to Stochastic" />
            </div>
          </div>
        </div>
      </div>
      {/* Calculus Card */}
      <div className="w-full mt-10 flex justify-center">
        <div
          className="relative overflow-visible"
          style={{
            width: "calc(48vw + 550px)", // total width: card (48vw) + image overflow (550px)
          }}
        >
          {/* Card */}
          <div
            className="bg-[#F0F0E6] flex flex-col justify-center px-8 py-8 shadow-md rounded-md border border-[#e0e0e0] relative z-10"
            style={{
              width: "45vw",
              height: "472.5px",
            }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4 pl-5">
              Calculus Calculator
            </h2>
            <p className="text-base text-gray-600 mb-6 pl-5 max-w-md">
              Tackle differential calculus with ease. Our Calculus Calculator is
              built for single-variable analysis.
            </p>
            <div className="w-fit pl-5">
              <Link to="/calculus">
                <SubmitButton text="Go to Calculus" />
              </Link>
            </div>

            {/* Overlapping image aligned to the right */}
            <div className="absolute right-[-600px] top-1/2 -translate-y-1/2 z-20">
              <img
                src="/img/calculusimg.png"
                alt="Calculus visual"
                className="h-[430px] rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Linear Algebra Card */}
      <div className="w-full mt-10 flex justify-center">
        <div
          className="relative overflow-visible flex justify-end"
          style={{
            width: "calc(45vw + 600px)", // card width + image overlap
          }}
        >
          {/* Overlapping image aligned to the left */}
          <div className="absolute right-[670px] top-1/2 -translate-y-1/2 z-20">
            <img
              src="/img/linearimg.png"
              alt="Linear Algebra visual"
              className="h-[430px] rounded-md shadow-md"
            />
          </div>

          {/* Card */}
          <div
            className="bg-[#F0F0E6] flex flex-col justify-center px-8 py-8 shadow-md rounded-md border border-[#e0e0e0] relative z-10"
            style={{
              width: "45vw",
              height: "472.5px",
            }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4 pr-5 ml-20 text-left">
              Linear Algebra Calculator
            </h2>
            <p className="text-base text-gray-600 mb-6 pr-5 max-w-md ml-20 text-left">
              Work with matrices, vectors, transformations and systems of
              equations. Our Linear Algebra Calculator empowers your
              understanding of core linear structures.
            </p>
            <div className="w-fit pr-5 ml-20">
              <Link to="/linearalgebra">
                <SubmitButton text="Go to Linear Algebra" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Probability & Statistics Card */}
      <div className="w-full mt-10 flex justify-center">
        <div
          className="relative overflow-visible"
          style={{
            width: "calc(48vw + 550px)", // card + image overflow width
          }}
        >
          {/* Card */}
          <div
            className="bg-[#F0F0E6] flex flex-col justify-center px-8 py-8 shadow-md rounded-md border border-[#e0e0e0] relative z-10"
            style={{
              width: "45vw",
              height: "472.5px",
            }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4 pl-5">
              Probability & Statistics
            </h2>
            <p className="text-base text-gray-600 mb-6 pl-5 max-w-md">
              Calculate probabilities, visualize distributions, and analyze data
              with precision. Our Probability & Statistics Calculator supports
              everything from descriptive stats to hypothesis testing.
            </p>
            <div className="w-fit pl-5">
              <Link to="/probabilityandstats">
                <SubmitButton text="Go to Probability & Stats" />
              </Link>
            </div>

            {/* Overlapping image aligned to the right */}
            <div className="absolute right-[-600px] top-1/2 -translate-y-1/2 z-20">
              <img
                src="/img/probstatsimg.png"
                alt="Probability & Statistics visual"
                className="h-[430px] rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Calculator Card (mirrored layout) */}
      <div className="w-full mt-10 flex justify-center">
        <div
          className="relative overflow-visible flex justify-end"
          style={{
            width: "calc(45vw + 600px)", // card width + image offset
          }}
        >
          {/* Overlapping image aligned to the left */}
          <div className="absolute right-[670px] top-1/2 -translate-y-1/2 z-20">
            <img
              src="/img/financialimg.png"
              alt="Financial visual"
              className="h-[430px] rounded-md shadow-md"
            />
          </div>

          {/* Card */}
          <div
            className="bg-[#F0F0E6] flex flex-col justify-center px-8 py-8 shadow-md rounded-md border border-[#e0e0e0] relative z-10"
            style={{
              width: "45vw",
              height: "472.5px",
            }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4 pr-5 ml-20 text-left">
              Financial Calculator
            </h2>
            <p className="text-base text-gray-600 mb-6 pr-5 max-w-md ml-20 text-left">
              Handle compound interest, annuities, loan amortization, and
              investment growth effortlessly. Our Financial Calculator brings
              money math to life.
            </p>
            <div className="w-fit pr-5 ml-20">
              <Link to="/financial">
                <SubmitButton text="Go to Finance" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
