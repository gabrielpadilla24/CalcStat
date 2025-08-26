"use client";

import { useState } from "react";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type Props = {
  onChange: (query: ProbabilityQuery) => void;
};

export default function DistributionInput({ onChange }: Props) {
  const [queryType, setQueryType] = useState<ProbabilityQuery["kind"]>("equal");

  // inicializamos vacíos
  const [kStr, setKStr] = useState<string>("");
  const [aStr, setAStr] = useState<string>("");
  const [bStr, setBStr] = useState<string>("");

  // ⚡ ahora handleUpdate recibe los valores explícitos
  const handleUpdate = (
    kind: ProbabilityQuery["kind"],
    k?: string,
    a?: string,
    b?: string
  ) => {
    let q: ProbabilityQuery;
    switch (kind) {
      case "equal":
        q = { kind: "equal", k: Number(k) };
        break;
      case "leq":
        q = { kind: "leq", k: Number(k) };
        break;
      case "geq":
        q = { kind: "geq", k: Number(k) };
        break;
      case "between":
        q = { kind: "between", a: Number(a), b: Number(b) };
        break;
    }
    onChange(q);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold">Probability Query</h3>

      {/* Selección de tipo */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="equal"
            checked={queryType === "equal"}
            onChange={() => {
              setQueryType("equal");
              handleUpdate("equal", kStr);
            }}
          />
          P(X = k)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="leq"
            checked={queryType === "leq"}
            onChange={() => {
              setQueryType("leq");
              handleUpdate("leq", kStr);
            }}
          />
          P(X ≤ k)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="geq"
            checked={queryType === "geq"}
            onChange={() => {
              setQueryType("geq");
              handleUpdate("geq", kStr);
            }}
          />
          P(X ≥ k)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="between"
            checked={queryType === "between"}
            onChange={() => {
              setQueryType("between");
              handleUpdate("between", undefined, aStr, bStr);
            }}
          />
          P(a ≤ X ≤ b)
        </label>
      </div>

      {/* Inputs dinámicos */}
      {["equal", "leq", "geq"].includes(queryType) && (
        <div className="flex items-center gap-2">
          <label>k:</label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-24"
            value={kStr}
            placeholder="Enter k"
            onChange={(e) => {
              const val = e.target.value.replace(/^0+(\d)/, "$1");
              setKStr(val);
              handleUpdate(queryType, val);
            }}
          />
        </div>
      )}

      {queryType === "between" && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label>a:</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-24"
              value={aStr}
              placeholder="Enter a"
              onChange={(e) => {
                const val = e.target.value.replace(/^0+(\d)/, "$1");
                setAStr(val);
                handleUpdate("between", undefined, val, bStr);
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>b:</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-24"
              value={bStr}
              placeholder="Enter b"
              onChange={(e) => {
                const val = e.target.value.replace(/^0+(\d)/, "$1");
                setBStr(val);
                handleUpdate("between", undefined, aStr, val);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
