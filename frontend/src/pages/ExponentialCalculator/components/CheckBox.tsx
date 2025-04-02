import React from "react";

interface CheckBoxProps {
  label: React.ReactNode;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  name,
  checked,
  onChange,
}) => (
  <tr>
    <td
      colSpan={2}
      style={{ textAlign: "left", paddingTop: "25px", paddingBottom: "12px" }}
    >
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          style={{ marginRight: "8px" }}
        />
        {label}
      </label>
    </td>
  </tr>
);

export default CheckBox;
