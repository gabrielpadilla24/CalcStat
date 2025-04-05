import React from "react";
import InputField from "@/components/InputField";

interface Props {
  homePrice: string;
  downPayment: string;
  interestRate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FRM: React.FC<Props> = ({
  homePrice,
  downPayment,
  interestRate,
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
        placeholder="Ej: 5"
      />
    </>
  );
};

export default FRM;
