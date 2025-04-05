import React from "react";
import InputField from "@/components/InputField";

interface Props {
  homePrice: string;
  downPayment: string;
  initialRate: string;
  armType: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ARM: React.FC<Props> = ({
  homePrice,
  downPayment,
  initialRate,
  armType,
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
        label="Initial Interest Rate (%)"
        name="initialRate"
        value={initialRate}
        onChange={onChange}
        placeholder="Ej: 4.5"
      />

      {/* Select ARM Type */}
      <tr style={{ height: "60px" }}>
        <td align="left" style={{ width: "50%" }}>
          <label htmlFor="armType">ARM Type:</label>
        </td>
        <td>
          <select
            id="armType"
            name="armType"
            value={armType}
            onChange={onChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select</option>
            <option value="5/1">5/1 ARM</option>
            <option value="5/6">5/6 ARM</option>
            <option value="7/1">7/1 ARM</option>
            <option value="7/6">7/6 ARM</option>
            <option value="10/1">10/1 ARM</option>
            <option value="10/6">10/6 ARM</option>
          </select>
        </td>
      </tr>
    </>
  );
};

export default ARM;
