import React, { useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import FRM from "./FRM";
import InterestOnly from "./InterestOnly";
import ARM from "./ARM";
import Balloon from "./Balloon";
import Jumbo from "./Jumbo";

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

    setResultado(null);
    setTotalPayment(0);

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

    // ARM, Interest Only, Balloon, and Jumbo alerts only
    if (formData.loanType === "Interest Only") {
      alert("Interest Only form submitted.");
    }
    if (formData.loanType === "ARM") {
      alert("ARM form submitted.");
    }
    if (formData.loanType === "Balloon Payments") {
      alert("Balloon form submitted.");
    }
    if (formData.loanType === "Jumbo Loans") {
      alert("Jumbo Loan form submitted.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "550px",
      }}
    >
      <table style={{ width: "100%", borderSpacing: "12px" }}>
        <tbody>
          <tr style={{ height: "60px" }}>
            <td align="left" style={{ width: "50%" }}>
              <label htmlFor="loanType">Mortgage Type:</label>
            </td>
            <td>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
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

          {formData.loanType === "Fixed Rate" && (
            <>
              <tr style={{ height: "60px" }}>
                <td align="left">
                  <label htmlFor="duration">Mortgage Duration:</label>
                </td>
                <td>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
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

          {/* Other types: render their forms */}
          {formData.loanType === "Interest Only" && (
            <InterestOnly {...formData} onChange={handleChange} />
          )}
          {formData.loanType === "ARM" && (
            <ARM {...formData} onChange={handleChange} />
          )}
          {formData.loanType === "Balloon Payments" && (
            <Balloon {...formData} onChange={handleChange} />
          )}
          {formData.loanType === "Jumbo Loans" && (
            <Jumbo {...formData} onChange={handleChange} />
          )}

          {/* Optional Fields */}
          <tr style={{ height: "60px" }}>
            <td align="left">
              <label htmlFor="propertyTaxes">Property Taxes (Annual):</label>
            </td>
            <td>
              <input
                type="number"
                id="propertyTaxes"
                name="propertyTaxes"
                value={formData.propertyTaxes}
                onChange={handleChange}
                placeholder="Optional"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </td>
          </tr>

          <tr style={{ height: "60px" }}>
            <td align="left">
              <label htmlFor="hoaFees">HOA Fees (Monthly):</label>
            </td>
            <td>
              <input
                type="number"
                id="hoaFees"
                name="hoaFees"
                value={formData.hoaFees}
                onChange={handleChange}
                placeholder="Optional"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </td>
          </tr>

          <tr style={{ height: "60px" }}>
            <td align="left">
              <label htmlFor="insurance">Insurance (Annual):</label>
            </td>
            <td>
              <input
                type="number"
                id="insurance"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                placeholder="Optional"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <SubmitButton text="Continue" />
      </div>
    </form>
  );
};

export default MortgageForm;
