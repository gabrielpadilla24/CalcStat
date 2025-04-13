//import { useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";
// Future components to implement
// import SavingsForm from "./components/SavingsForm";
// import SavingsChart from "./components/SavingsChart";
// import SavingsInfo from "./components/SavingsInfo";

const SavingsCalculator = () => {
  // Placeholder for future result state
  //   const [result, setResult] = useState(null);
  //   const infoRef = useRef<HTMLDivElement>(null);

  //   const handleScrollToInfo = () => {
  //     infoRef.current?.scrollIntoView({ behavior: "smooth" });
  //   };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Savings Calculator
        </h1>

        {/* FLEX CONTAINER */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-4 px-6">
          {/* FORM */}
          <div className="flex-1 max-w-[500px]">
            {/* <SavingsForm onResult={setResult} onLearnMore={handleScrollToInfo} /> */}
            <div className="text-center text-gray-600 text-lg">
              Coming soon...
            </div>
          </div>

          {/* CHART */}
          <div className="flex-1 max-w-[750px]">
            {/* <SavingsChart data={result} /> */}
          </div>
        </div>

        {/* INFO */}
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default SavingsCalculator;
