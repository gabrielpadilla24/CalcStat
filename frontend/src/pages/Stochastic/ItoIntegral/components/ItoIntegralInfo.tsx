"use client";

export default function ItoIntegralInfo() {
  return (
    <div
      id="ito-info"
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">ℹ️ About Itô Integral</h2>

      <p className="mb-4 text-gray-700">
        The <strong>Itô integral</strong> is the fundamental building block of
        stochastic calculus. It allows integration with respect to a Wiener
        process <code>Wₜ</code> (Brownian motion), which is not possible using
        classical Riemann or Lebesgue integrals.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">📌 Definition</h3>
      <p className="mb-3 text-gray-700">
        For an adapted process <code>Xₜ</code>, the Itô integral is defined as:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        ∫₀ᵀ Xₜ dWₜ = limₙ→∞ Σ Xₜᵢ (Wₜᵢ₊₁ − Wₜᵢ)
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">⚡ Simulation</h3>
      <p className="mb-3 text-gray-700">
        In practice, the integral is approximated by discretizing time into N
        steps of size Δt = T / N, generating normal increments for W:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        ΔWᵢ ~ 𝒩(0, Δt), &nbsp;&nbsp; Iₜ₊Δₜ ≈ Iₜ + Xₜ · ΔWᵢ
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">🎛 Inputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          <strong>Integrand X(t, W)</strong> → function of t and/or W (e.g. "t",
          "sin(t)", "W", "t*W")
        </li>
        <li>
          <strong>T</strong> → time horizon
        </li>
        <li>
          <strong>N</strong> → number of time steps
        </li>
        <li>
          <strong>M</strong> → number of simulated trajectories
        </li>
        <li>
          <strong>W₀</strong> → initial value of the Brownian motion (default 0)
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">📊 Outputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Simulated trajectories of the Itô integral</li>
        <li>Distribution of the final value I(T)</li>
        <li>Empirical mean and variance (future enhancement)</li>
      </ul>
    </div>
  );
}
