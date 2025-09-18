"use client";

import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

export default function QuantCalculator() {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="bg-white shadow-md rounded-xl border border-gray-200 max-w-2xl w-full p-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Quant Calculator
          </h1>

          <p className="text-lg sm:text-xl text-gray-600">🚀 Coming Soon!</p>

          <p className="text-sm sm:text-base text-gray-500">
            We’re building advanced tools for{" "}
            <strong>quantitative finance</strong>, including{" "}
            <em>AI-powered backtesting</em>, <em>price action strategies</em>,
            and <em>trading simulations</em>.
          </p>

          <div className="flex justify-center">
            <span className="inline-block px-4 py-2 bg-[#5FBA9B] text-white font-semibold rounded-lg shadow hover:bg-[#4FAE8D] transition-colors">
              Stay Tuned
            </span>
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Home" href="/" />
    </>
  );
}
