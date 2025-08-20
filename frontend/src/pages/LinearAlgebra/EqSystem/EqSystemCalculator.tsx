"use client";

//import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import EqSystemInput from "./components/EqSystemInput";

const EqSystemCalculator = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Linear Equation System Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          <div className="flex-1 max-w-[600px]">
            <EqSystemInput onResult={() => {}} />
          </div>
          <div className="flex-1 max-w-[600px]">{/* RESULT */}</div>
        </div>
      </div>
      <BottomCTA buttonText="Back to Linear Algebra" href="/linear-algebra" />
    </>
  );
};

export default EqSystemCalculator;
