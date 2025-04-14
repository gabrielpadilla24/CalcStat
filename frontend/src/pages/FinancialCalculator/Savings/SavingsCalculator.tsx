import { useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
import SavingsForm from "./components/SavingsForm";
import SavingsChart from "./components/SavingsChart";

const SavingsCalculator = () => {
  const [goalAmount, setGoalAmount] = useState("");
  const [years, setYears] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [contribution, setContribution] = useState<number | null>(null);
  const [chartInputs, setChartInputs] = useState<{
    goal: number;
    years: number;
    interestRate: number;
  } | null>(null);

  const handleResult = (contribution: number) => {
    setContribution(contribution);
    setChartInputs({
      goal: parseFloat(goalAmount),
      years: parseInt(years),
      interestRate: parseFloat(interestRate),
    });
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Savings Goal Calculator
        </h1>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-4 px-6">
          {/* FORM */}
          <div className="flex-1 max-w-[500px]">
            <SavingsForm
              goalAmount={goalAmount}
              setGoalAmount={setGoalAmount}
              years={years}
              setYears={setYears}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              onResult={handleResult}
              contribution={contribution}
            />
          </div>

          {/* CHART */}
          <div className="flex-1 max-w-[750px]">
            <SavingsChart
              contribution={
                chartInputs && contribution !== null ? contribution : 0
              }
              interestRate={chartInputs?.interestRate ?? 0}
              years={chartInputs?.years ?? 0}
              goal={chartInputs?.goal ?? 0}
            />
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default SavingsCalculator;
