"use client";

import { useState } from "react";
import { api } from "@/lib/api";

type InferenceResponse = {
  test: string;
  statistic: number;
  p_value: number;
  alpha: number;
  alternative?: string;
  ci?: number[];
  latex_ci?: string;
  decision: string;
  df_between?: number;
  df_within?: number;
  error?: string;
};

type Props = {
  onResult: (result: InferenceResponse | null) => void;
};

// Inputs que se envían al backend según el test
type InferencePayload =
  | {
      test: "z" | "t";
      xbar: number;
      mu0: number;
      s: number;
      n: number;
      alpha: number;
      alternative: string;
    }
  | {
      test: "chi2";
      s: number;
      mu0: number;
      n: number;
      alpha: number;
      alternative: string;
    }
  | {
      test: "anova";
      groups: number[][];
      alpha: number;
    };

export default function InferenceInput({ onResult }: Props) {
  const [test, setTest] = useState<"z" | "t" | "chi2" | "anova">("z");

  // Comunes
  const [xbar, setXbar] = useState("");
  const [mu0, setMu0] = useState("");
  const [s, setS] = useState("");
  const [n, setN] = useState("");
  const [alpha, setAlpha] = useState("0.05");
  const [alternative, setAlternative] = useState("!=");

  // ANOVA
  const [groups, setGroups] = useState<string[]>([""]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let payload: InferencePayload;

    if (test === "z" || test === "t") {
      payload = {
        test,
        xbar: Number(xbar),
        mu0: Number(mu0),
        s: Number(s),
        n: Number(n),
        alpha: Number(alpha),
        alternative,
      };
    } else if (test === "chi2") {
      payload = {
        test: "chi2",
        s: Number(s),
        mu0: Number(mu0),
        n: Number(n),
        alpha: Number(alpha),
        alternative,
      };
    } else {
      payload = {
        test: "anova",
        groups: groups
          .map((g) => g.split(",").map((x) => Number(x.trim())))
          .filter((arr) => arr.length > 0),
        alpha: Number(alpha),
      };
    }

    try {
      setLoading(true);
      const res = await api.post<InferenceResponse>("/inference", payload);
      onResult(res.data);
    } catch (err) {
      console.error("Error fetching inference result:", err);
      onResult({
        error: "Error fetching inference result",
      } as InferenceResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">
        Confidence Intervals & Hypothesis Tests
      </h2>

      {/* Selector de test */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-medium">Test type</label>
        <select
          value={test}
          onChange={(e) => setTest(e.target.value as typeof test)}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="z">Z-test</option>
          <option value="t">T-test</option>
          <option value="chi2">Chi² test (variance)</option>
          <option value="anova">ANOVA (one-way)</option>
        </select>
      </div>

      {/* Inputs dinámicos */}
      {(test === "z" || test === "t") && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Sample mean (x̄)</label>
            <input
              type="number"
              value={xbar}
              onChange={(e) => setXbar(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Hypothesized mean (μ₀)</label>
            <input
              type="number"
              value={mu0}
              onChange={(e) => setMu0(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Std. deviation (σ or s)</label>
            <input
              type="number"
              value={s}
              onChange={(e) => setS(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Sample size (n)</label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>
      )}

      {test === "chi2" && (
        <div className="space-y-4 mb-4">
          <div>
            <label className="font-medium">Sample variance (s²)</label>
            <input
              type="number"
              value={s}
              onChange={(e) => setS(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium">Hypothesized variance (σ₀²)</label>
            <input
              type="number"
              value={mu0}
              onChange={(e) => setMu0(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium">Sample size (n)</label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      )}

      {test === "anova" && (
        <div className="space-y-4 mb-4">
          <p className="text-sm text-gray-600">
            Enter each group as comma-separated values. Example: <br />
            <code>5,6,7</code> | <code>8,9,10</code>
          </p>
          {groups.map((g, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={g}
                onChange={(e) => {
                  const newGroups = [...groups];
                  newGroups[idx] = e.target.value;
                  setGroups(newGroups);
                }}
                className="flex-1 border rounded px-3 py-2"
                placeholder={`Group ${idx + 1}`}
              />
              {idx === groups.length - 1 && groups.length < 6 && (
                <button
                  type="button"
                  onClick={() => setGroups([...groups, ""])}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              )}
              {groups.length > 1 && (
                <button
                  type="button"
                  onClick={() => setGroups(groups.filter((_, i) => i !== idx))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Nivel de significancia */}
      <div className="mt-4 mb-4">
        <label className="font-medium">Significance level (α)</label>
        <input
          type="number"
          step="0.01"
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Alternativa solo en Z/T/Chi² */}
      {(test === "z" || test === "t" || test === "chi2") && (
        <div className="mt-4 mb-6">
          <label className="font-medium">Alternative hypothesis</label>
          <select
            value={alternative}
            onChange={(e) => setAlternative(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="!=">H₁: ≠</option>
            <option value=">">H₁: &gt;</option>
            <option value="<">H₁: &lt;</option>
          </select>
        </div>
      )}

      {/* Botón */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
      >
        {loading ? "Calculating..." : "Calculate"}
      </button>
    </div>
  );
}
