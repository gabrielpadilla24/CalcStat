"use client";

import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DeterminantInput from "./components/DeterminantInput";

const DeterminantCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Determinant Calculator
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* 👉 Aquí solo invocamos el input */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <DeterminantInput />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Linear Algebra" href="/linear-algebra" />
    </>
  );
};

export default DeterminantCalculator;
