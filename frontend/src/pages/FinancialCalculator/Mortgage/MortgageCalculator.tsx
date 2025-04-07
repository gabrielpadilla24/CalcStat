import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import MortgageForm from "./components/MortgageForm";
import MonthlyBreakdownChart from "./components/MonthlyBreakdownChart";
import AmortizationGraph from "./components/AmortizationGraph";
import ARMExplanation from "./components/ARMExplanation";
import InterestOnlyExplanation from "./components/InterestOnlyExplanation";
import BalloonExplanation from "./components/BalloonExplanation";

interface MortgageCalculatorProps {
  loanType?: string;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  loanType,
}) => {
  const [resultado, setResultado] = useState<{
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
    fixedYearsMessage?: string;
    secondPayment?: number;
  } | null>(null);

  const [, setTotalPayment] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState<number[]>([]);
  const [interestPaid, setInterestPaid] = useState<number[]>([]);
  const [loanBalance, setLoanBalance] = useState<number[]>([]);

  const [propertyTaxes, setPropertyTaxes] = useState<string>("");
  const [hoaFees, setHOAFees] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("");

  const [loanTypeState, setLoanTypeState] = useState<string>(loanType || "");

  const location = useLocation();
  const isGeneralRoute = location.pathname === "/mortgage";

  useEffect(() => {
    if (loanType) {
      setLoanTypeState(loanType);
    }
  }, [loanType]);

  const getTitle = () => {
    if (isGeneralRoute) return "Mortgage Calculator";

    switch (loanTypeState) {
      case "Fixed Rate":
        return "Fixed Rate Mortgage Calculator";
      case "ARM":
        return "Adjustable Rate Mortgage Calculator";
      case "Interest Only":
        return "Interest-Only Mortgage Calculator";
      case "Balloon Payments":
        return "Balloon Mortgage Calculator";
      case "Jumbo Loan":
        return "Jumbo Loan Mortgage Calculator";
      default:
        return "Mortgage Calculator";
    }
  };

  const amortizationRef = useRef<HTMLDivElement | null>(null);

  const scrollToGraph = () => {
    if (amortizationRef.current) {
      amortizationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToARM = () => {
    const armSection = document.querySelector(".mt-12");
    if (armSection) {
      armSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToInterestOnly = () => {
    const interestOnlySection = document.querySelector(".mt-8");
    if (interestOnlySection) {
      interestOnlySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBalloon = () => {
    const balloonSection = document.querySelector("#balloon-explanation");
    if (balloonSection) {
      balloonSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const monthlyPropertyTax = propertyTaxes ? Number(propertyTaxes) / 12 : 0;
  const monthlyHOA = hoaFees ? Number(hoaFees) : 0;
  const monthlyInsurance = insurance ? Number(insurance) / 12 : 0;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{getTitle()}</h1>

        <div className="flex justify-center items-start gap-12 flex-wrap mb-16">
          <div>
            <MortgageForm
              setResultado={setResultado}
              setTotalPayment={setTotalPayment}
              setPrincipalPaid={setPrincipalPaid}
              setInterestPaid={setInterestPaid}
              setLoanBalance={setLoanBalance}
              setPropertyTaxes={setPropertyTaxes}
              setHOAFees={setHOAFees}
              setInsurance={setInsurance}
              setLoanType={setLoanTypeState}
              showLoanTypeSelector={isGeneralRoute} // Puedes usar este prop en el form
            />
          </div>

          <div className="w-full md:w-auto">
            <MonthlyBreakdownChart
              resultado={resultado}
              monthlyPropertyTax={monthlyPropertyTax}
              monthlyHOA={monthlyHOA}
              monthlyInsurance={monthlyInsurance}
              scrollToGraph={scrollToGraph}
              scrollToARM={scrollToARM}
              scrollToInterestOnly={scrollToInterestOnly}
              scrollToBalloon={scrollToBalloon}
              loanType={loanTypeState}
            />
          </div>
        </div>

        <div ref={amortizationRef} className="flex justify-center">
          <AmortizationGraph
            principalPaid={principalPaid}
            interestPaid={interestPaid}
            loanBalance={loanBalance}
          />
        </div>

        {loanTypeState === "ARM" && (
          <div className="mt-12">
            <ARMExplanation fixedYearsMessage={resultado?.fixedYearsMessage} />
          </div>
        )}

        {loanTypeState === "Interest Only" && (
          <div className="mt-8" id="interest-only-explanation">
            <InterestOnlyExplanation />
          </div>
        )}

        {loanTypeState === "Balloon Payments" && (
          <div className="mt-8" id="balloon-explanation">
            <BalloonExplanation />
          </div>
        )}
      </div>
    </>
  );
};

export default MortgageCalculator;
