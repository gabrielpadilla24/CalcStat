import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center bg-gray-100 text-center px-4 pt-10 pb-20 min-h-[70vh]">
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
    </>
  );
};

export default LandingPage;
