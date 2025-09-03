"use client";

import { useState } from "react";

type Props = {
  onSubmit: (
    equation: string,
    variableType: "discrete" | "continuous",
    support?: number[],
    interval?: number[]
  ) => void;
  loading?: boolean;
};

export default function MathInputProbability({ onSubmit, loading }: Props) {
  const [equation, setEquation] = useState("");
  const [variableType, setVariableType] = useState<"discrete" | "continuous">(
    "discrete"
  );
  const [support, setSupport] = useState(""); // para discretas
  const [interval, setInterval] = useState(""); // para continuas

  const handleSubmit = () => {
    if (!equation.trim()) return;

    if (variableType === "discrete") {
      const supportArray = support
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((v) => !isNaN(v));
      onSubmit(equation, variableType, supportArray);
    } else {
      const intervalArray = interval
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((v) => !isNaN(v));
      onSubmit(equation, variableType, undefined, intervalArray);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tipo de variable */}
      <div>
        <label className="font-medium">Variable type</label>
        <select
          value={variableType}
          onChange={(e) =>
            setVariableType(e.target.value as "discrete" | "continuous")
          }
          className="border rounded px-3 py-2 ml-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="discrete">Discrete</option>
          <option value="continuous">Continuous</option>
        </select>
      </div>

      {/* Ecuación */}
      <div>
        <label className="font-medium">Probability function f(x)</label>
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          placeholder="e.g. x/10, 0.5*exp(-0.5x)"
          className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Support o Interval */}
      {variableType === "discrete" ? (
        <div>
          <label className="font-medium">Support (comma separated)</label>
          <input
            type="text"
            value={support}
            onChange={(e) => setSupport(e.target.value)}
            placeholder="e.g. 0,1,2,3"
            className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ) : (
        <div>
          <label className="font-medium">Interval [a,b]</label>
          <input
            type="text"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            placeholder="e.g. 0,10"
            className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* Botón */}
      <button
        onClick={handleSubmit}
        disabled={loading || !equation.trim()}
        className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition mt-2"
      >
        {loading ? "Calculating..." : "Submit"}
      </button>
    </div>
  );
}
