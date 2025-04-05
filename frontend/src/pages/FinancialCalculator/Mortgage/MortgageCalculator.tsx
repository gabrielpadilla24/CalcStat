import { useState } from "react";
import NavBar from "@/components/NavBar";
import MortgageForm from "./components/MortgageForm";
import MonthlyBreakdownChart from "./components/MonthlyBreakdownChart";
import AmortizationGraph from "./components/AmortizationGraph";

const MortgageCalculator = () => {
  const [resultado, setResultado] = useState<{
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
  } | null>(null);
  const [, setTotalPayment] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState<number[]>([]);
  const [interestPaid, setInterestPaid] = useState<number[]>([]);
  const [loanBalance, setLoanBalance] = useState<number[]>([]);
  const [propertyTaxes, setPropertyTaxes] = useState<string>("");

  const monthlyPropertyTax = propertyTaxes ? Number(propertyTaxes) / 12 : 0;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Mortgage Calculator
        </h1>

        <div className="flex justify-center items-start gap-10 flex-wrap mb-10">
          {/* Formulario y Pie Chart */}
          <div>
            <MortgageForm
              setResultado={setResultado}
              setTotalPayment={setTotalPayment}
              setPrincipalPaid={setPrincipalPaid}
              setInterestPaid={setInterestPaid}
              setLoanBalance={setLoanBalance}
              setPropertyTaxes={setPropertyTaxes}
            />
          </div>

          <div>
            <MonthlyBreakdownChart
              resultado={resultado}
              monthlyPropertyTax={monthlyPropertyTax}
            />
          </div>
        </div>

        {/* Gráfico de Amortización debajo */}
        <div className="flex justify-center">
          <AmortizationGraph
            principalPaid={principalPaid}
            interestPaid={interestPaid}
            loanBalance={loanBalance}
          />
        </div>
      </div>
    </>
  );
};

export default MortgageCalculator;
