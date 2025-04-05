import React from "react";
import InputField from "@/components/InputField";

interface Props {
  homePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Jumbo: React.FC<Props> = ({
  homePrice,
  downPayment,
  interestRate,
  loanTerm,
  onChange,
}) => {
  return (
    <>
      <InputField
        label="Home Price"
        name="homePrice"
        value={homePrice}
        onChange={onChange}
        placeholder="Ej: 800000"
      />
      <InputField
        label="Down Payment"
        name="downPayment"
        value={downPayment}
        onChange={onChange}
        placeholder="Ej: 200000"
      />
      <InputField
        label="Interest Rate (%)"
        name="interestRate"
        value={interestRate}
        onChange={onChange}
        placeholder="Ej: 5.25"
      />
      <InputField
        label="Loan Term (Years)"
        name="loanTerm"
        value={loanTerm}
        onChange={onChange}
        placeholder="Ej: 30"
      />
    </>
  );
};

export default Jumbo;
