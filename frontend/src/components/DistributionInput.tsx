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
  const [k, setK] = useState<number>(0);
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(1);

  const handleUpdate = (update: Partial<ProbabilityQuery>) => {
    let q: ProbabilityQuery;
    switch (queryType) {
      case "equal":
        q = { kind: "equal", k };
        break;
      case "leq":
        q = { kind: "leq", k };
        break;
      case "geq":
        q = { kind: "geq", k };
        break;
      case "between":
        q = { kind: "between", a, b };
        break;
    }
    onChange(q);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold">Probability Query</h3>

      {/* Selección de tipo de consulta */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="equal"
            checked={queryType === "equal"}
            onChange={() => setQueryType("equal")}
          />
          P(X = k)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="leq"
            checked={queryType === "leq"}
            onChange={() => setQueryType("leq")}
          />
          P(X ≤ k)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="geq"
            checked={queryType === "geq"}
            onChange={() => setQueryType("geq")}
          />
          P(X ≥ k)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="between"
            checked={queryType === "between"}
            onChange={() => setQueryType("between")}
          />
          P(a ≤ X ≤ b)
        </label>
      </div>

      {/* Inputs dinámicos según el tipo */}
      {queryType === "equal" && (
        <div className="flex items-center gap-2">
          <label>k:</label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-24"
            value={k}
            onChange={(e) => {
              setK(Number(e.target.value));
              handleUpdate({ k: Number(e.target.value) });
            }}
          />
        </div>
      )}

      {queryType === "leq" && (
        <div className="flex items-center gap-2">
          <label>k:</label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-24"
            value={k}
            onChange={(e) => {
              setK(Number(e.target.value));
              handleUpdate({ k: Number(e.target.value) });
            }}
          />
        </div>
      )}

      {queryType === "geq" && (
        <div className="flex items-center gap-2">
          <label>k:</label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-24"
            value={k}
            onChange={(e) => {
              setK(Number(e.target.value));
              handleUpdate({ k: Number(e.target.value) });
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
              value={a}
              onChange={(e) => {
                const val = Number(e.target.value);
                setA(val);
                handleUpdate({ a: val, b });
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>b:</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-24"
              value={b}
              onChange={(e) => {
                const val = Number(e.target.value);
                setB(val);
                handleUpdate({ a, b: val });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
