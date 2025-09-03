"use client";

import { useState } from "react";

type CLTResponse = {
  simulatedMeans?: number[];
  simMean?: number;
  simVar?: number;
  theoMean?: number;
  theoVar?: number;
  mu?: number;
  sigma2?: number;
  n?: number;
  n_sim?: number;
  distribution?: string;
  params?: Record<string, number>;
  error?: string;
};

type Props = {
  onResult: (result: CLTResponse | null) => void;
};

export default function CLTInput({ onResult }: Props) {
  const [distribution, setDistribution] = useState("bernoulli");
  const [params, setParams] = useState<Record<string, string>>({ p: "0.5" });
  const [n, setN] = useState("30");
  const [nSim, setNSim] = useState("1000");
  const [loading, setLoading] = useState(false);

  // campos dinámicos según distribución
  const distParams: Record<string, string[]> = {
    bernoulli: ["p"],
    binomial: ["n", "p"],
    poisson: ["lam"],
    uniform: ["a", "b"],
    exponential: ["lam"],
    normal: ["mu", "sigma"],
  };

  const handleParamChange = (key: string, value: string) => {
    setParams({ ...params, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const parsedParams: Record<string, number> = {};
      Object.entries(params).forEach(([k, v]) => {
        const num = Number(v);
        if (!isNaN(num)) parsedParams[k] = num;
      });

      const payload = {
        distribution,
        params: parsedParams,
        n: Number(n),
        n_sim: Number(nSim),
      };

      const res = await fetch("http://127.0.0.1:8000/clt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Backend error");

      const data: CLTResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error fetching CLT result:", err);
      onResult({ error: "Failed to run simulation" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full h-[495px]">
      <h2 className="text-xl font-bold text-center mb-6">
        Central Limit Theorem Simulator
      </h2>

      {/* Distribution selector */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-medium">Distribution</label>
        <select
          value={distribution}
          onChange={(e) => {
            const dist = e.target.value;
            setDistribution(dist);
            setParams({});
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="bernoulli">Bernoulli(p)</option>
          <option value="binomial">Binomial(n, p)</option>
          <option value="poisson">Poisson(λ)</option>
          <option value="uniform">Uniform(a, b)</option>
          <option value="exponential">Exponential(λ)</option>
          <option value="normal">Normal(μ, σ)</option>
        </select>
      </div>

      {/* Dynamic parameters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {distParams[distribution].map((param) => (
          <div key={param} className="flex flex-col gap-1">
            <label className="font-medium">{param}</label>
            <input
              type="number"
              value={params[param] ?? ""}
              onChange={(e) => handleParamChange(param, e.target.value)}
              placeholder={`Enter ${param}`}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Sample size */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-medium">Sample size (n)</label>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(e.target.value)}
          placeholder="Enter n"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Number of simulations */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-medium">Number of simulations</label>
        <input
          type="number"
          value={nSim}
          onChange={(e) => setNSim(e.target.value)}
          placeholder="Enter Nsim"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#5FBA9B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4da88a] transition w-full"
      >
        {loading ? "Simulating..." : "Run Simulation"}
      </button>
    </div>
  );
}
