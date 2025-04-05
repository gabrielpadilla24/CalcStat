import { useState } from "react";
import NavBar from "@/components/NavBar";
import MortgageForm from "./components/MortgageForm";
import MonthlyBreakdownChart from "./components/MonthlyBreakdownChart";

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Mortgage Calculator
        </h1>

        <div className="flex justify-center items-start gap-10 flex-wrap">
          <div>
            <MortgageForm
              setPrincipal={setPrincipal}
              setInterest={setInterest}
            />
          </div>

          <div>
            <MonthlyBreakdownChart principal={principal} interest={interest} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MortgageCalculator;
