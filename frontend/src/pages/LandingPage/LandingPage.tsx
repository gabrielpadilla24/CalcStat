import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";

const LandingPage = () => {
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

        <Link
          to="/calculadora"
          className="bg-[#5FBA9B] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-[#4ea487] transition"
        >
          Explora nuestras calculadoras
        </Link>
      </div>
      <div className="w-full bg-[#4A9A80] py-10 px-4 flex justify-center items-center">
        <p className="text-white text-2xl md:text-3xl font-semibold text-center max-w-3xl">
          Data-driven thinking starts with the right tools, built for clarity,
          insight, and confidence at every step{" "}
        </p>
      </div>
      <div className="text-center mt-16 px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          A calculator for every need
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dive into endless possibilities — explore tools built to simplify your
          most complex decisions.
        </p>
      </div>

      <div
        className="bg-[#F0F0E6] mt-10 flex flex-col justify-center px-8 py-8 shadow-md rounded-md border border-[#e0e0e0] transition-opacity duration-500 ease-in animate-fadeIn"
        style={{
          width: "50vw",
          aspectRatio: "20 / 15",
        }}
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-4 ml-5">
          Quant Calculator
        </h2>
        <p className="text-base text-gray-600 mb-6 ml-5 max-w-md">
          From risk models to optimization tools, our Quant Calculator helps you
          explore financial logic with precision and speed.
        </p>
        <div className="w-fit ml-5">
          <SubmitButton text="Go to Quant" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
