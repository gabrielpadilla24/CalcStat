// src/pages/CalculusCalculator/DifferentialCalculus/InflectionPoints/InflectionPointsCalculator.tsx
"use client";

//import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

export default function LimitsCalculator() {
  // LaTeX principales

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Limits Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">{/* LIMIT INPUT */}</div>

            <div className="w-full">{/* GRAPH INPUT */}</div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">{/* RESULT */}</div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
}
