import React, { useState } from "react";
import InputField from "../../../components/InputField";
import SubmitButton from "../../../components/SubmitButton";
import CheckBox from "./CheckBox";
import Tooltip from "../../../components/Tooltip/Tooltip";

interface Props {
  setValoresPorAño: (valores: number[]) => void;
  setAportesPorAño: (aportes: number[]) => void;
  setFormulaData: (data: {
    P: number;
    r: number;
    t: number;
    C: number;
    frequency: string;
  }) => void;
  setMostrarFormulaConValores: (visible: boolean) => void;
  scrollToFormula: () => void;
}

const ExponentialForm: React.FC<Props> = ({
  setValoresPorAño,
  setAportesPorAño,
  setFormulaData,
  setMostrarFormulaConValores,
  scrollToFormula,
}) => {
  const [formData, setFormData] = useState({
    initialValue: "",
    growthRate: "",
    time: "",
    addConstant: false,
    constantValue: "",
    frequency: "",
  });

  const [resultado, setResultado] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const checked = e.target.checked;

      if (name === "addConstant" && !checked) {
        setFormData({
          ...formData,
          addConstant: false,
          constantValue: "",
          frequency: "",
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const formatearNumero = (valor: number): string => {
    return valor.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.initialValue || !formData.growthRate || !formData.time) {
      alert("Please fill in the required fields.");
      return;
    }

    if (
      formData.addConstant &&
      (!formData.constantValue || !formData.frequency)
    ) {
      alert("Please fill in the constant contribution fields.");
      return;
    }

    const payload = {
      initialValue: Number(formData.initialValue),
      growthRate: Number(formData.growthRate),
      time: Number(formData.time),
      addConstant: formData.addConstant,
      constantValue: formData.addConstant ? Number(formData.constantValue) : 0,
      frequency: formData.addConstant ? formData.frequency : "Yearly",
    };

    fetch("http://localhost:8000/calcular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response error");
        }
        return res.json();
      })
      .then(
        (data: {
          resultado: number;
          valoresPorAño: number[];
          aportesPorAño: number[];
        }) => {
          setResultado(data.resultado);
          setValoresPorAño(data.valoresPorAño);
          setAportesPorAño(data.aportesPorAño);

          setFormulaData({
            P: Number(formData.initialValue),
            r: Number(formData.growthRate) / 100,
            t: Number(formData.time),
            C: formData.addConstant ? Number(formData.constantValue) : 0,
            frequency: formData.addConstant ? formData.frequency : "Yearly",
          });

          setMostrarFormulaConValores(true);
        }
      )
      .catch((err) => {
        console.error("Error connecting to Backend:", err);
        alert("Error connecting to Server");
      });
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
        height: formData.addConstant ? "600px" : "auto", // Cambia la altura dinámicamente
        transition: "height 0.3s ease", // Transición suave al cambiar la altura
      }}
    >
      <table style={{ width: "100%", borderSpacing: "12px" }}>
        <tbody>
          <InputField
            label="Initial Amount"
            name="initialValue"
            value={formData.initialValue}
            onChange={handleChange}
            placeholder="Ej: 1000"
          />
          <InputField
            label="Interest Rate (%)"
            name="growthRate"
            value={formData.growthRate}
            onChange={handleChange}
            placeholder="Ej: 5"
          />
          <InputField
            label="Time Period (Years)"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Ej: 12"
          />
          <CheckBox
            label={
              <>
                Add Constant Contribution{" "}
                <Tooltip message="Add recurring contributions" width="110px" />
              </>
            }
            name="addConstant"
            checked={formData.addConstant}
            onChange={handleChange}
          />
          {formData.addConstant && (
            <>
              <tr style={{ height: "60px" }}>
                <td align="left" style={{ width: "50%" }}>
                  <label htmlFor="constantValue">
                    Contribution Amount:{" "}
                    <Tooltip
                      message="Monthly addition to the principal (use negative for withdrawals)"
                      width="190px"
                    />
                  </label>
                </td>
                <td>
                  <input
                    type="number"
                    id="constantValue"
                    name="constantValue"
                    value={formData.constantValue}
                    onChange={handleChange}
                    placeholder="Ej: 100"
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
                <td align="left" style={{ width: "50%" }}>
                  <label htmlFor="frequency">Contribution Frequency:</label>
                </td>
                <td>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <SubmitButton text="Calculate" />
      </div>

      {resultado !== null && (
        <div
          style={{
            marginTop: "25px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #10b981",
            color: "#065f46",
            fontWeight: "bold",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          Final Amount: {formatearNumero(resultado)}
        </div>
      )}

      {/* Nuevo contenido agregado aquí */}
      <div
        onClick={scrollToFormula}
        className="mt-4 text-center text-sm text-gray-500 flex justify-center items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors"
        style={{ marginTop: "15px" }}
      >
        <span className="text-lg">↓</span>
        <span>See how it was calculated</span>
      </div>
    </form>
  );
};

export default ExponentialForm;
