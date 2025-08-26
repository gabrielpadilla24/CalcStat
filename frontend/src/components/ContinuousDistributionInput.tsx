"use client";

import { useState } from "react";

// ⚡ Queries válidas en distribuciones continuas
export type ContinuousQuery =
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type Props = {
  onChange: (query: ContinuousQuery) => void;
};

export default function ContinuousDistributionInput({ onChange }: Props) {
  const [kind, setKind] = useState<ContinuousQuery["kind"]>("leq");
  const [k, setK] = useState<number>(0);
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(1);

  const handleUpdate = (newKind: ContinuousQuery["kind"]) => {
    setKind(newKind);
    if (newKind === "leq" || newKind === "geq") {
      onChange({ kind: newKind, k });
    } else if (newKind === "between") {
      onChange({ kind: "between", a, b });
    }
  };

  const handleK = (val: number) => {
    setK(val);
    if (kind === "leq" || kind === "geq") {
      onChange({ kind, k: val });
    }
  };

  const handleA = (val: number) => {
    setA(val);
    if (kind === "between") {
      onChange({ kind: "between", a: val, b });
    }
  };

  const handleB = (val: number) => {
    setB(val);
    if (kind === "between") {
      onChange({ kind: "between", a, b: val });
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
      <p className="font-medium">Probability Query (Continuous)</p>

      {/* Opciones */}
      <div className="flex flex-col gap-2">
        <label>
          <input
            type="radio"
            checked={kind === "leq"}
            onChange={() => handleUpdate("leq")}
          />{" "}
          P(X ≤ k)
        </label>
        <label>
          <input
            type="radio"
            checked={kind === "geq"}
            onChange={() => handleUpdate("geq")}
          />{" "}
          P(X ≥ k)
        </label>
        <label>
          <input
            type="radio"
            checked={kind === "between"}
            onChange={() => handleUpdate("between")}
          />{" "}
          P(a ≤ X ≤ b)
        </label>
      </div>

      {/* Inputs dinámicos */}
      {kind !== "between" && (
        <div className="flex items-center gap-2">
          <span className="font-medium">k:</span>
          <input
            type="number"
            value={k}
            onChange={(e) => handleK(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
      )}

      {kind === "between" && (
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span>a:</span>
            <input
              type="number"
              value={a}
              onChange={(e) => handleA(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>b:</span>
            <input
              type="number"
              value={b}
              onChange={(e) => handleB(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
