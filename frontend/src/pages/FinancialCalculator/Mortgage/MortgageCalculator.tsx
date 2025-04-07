import { useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import MortgageForm from "./components/MortgageForm";
import MonthlyBreakdownChart from "./components/MonthlyBreakdownChart";
import AmortizationGraph from "./components/AmortizationGraph";
import ARMExplanation from "./components/ARMExplanation";
import InterestOnlyExplanation from "./components/InterestOnlyExplanation";

const MortgageCalculator = () => {
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

  const [loanType, setLoanType] = useState<string>(""); // Nuevo estado para tipo de hipoteca

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

  const monthlyPropertyTax = propertyTaxes ? Number(propertyTaxes) / 12 : 0;
  const monthlyHOA = hoaFees ? Number(hoaFees) : 0;
  const monthlyInsurance = insurance ? Number(insurance) / 12 : 0;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Mortgage Calculator
        </h1>

        <div className="flex justify-center items-start gap-12 flex-wrap mb-16">
          {/* Formulario */}
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
              setLoanType={setLoanType} // Nuevo prop
            />
          </div>

          {/* Pie Chart más amplio */}
          <div className="w-full md:w-auto">
            <MonthlyBreakdownChart
              resultado={resultado}
              monthlyPropertyTax={monthlyPropertyTax}
              monthlyHOA={monthlyHOA}
              monthlyInsurance={monthlyInsurance}
              scrollToGraph={scrollToGraph}
              scrollToARM={scrollToARM}
              scrollToInterestOnly={scrollToInterestOnly}
              //scrollToBalloon={scrollToBalloon} // ✅
              loanType={loanType} // ✅
            />
          </div>
        </div>

        {/* Gráfico de Amortización */}
        <div ref={amortizationRef} className="flex justify-center">
          <AmortizationGraph
            principalPaid={principalPaid}
            interestPaid={interestPaid}
            loanBalance={loanBalance}
          />
        </div>

        {/* Explicación ARM (solo si es tipo ARM) */}
        {loanType === "ARM" && (
          <div className="mt-12">
            <ARMExplanation fixedYearsMessage={resultado?.fixedYearsMessage} />
          </div>
        )}

        {/* Explicación de Interés Solo */}
        {loanType === "Interest Only" && (
          <div className="mt-8" id="interest-only-explanation">
            <InterestOnlyExplanation />
          </div>
        )}
      </div>
    </>
  );
};

export default MortgageCalculator;
