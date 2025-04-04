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
          insight, and confidence at every step
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
            <div
              className="absolute right-[-600px] top-1/2 -translate-y-1/2 z-20 overflow-hidden"
              style={{ width: "calc(100% - 25px)" }}
            >
              <img
                src="/img/quantimg.png"
                alt="Quant visual"
                className="h-[430px] rounded-md shadow-md"
                style={{
                  objectFit: "cover", // Asegura que la imagen se recorte
                  objectPosition: "left", // Mantiene el recorte desde el borde izquierdo
                }}
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
          <div className="absolute right-[600px] top-1/2 -translate-y-1/2 z-20">
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
    </div>
  );
};

export default LandingPage;
