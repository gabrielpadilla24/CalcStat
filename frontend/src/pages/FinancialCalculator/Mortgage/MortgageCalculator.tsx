import { useState } from "react";
import NavBar from "@/components/NavBar";
import MortgageForm from "./components/MortgageForm";
import MonthlyBreakdownChart from "./components/MonthlyBreakdownChart";

const MortgageCalculator = () => {
  const [totalPayment, setTotalPayment] = useState(0);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Mortgage Calculator
        </h1>

        <div className="flex justify-center items-start gap-10 flex-wrap">
          <div>
            <MortgageForm setTotalPayment={setTotalPayment} />
          </div>

          <div>
            <MonthlyBreakdownChart totalPayment={totalPayment} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MortgageCalculator;
