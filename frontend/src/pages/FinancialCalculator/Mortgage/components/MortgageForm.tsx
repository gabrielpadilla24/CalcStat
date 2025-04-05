import React, { useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import FRM from "./FRM";
import InterestOnly from "./InterestOnly";
import ARM from "./ARM";
import Balloon from "./Balloon";
import Jumbo from "./Jumbo";

interface Props {
  setTotalPayment: (value: number) => void;
}

const MortgageForm: React.FC<Props> = ({ setTotalPayment }) => {
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

  const [resultado, setResultado] = useState<{
    monthlyPayment: number;
    loanAmount: number;
    totalPayments: number;
    monthlyRate: number;
  } | null>(null);

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
          const { monthlyPayment, loanAmount, totalPayments, monthlyRate } =
            data;

          setResultado({
            monthlyPayment,
            loanAmount,
            totalPayments,
            monthlyRate,
          });
          setTotalPayment(monthlyPayment);
        })
        .catch((err) => {
          console.error(err);
          alert("Hubo un error calculando la cuota mensual.");
        });

      return;
    }

    if (formData.loanType === "Interest Only") {
      const interestRate = Number(formData.interestRate) / 100;
      const interestOnlyPeriod = Number(formData.interestOnlyPeriod);
      const totalTerm = Number(formData.totalTerm);

      if (
        !formData.interestRate ||
        isNaN(interestRate) ||
        !formData.interestOnlyPeriod ||
        isNaN(interestOnlyPeriod) ||
        !formData.totalTerm ||
        isNaN(totalTerm)
      ) {
        alert("Please enter valid values for Interest Only mortgage.");
        return;
      }

      alert(
        `Interest Only Mortgage:\nHome Price: $${homePrice}\nDown Payment: $${downPayment}\nInterest Rate: ${
          interestRate * 100
        }%\nInterest-Only Period: ${interestOnlyPeriod} years\nTotal Term: ${totalTerm} years`
      );
    }

    if (formData.loanType === "ARM") {
      const initialRate = Number(formData.initialRate) / 100;

      const armMap: Record<string, { fixed: number; adjust: number }> = {
        "5/1": { fixed: 5, adjust: 1 },
        "5/6": { fixed: 5, adjust: 0.5 },
        "7/1": { fixed: 7, adjust: 1 },
        "7/6": { fixed: 7, adjust: 0.5 },
        "10/1": { fixed: 10, adjust: 1 },
        "10/6": { fixed: 10, adjust: 0.5 },
      };

      const selectedARM = armMap[formData.armType];

      if (
        !formData.initialRate ||
        isNaN(initialRate) ||
        !formData.armType ||
        !selectedARM
      ) {
        alert("Please enter valid ARM values.");
        return;
      }

      alert(
        `ARM Mortgage:\nHome Price: $${homePrice}\nDown Payment: $${downPayment}\nInitial Rate: ${
          initialRate * 100
        }%\nFixed Period: ${selectedARM.fixed} years\nAdjustment Interval: ${
          selectedARM.adjust
        } years`
      );
    }

    if (formData.loanType === "Balloon Payments") {
      const interestRate = Number(formData.interestRate) / 100;
      const loanTerm = Number(formData.loanTerm);
      const balloonYear = Number(formData.balloonYear);

      if (
        !formData.interestRate ||
        isNaN(interestRate) ||
        !formData.loanTerm ||
        isNaN(loanTerm) ||
        !formData.balloonYear ||
        isNaN(balloonYear) ||
        balloonYear > loanTerm
      ) {
        alert("Please enter valid Balloon Payment mortgage values.");
        return;
      }

      alert(
        `Balloon Mortgage:\nHome Price: $${homePrice}\nDown Payment: $${downPayment}\nInterest Rate: ${
          interestRate * 100
        }%\nLoan Term: ${loanTerm} years\nBalloon Year: ${balloonYear}`
      );
    }

    if (formData.loanType === "Jumbo Loans") {
      const interestRate = Number(formData.interestRate) / 100;
      const loanTerm = Number(formData.loanTerm);

      if (
        !formData.interestRate ||
        isNaN(interestRate) ||
        !formData.loanTerm ||
        isNaN(loanTerm) ||
        loanTerm <= 0 ||
        interestRate <= 0
      ) {
        alert("Please enter valid Jumbo Loan values.");
        return;
      }

      alert(
        `Jumbo Loan:\nHome Price: $${homePrice}\nDown Payment: $${downPayment}\nInterest Rate: ${
          interestRate * 100
        }%\nLoan Term: ${loanTerm} years`
      );
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
          {/* Mortgage Type */}
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
          {/* Mortgage-specific Fields */}
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
          {formData.loanType === "Interest Only" && (
            <InterestOnly
              homePrice={formData.homePrice}
              downPayment={formData.downPayment}
              interestRate={formData.interestRate}
              interestOnlyPeriod={formData.interestOnlyPeriod}
              totalTerm={formData.totalTerm}
              onChange={handleChange}
            />
          )}
          {formData.loanType === "ARM" && (
            <ARM
              homePrice={formData.homePrice}
              downPayment={formData.downPayment}
              initialRate={formData.initialRate}
              armType={formData.armType}
              onChange={handleChange}
            />
          )}
          {formData.loanType === "Balloon Payments" && (
            <Balloon
              homePrice={formData.homePrice}
              downPayment={formData.downPayment}
              interestRate={formData.interestRate}
              loanTerm={formData.loanTerm}
              balloonYear={formData.balloonYear}
              onChange={handleChange}
            />
          )}
          {formData.loanType === "Jumbo Loans" && (
            <Jumbo
              homePrice={formData.homePrice}
              downPayment={formData.downPayment}
              interestRate={formData.interestRate}
              loanTerm={formData.loanTerm}
              onChange={handleChange}
            />
          )}
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
          </tr>{" "}
        </tbody>
      </table>

      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <SubmitButton text="Continue" />
      </div>

      {resultado && (
        <div
          style={{
            marginTop: "25px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #10b981",
            color: "#065f46",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          <p>Monthly Payment: ${resultado.monthlyPayment.toLocaleString()}</p>
          <p>Loan Amount: ${resultado.loanAmount.toLocaleString()}</p>
          <p>Total Payments: {resultado.totalPayments}</p>
          <p>Monthly Interest Rate: {resultado.monthlyRate}%</p>
        </div>
      )}
    </form>
  );
};

export default MortgageForm;
