import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import { useRef } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const calculatorsRef = useRef<HTMLDivElement>(null);

  const calculators = [
    {
      title: "Stochastic Calculator",
      desc: "Model uncertainty and randomness in complex systems — our Stochastic Calculator brings advanced math to life.",
      img: "/img/stochasticimg.webp",
      link: "/stochastic",
      reverse: false,
    },
    {
      title: "Calculus Calculator",
      desc: "Tackle differential calculus with ease. Our Calculus Calculator is built for single-variable analysis.",
      img: "/img/calculusimg.webp",
      link: "/calculus",
      reverse: true,
    },
    {
      title: "Linear Algebra Calculator",
      desc: "Work with matrices, vectors, transformations and systems of equations. Our Linear Algebra Calculator empowers your understanding of core linear structures.",
      img: "/img/linearimg.webp",
      link: "/linearalgebra",
      reverse: false,
    },
    {
      title: "Probability & Statistics",
      desc: "Calculate probabilities, visualize distributions, and analyze data with precision. Our Probability & Statistics Calculator supports everything from descriptive stats to hypothesis testing.",
      img: "/img/probstatsimg.webp",
      link: "/probabilityandstats",
      reverse: true,
    },
    {
      title: "Financial Calculator",
      desc: "Handle compound interest, annuities, loan amortization, and investment growth effortlessly. Our Financial Calculator brings money math to life.",
      img: "/img/financialimg.webp",
      link: "/financial",
      reverse: false,
    },
    {
      title: "Quant Calculator",
      desc: "From risk models to optimization tools, our Quant Calculator helps you explore financial logic with precision and speed.",
      img: "/img/quantimg.webp",
      link: "/quant",
      reverse: true,
    },
  ];

  return (
    <div className="bg-gray-100">
      <NavBar />

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-4 pt-10 pb-20 min-h-[70vh]">
        <img
          src="/img/logo.webp"
          alt="Ilustración de calculadora"
          className="w-full max-w-md mb-8"
        />
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
          Smarter, faster calculations made simple
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          CalcStat delivers intelligent tools for advanced math and data
          analysis — making your calculations faster, more accurate, and visual.
        </p>
        <button
          onClick={() =>
            calculatorsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-[#5FBA9B] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-[#4ea487] transition"
        >
          Discover our calculators
        </button>
      </div>

      {/* Banner */}
      <div className="w-full bg-[#4A9A80] py-10 px-4 flex justify-center items-center">
        <p className="text-white text-xl md:text-3xl font-semibold text-center max-w-3xl">
          Data-driven thinking starts with the right tools, built for clarity,
          insight, and confidence at every step
        </p>
      </div>

      {/* Section Intro */}
      <div ref={calculatorsRef} className="text-center mt-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          A calculator for every need
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Dive into endless possibilities — explore tools built to simplify your
          most complex decisions.
        </p>
      </div>

      {/* Cards */}
      {calculators.map(({ title, desc, img, link, reverse }, idx) => (
        <div
          key={idx}
          className={`bg-[#F0F0E6] border border-[#e0e0e0] shadow-md rounded-md 
                      flex flex-col ${
                        reverse ? "md:flex-row-reverse" : "md:flex-row"
                      } items-center gap-8 p-8 mt-16 max-w-6xl mx-auto`}
        >
          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-md mx-auto md:mx-0">
              {desc}
            </p>
            <Link to={link}>
              <SubmitButton text={`Go to ${title.split(" ")[0]}`} />
            </Link>
          </div>

          {/* Imagen */}
          <div className="flex-1">
            <img
              src={img}
              alt={title}
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
