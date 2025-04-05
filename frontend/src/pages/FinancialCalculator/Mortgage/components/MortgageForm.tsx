import React, { useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import FRM from "./FRM";
//import InterestOnly from "./InterestOnly";
//import ARM from "./ARM";
//import Balloon from "./Balloon";
//import Jumbo from "./Jumbo";

interface Props {
  setTotalPayment: (value: number) => void;
  setResultado: (
    value: {
      monthlyPayment: number;
      loanAmount: number;
      totalPayments: number;
      monthlyRate: number;
    } | null
  ) => void;
  setPrincipalPaid: (arr: number[]) => void;
  setInterestPaid: (arr: number[]) => void;
  setLoanBalance: (arr: number[]) => void;
  setPropertyTaxes: (value: string) => void;
  setHOAFees: (value: string) => void;
  setInsurance: (value: string) => void;
}

const MortgageForm: React.FC<Props> = ({
  setTotalPayment,
  setResultado,
  setPrincipalPaid,
  setInterestPaid,
  setLoanBalance,
  setPropertyTaxes,
  setHOAFees,
  setInsurance,
}) => {
  const [formData, setFormData] = useState({
    loanType: "",
    homePrice: "",
    downPayment: "",
    duration: "",
    interestRate: "",
    interestOnlyPeriod: "",
    totalTerm: "",
    initialRate: "",
    armType: "",
    loanTerm: "",
    balloonYear: "",
    propertyTaxes: "",
    hoaFees: "",
    insurance: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Solo limpiar cálculo si es un campo relevante al resultado
    const shouldClear = !["propertyTaxes", "hoaFees", "insurance"].includes(
      name
    );

    if (shouldClear) {
      setResultado(null);
      setTotalPayment(0);
    }

    // Actualizar estados correspondientes
    if (name === "propertyTaxes") setPropertyTaxes(value);
    if (name === "hoaFees") setHOAFees(value);
    if (name === "insurance") setInsurance(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const homePrice = Number(formData.homePrice);
    const downPayment = Number(formData.downPayment);

    if (formData.loanType === "") {
      alert("Please select a mortgage type.");
      return;
    }

    if (isNaN(homePrice) || homePrice <= 0) {
      alert("Please enter a valid Home Price.");
      return;
    }

    if (isNaN(downPayment) || downPayment < 0) {
      alert("Please enter a valid Down Payment.");
      return;
    }

    if (formData.loanType === "Fixed Rate") {
      const duration = Number(formData.duration);
      const interestRate = Number(formData.interestRate);

      if (!duration || isNaN(duration)) {
        alert("Please select a valid mortgage duration.");
        return;
      }

      if (!interestRate || isNaN(interestRate)) {
        alert("Please enter a valid interest rate.");
        return;
      }

      fetch("http://localhost:8000/fixedrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homePrice,
          downPayment,
          interestRate,
          duration,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error connecting to backend");
          return res.json();
        })
        .then((data) => {
          const {
            monthlyPayment,
            loanAmount,
            totalPayments,
            monthlyRate,
            principalPaid,
            interestPaid,
            loanBalance,
          } = data;

          setResultado({
            monthlyPayment,
            loanAmount,
            totalPayments,
            monthlyRate,
          });

          setTotalPayment(monthlyPayment);
          setPrincipalPaid(principalPaid);
          setInterestPaid(interestPaid);
          setLoanBalance(loanBalance);
        })
        .catch((err) => {
          console.error(err);
          alert("Hubo un error calculando la cuota mensual.");
        });

      return;
    }

    // Otros tipos de hipoteca (puedes adaptar lógicamente según avances)
    alert("Este tipo de hipoteca aún no está implementado completamente.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-[550px]"
    >
      <table className="w-full space-y-4">
        <tbody>
          {/* Tipo de Hipoteca */}
          <tr>
            <td>
              <label htmlFor="loanType">Mortgage Type:</label>
            </td>
            <td>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option value="Fixed Rate">Fixed Rate</option>
                <option value="ARM">ARM</option>
                <option value="Interest Only">Interest Only</option>
                <option value="Balloon Payments">Balloon Payments</option>
                <option value="Jumbo Loans">Jumbo Loans</option>
              </select>
            </td>
          </tr>

          {/* Campos dinámicos */}
          {formData.loanType === "Fixed Rate" && (
            <>
              <tr>
                <td>
                  <label htmlFor="duration">Mortgage Duration:</label>
                </td>
                <td>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select</option>
                    <option value="10">10 years</option>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="30">30 years</option>
                  </select>
                </td>
              </tr>
              <FRM
                homePrice={formData.homePrice}
                downPayment={formData.downPayment}
                interestRate={formData.interestRate}
                onChange={handleChange}
              />
            </>
          )}

          {/* Campos opcionales */}
          <tr>
            <td>
              <label htmlFor="propertyTaxes">Property Taxes (Annual):</label>
            </td>
            <td>
              <input
                type="number"
                name="propertyTaxes"
                value={formData.propertyTaxes}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="hoaFees">HOA Fees (Monthly):</label>
            </td>
            <td>
              <input
                type="number"
                name="hoaFees"
                value={formData.hoaFees}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="insurance">Insurance (Annual):</label>
            </td>
            <td>
              <input
                type="number"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 text-center">
        <SubmitButton text="Calculate" />
      </div>
    </form>
  );
};

export default MortgageForm;
