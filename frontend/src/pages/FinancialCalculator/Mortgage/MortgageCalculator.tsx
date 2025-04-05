import { useState } from "react";
import NavBar from "@/components/NavBar";
import MortgageForm from "./components/MortgageForm";
import MonthlyBreakdownChart from "./components/MonthlyBreakdownChart";
import AmortizationGraph from "./components/AmortizationGraph";

const MortgageCalculator = () => {
  const [totalPayment, setTotalPayment] = useState(0);

  const [resultado, setResultado] = useState<{
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
  } | null>(null);

  const [principalPaid, setPrincipalPaid] = useState<number[]>([]);
  const [interestPaid, setInterestPaid] = useState<number[]>([]);
  const [loanBalance, setLoanBalance] = useState<number[]>([]);

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
              setTotalPayment={setTotalPayment}
              setResultado={setResultado}
              setPrincipalPaid={setPrincipalPaid}
              setInterestPaid={setInterestPaid}
              setLoanBalance={setLoanBalance}
            />
          </div>

          <div>
            <MonthlyBreakdownChart
              totalPayment={totalPayment}
              resultado={resultado}
            />
          </div>
        </div>

        {/* Gráfica de amortización solo si hay datos */}
        {principalPaid.length > 0 &&
          interestPaid.length > 0 &&
          loanBalance.length > 0 && (
            <div className="flex justify-center mt-12">
              <AmortizationGraph
                principalPaid={principalPaid}
                interestPaid={interestPaid}
                loanBalance={loanBalance}
              />
            </div>
          )}
      </div>
    </>
  );
};

export default MortgageCalculator;
