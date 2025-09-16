"use client";

export default function BrownianInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">ℹ️ About Brownian Motion</h2>

      <p className="mb-4 text-gray-700">
        The <strong>Brownian Motion Simulator</strong> generates trajectories of
        a<em> Wiener process </em> (standard Brownian motion) and its
        generalized form with drift and volatility.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">📌 Definition</h3>
      <p className="mb-3 text-gray-700">
        A Wiener process <code>Wₜ</code> is a stochastic process with:
      </p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          <code>W₀ = 0</code>
        </li>
        <li>Independent increments</li>
        <li>
          Stationary increments: <code>Wₜ − Wₛ ~ N(0, t − s)</code>
        </li>
        <li>Continuous sample paths</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">
        ⚡ With Drift and Volatility
      </h3>
      <p className="mb-3 text-gray-700">
        The generalized Brownian motion is given by:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        Xₜ = X₀ + μ·t + σ·Wₜ
      </p>
      <p className="mt-2 text-gray-700">
        - <code>μ</code> is the drift (average trend). <br />- <code>σ</code> is
        the volatility (random variability).
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">🔢 Simulation</h3>
      <p className="mb-3 text-gray-700">
        The process is simulated by discretizing time into <code>N</code> steps
        of size
        <code> Δt = T / N</code>, and using:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        Xₜ₊Δₜ = Xₜ + μΔt + σ√Δt · Z, &nbsp; Z ~ N(0,1)
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">🎛 Inputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          <strong>X₀</strong> → Initial value
        </li>
        <li>
          <strong>μ</strong> → Drift (trend)
        </li>
        <li>
          <strong>σ</strong> → Volatility
        </li>
        <li>
          <strong>T</strong> → Time horizon
        </li>
        <li>
          <strong>N</strong> → Number of steps
        </li>
        <li>
          <strong>M</strong> → Number of simulated trajectories
        </li>
      </ul>
    </div>
  );
}
