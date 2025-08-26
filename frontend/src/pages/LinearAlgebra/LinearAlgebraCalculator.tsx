"use client";

import NavBar from "@/components/NavBar";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "react-router-dom";

const LinearAlgebraCalculator = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Linear Algebra Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Choose a calculator to explore concepts step by step and visualize the
          results.
        </p>
      </div>

      {/* Cards (all Linear Algebra calculators) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/* Determinant */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/determinant.png"
            alt="Determinant"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Determinant</h2>
          <p className="text-sm text-gray-600 mb-4">
            Understand the rules. Visualize the change. Learn determinants the
            smart way.
          </p>
          <Link to="/linearalgebra/determinant">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Inverse */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/inverse.png"
            alt="Inverse"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Inverse</h2>
          <p className="text-sm text-gray-600 mb-4">
            Understand the rules. Visualize the change. Learn inverses the smart
            way.
          </p>
          <Link to="/linearalgebra/inverse">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Linear Equation System */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/eqsystem.png"
            alt="Linear Equation System"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Linear Equation System
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Solve systems of linear equations with ease.
          </p>
          <Link to="/linearalgebra/eqsystem">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Eigenvalues & Eigenvectors */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/eigen.png"
            alt="Eigenvalues and Eigenvectors"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Eigenvalues and Eigenvectors
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Compute eigenvalues and eigenvectors of a matrix.
          </p>
          <Link to="/linearalgebra/eigen">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* SVD */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/svd.png"
            alt="Singular Value Decomposition"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Singular Value Decomposition (SVD)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Perform singular value decomposition on a matrix.
          </p>
          <Link to="/linearalgebra/svd">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>

        {/* Gram-Schmidt */}
        <div className="bg-white rounded-md shadow-md p-6 border border-[#e0e0e0] flex flex-col justify-between text-left">
          <img
            src="/img/gramschmidt.png"
            alt="Gram-Schmidt"
            className="h-40 w-full object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Gram-Schmidt</h2>
          <p className="text-sm text-gray-600 mb-4">
            Apply the Gram-Schmidt process to a set of vectors.
          </p>
          <Link to="/linearalgebra/gramschmidt">
            <SubmitButton text="Open Calculator" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinearAlgebraCalculator;
