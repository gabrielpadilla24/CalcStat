import React, { useState } from "react";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import CheckBox from "@/components/CheckBox";
import Tooltip from "@/components/Tooltip/Tooltip";
import { api } from "@/lib/api";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      initialValue: Number(formData.initialValue),
      growthRate: Number(formData.growthRate),
      time: Number(formData.time),
      addConstant: formData.addConstant,
      constantValue: formData.addConstant ? Number(formData.constantValue) : 0,
      frequency: formData.addConstant ? formData.frequency : "Yearly",
    };

    try {
      const res = await api.post<{
        resultado: number;
        valoresPorAño: number[];
        aportesPorAño: number[];
      }>("/compoundinterest", payload);

      const data = res.data;

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
    } catch (err) {
      console.error("Error connecting to Backend:", err);
      alert("Error connecting to Server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md md:max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-md mx-auto transition-all"
    >
      {/* Campos */}
      <div className="space-y-6">
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
          <div className="space-y-6">
            <div>
              <label
                htmlFor="constantValue"
                className="block text-sm font-medium text-gray-700"
              >
                Contribution Amount:{" "}
                <Tooltip
                  message="Monthly addition to the principal (use negative for withdrawals)"
                  width="190px"
                />
              </label>
              <input
                type="number"
                id="constantValue"
                name="constantValue"
                value={formData.constantValue}
                onChange={handleChange}
                placeholder="Ej: 100"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#5FBA9B] focus:border-[#5FBA9B] sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="frequency"
                className="block text-sm font-medium text-gray-700"
              >
                Contribution Frequency:
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#5FBA9B] focus:border-[#5FBA9B] sm:text-sm"
              >
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Botón */}
      <div className="mt-6 text-center">
        <SubmitButton text="Calculate" />
      </div>

      {/* Resultado */}
      {resultado !== null && (
        <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-400 text-green-800 font-bold text-lg text-center">
          Final Amount: {formatearNumero(resultado)}
        </div>
      )}

      {/* Scroll a fórmula */}
      <div
        onClick={scrollToFormula}
        className="mt-4 text-center text-sm text-gray-500 flex justify-center items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors"
      >
        <span className="text-lg">↓</span>
        <span>See how it was calculated</span>
      </div>
    </form>
  );
};

export default ExponentialForm;
