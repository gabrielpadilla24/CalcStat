"use client";

export default function SDEInfo() {
  return (
    <div
      id="sde-info"
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">ℹ️ About SDE Solver</h2>

      <p className="mb-4 text-gray-700">
        A <strong>Stochastic Differential Equation (SDE)</strong> models a
        system where randomness is involved in its evolution over time. The most
        common form is:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        dXₜ = μ(t, Xₜ) dt + σ(t, Xₜ) dWₜ
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">
        📌 Euler–Maruyama Method
      </h3>
      <p className="mb-3 text-gray-700">
        Since exact solutions are often unavailable, we approximate SDEs using
        the <strong>Euler–Maruyama scheme</strong>. With time discretized into
        steps of size Δt = T / N:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        Xₙ₊₁ = Xₙ + μ(tₙ, Xₙ) Δt + σ(tₙ, Xₙ) ΔWₙ
      </p>
      <p className="text-gray-700 mb-4">
        where ΔWₙ ~ 𝒩(0, Δt) are normally distributed Brownian increments.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">🎛 Inputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          <strong>X₀</strong> → initial value of the process
        </li>
        <li>
          <strong>μ(t, x)</strong> → drift function (deterministic part)
        </li>
        <li>
          <strong>σ(t, x)</strong> → volatility function (random part)
        </li>
        <li>
          <strong>T</strong> → time horizon
        </li>
        <li>
          <strong>N</strong> → number of discretization steps
        </li>
        <li>
          <strong>M</strong> → number of simulated trajectories
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">📊 Outputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Simulated trajectories of the SDE</li>
        <li>Evolution of Xₜ over time under randomness</li>
        <li>Future extensions: statistics of Xₜ (mean, variance)</li>
      </ul>
    </div>
  );
}
