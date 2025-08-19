import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import DeterminantInput from "./components/DeterminantInput";
import DeterminantResult from "./components/DeterminantResult";

const DeterminantCalculator = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Determinant Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-6 justify-center">
          <div className="flex-1 max-w-[600px]">
            <DeterminantInput onResult={setMatrix} />
          </div>
          <div className="flex-1 max-w-[600px]">
            <DeterminantResult matrix={matrix} />
          </div>
        </div>
      </div>
      <BottomCTA buttonText="Back to Linear Algebra" href="/linear-algebra" />
    </>
  );
};

export default DeterminantCalculator;
