import React from "react";
import InputField from "@/components/InputField";

interface Props {
  homePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  balloonYear: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Balloon: React.FC<Props> = ({
  homePrice,
  downPayment,
  interestRate,
  loanTerm,
  balloonYear,
  onChange,
}) => {
  return (
    <>
      <InputField
        label="Home Price"
        name="homePrice"
        value={homePrice}
        onChange={onChange}
        placeholder="Ej: 350000"
      />
      <InputField
        label="Down Payment"
        name="downPayment"
        value={downPayment}
        onChange={onChange}
        placeholder="Ej: 70000"
      />
      <InputField
        label="Interest Rate (%)"
        name="interestRate"
        value={interestRate}
        onChange={onChange}
        placeholder="Ej: 4.5"
      />
      <InputField
        label="Loan Term (Years)"
        name="loanTerm"
        value={loanTerm}
        onChange={onChange}
        placeholder="Ej: 7"
      />
      <InputField
        label="Balloon Payment Year"
        name="balloonYear"
        value={balloonYear}
        onChange={onChange}
        placeholder="Ej: 7"
      />
    </>
  );
};

export default Balloon;
