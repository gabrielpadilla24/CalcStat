import React, { useState, useEffect } from "react";
import SubmitButton from "@/components/SubmitButton";
import FRM from "./FRM";
import ARM from "./ARMForm";
import InterestOnly from "./InterestOnly";
import BalloonPayment from "./BalloonPayment";

interface Props {
  setTotalPayment: (value: number) => void;
  setResultado: (
    value: {
      monthlyPayment: number;
      loanAmount: number;
      totalPayments: number;
      monthlyRate: number;
      fixedYearsMessage?: string;
      secondPayment?: number;
    } | null
  ) => void;
  setPrincipalPaid: (arr: number[]) => void;
  setInterestPaid: (arr: number[]) => void;
  setLoanBalance: (arr: number[]) => void;
  setPropertyTaxes: (value: string) => void;
  setHOAFees: (value: string) => void;
  setInsurance: (value: string) => void;
  setLoanType: (type: string) => void;
  showLoanTypeSelector?: boolean;
  loanType: string;
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
  setLoanType,
  showLoanTypeSelector = true,
  loanType,
}) => {
  const detectLoanTypeFromURL = (): string => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("fixed")) return "Fixed Rate";
    if (path.includes("arm")) return "ARM";
    if (path.includes("interest")) return "Interest Only";
    if (path.includes("balloon")) return "Balloon Payments";
    return "";
  };

  const [formData, setFormData] = useState({
    loanType: showLoanTypeSelector ? "" : detectLoanTypeFromURL(),
    homePrice: "",
    downPayment: "",
    duration: "",
    interestRate: "",
    interestOnlyPeriod: "",
    initialRate: "",
    armType: "",
    loanTerm: "",
    propertyTaxes: "",
    hoaFees: "",
    insurance: "",
    balloonYear: "",
  });

  useEffect(() => {
    if (!showLoanTypeSelector) {
      const autoLoanType = detectLoanTypeFromURL();
      setFormData((prev) => ({ ...prev, loanType: autoLoanType }));
      setLoanType(autoLoanType);
    }
  }, [showLoanTypeSelector, setLoanType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "loanType") {
      setLoanType(value);
    }

    const shouldClear = !["propertyTaxes", "hoaFees", "insurance"].includes(
      name
    );

    if (shouldClear) {
      setResultado(null);
      setTotalPayment(0);
    }

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
      alert("Please enter a valid, positive Home Price.");
      return;
    }

    if (isNaN(downPayment) || downPayment < 0) {
      alert("Please enter a valid Down Payment (0 or more).");
      return;
    }

    if (downPayment > homePrice) {
      alert("The Down Payment cannot be greater than the Home Price.");
      return;
    }

    // -----------------------------
    // Fixed Rate
    // -----------------------------
    if (formData.loanType === "Fixed Rate") {
      const interestRate = Number(formData.interestRate);
      const duration = Number(formData.duration);

      if (!duration || isNaN(duration) || duration <= 0) {
        alert("Please select a valid mortgage duration.");
        return;
      }

      if (!interestRate || isNaN(interestRate) || interestRate <= 0) {
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
          alert("There was an error calculating the monthly payment.");
        });

      return;
    }

    // -----------------------------
    // ARM
    // -----------------------------
    if (formData.loanType === "ARM") {
      const initialRate = Number(formData.initialRate);
      const loanTerm = Number(formData.loanTerm);

      if (
        isNaN(initialRate) ||
        initialRate <= 0 ||
        isNaN(loanTerm) ||
        loanTerm <= 0 ||
        !formData.armType
      ) {
        alert("Please fill all ARM fields correctly.");
        return;
      }

      fetch("http://localhost:8000/arm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homePrice,
          downPayment,
          initialRate,
          armType: formData.armType,
          loanTerm,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Backend error");
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
            fixedYearsMessage,
          } = data;

          setResultado({
            monthlyPayment,
            loanAmount,
            totalPayments,
            monthlyRate,
            fixedYearsMessage,
          });

          setTotalPayment(monthlyPayment);
          setPrincipalPaid(principalPaid);
          setInterestPaid(interestPaid);
          setLoanBalance(loanBalance);
        })
        .catch((err) => {
          console.error(err);
          alert("There was an error calculating the ARM payment.");
        });

      return;
    }

    // -----------------------------
    // Interest Only
    // -----------------------------
    if (formData.loanType === "Interest Only") {
      const interestRate = Number(formData.interestRate);
      const interestOnlyPeriod = Number(formData.interestOnlyPeriod);
      const totalTerm = Number(formData.loanTerm);

      if (
        isNaN(interestRate) ||
        interestRate <= 0 ||
        isNaN(interestOnlyPeriod) ||
        interestOnlyPeriod <= 0 ||
        isNaN(totalTerm) ||
        totalTerm <= 0 ||
        interestOnlyPeriod >= totalTerm
      ) {
        alert(
          "Please fill all Interest Only fields correctly. Note: Interest-only period must be less than the total term."
        );
        return;
      }

      fetch("http://localhost:8000/interestonly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homePrice,
          downPayment,
          interestRate,
          interestOnlyPeriod,
          totalTerm,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Backend error");
          return res.json();
        })
        .then((data) => {
          const {
            interestOnlyPayment,
            fixedPaymentAfter,
            loanAmount,
            totalPayments,
            monthlyRate,
            principalPaid,
            interestPaid,
            loanBalance,
          } = data;

          setResultado({
            monthlyPayment: interestOnlyPayment,
            secondPayment: fixedPaymentAfter,
            loanAmount,
            totalPayments,
            monthlyRate,
          });

          setPrincipalPaid(principalPaid); // ✅ usar los datos reales
          setInterestPaid(interestPaid); // ✅ usar los datos reales
          setLoanBalance(loanBalance); // ✅ usar los datos reales
          setTotalPayment(interestOnlyPayment);
        })

        .catch((err) => {
          console.error(err);
          alert("There was an error calculating the Interest Only payment.");
        });

      return;
    }

    // -----------------------------
    // Balloon Payments
    // -----------------------------
    if (formData.loanType === "Balloon Payments") {
      const interestRate = Number(formData.interestRate);
      const loanTerm = Number(formData.loanTerm);
      const balloonYear = Number(formData.balloonYear);

      if (
        isNaN(interestRate) ||
        interestRate <= 0 ||
        isNaN(loanTerm) ||
        loanTerm <= 0 ||
        isNaN(balloonYear) ||
        balloonYear <= 0
      ) {
        alert("Please fill all Balloon Payment fields correctly.");
        return;
      }

      // ✅ VALIDACIÓN ADICIONAL
      if (balloonYear >= loanTerm) {
        alert(
          "Balloon Year must be less than the Loan Term. Otherwise, it's just a regular fixed-rate loan."
        );
        return;
      }

      fetch("http://localhost:8000/balloon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homePrice,
          downPayment,
          interestRate,
          loanTerm,
          balloonYear,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Backend error");
          return res.json();
        })
        .then((data) => {
          const {
            monthlyPayment,
            loanAmount,
            monthlyRate,
            principalPaid,
            interestPaid,
            loanBalance,
            secondPayment, // 👈 asegúrate que esto se incluya
          } = data;

          setResultado({
            monthlyPayment,
            secondPayment, // 👈 para habilitar la tab
            loanAmount,
            totalPayments: balloonYear * 12,
            monthlyRate,
          });

          setTotalPayment(monthlyPayment);
          setPrincipalPaid(principalPaid);
          setInterestPaid(interestPaid);
          setLoanBalance(loanBalance);
        })
        .catch((err) => {
          console.error(err);
          alert("There was an error calculating the Balloon Payment.");
        });

      return;
    }

    alert("This mortgage type is not yet implemented.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        bg-white 
        rounded-lg 
        shadow-md 
        p-6 
        w-[550px] 
        flex 
        flex-col 
        justify-between 
        transition-all 
        duration-300
        ${
          loanType === "Interest Only"
            ? "h-[576px]"
            : loanType === "Balloon Payments"
            ? "h-[576px]"
            : loanType === "Fixed Rate"
            ? "h-[516px]"
            : loanType === "ARM"
            ? "h-[576px]"
            : "h-[460px]" // Default para Fixed Rate, ARM, etc.
        }
      `}
    >
      <table className="w-full space-y-4">
        <tbody>
          {/* Tipo de Hipoteca (solo si se permite seleccionar) */}
          {showLoanTypeSelector && (
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
                </select>
              </td>
            </tr>
          )}

          {/* Campos dinámicos por tipo */}
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

          {formData.loanType === "ARM" && (
            <>
              <tr>
                <td>
                  <label htmlFor="loanTerm">Loan Term (Years):</label>
                </td>
                <td>
                  <select
                    id="loanTerm"
                    name="loanTerm"
                    value={formData.loanTerm}
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
              <ARM
                homePrice={formData.homePrice}
                downPayment={formData.downPayment}
                initialRate={formData.initialRate}
                armType={formData.armType}
                onChange={handleChange}
              />
            </>
          )}

          {formData.loanType === "Interest Only" && (
            <>
              <tr>
                <td>
                  <label htmlFor="loanTerm">Loan Term (Years):</label>
                </td>
                <td>
                  <select
                    id="loanTerm"
                    name="loanTerm"
                    value={formData.loanTerm}
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
              <InterestOnly
                homePrice={formData.homePrice}
                downPayment={formData.downPayment}
                interestRate={formData.interestRate}
                interestOnlyPeriod={formData.interestOnlyPeriod}
                onChange={handleChange}
              />
            </>
          )}

          {formData.loanType === "Balloon Payments" && (
            <>
              <tr>
                <td>
                  <label htmlFor="loanTerm">Loan Term (Years):</label>
                </td>
                <td>
                  <select
                    id="loanTerm"
                    name="loanTerm"
                    value={formData.loanTerm}
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
              <BalloonPayment
                homePrice={formData.homePrice}
                downPayment={formData.downPayment}
                interestRate={formData.interestRate}
                balloonYear={formData.balloonYear}
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
