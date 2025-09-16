"use client";

export default function MartingaleInfo() {
  return (
    <div
      id="martingale-info"
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">ℹ️ About Martingales</h2>

      <p className="mb-4 text-gray-700">
        A <strong>martingale</strong> is a stochastic process{" "}
        <code>{`{X_t}`}</code> that satisfies:
      </p>

      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        E[Xₜ₊₁ | 𝔽ₜ] = Xₜ
      </p>

      <p className="mb-4 text-gray-700">
        Intuitively, the conditional expectation of the process at the next time
        step, given all past information, is equal to its current value. This
        means the process has no "drift" or predictable trend — it is a "fair
        game".
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">⚡ Testing Approaches</h3>

      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          <strong>Monte Carlo Simulation:</strong> Simulates multiple
          trajectories of the process. If the empirical mean of Xₜ stays close
          to its initial value X₀, the process behaves like a martingale.
        </li>
        <li>
          <strong>Analytical (Itô’s Lemma):</strong> Expands the process{" "}
          <code>f(t, Wₜ)</code> using Itô’s Lemma. If the drift term vanishes
          (i.e., equals 0), the process is a martingale.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">🎛 Inputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          <strong>Process f(t, W)</strong> → function of time <code>t</code> and
          Brownian motion <code>Wₜ</code>.
        </li>
        <li>
          <strong>Mode</strong> → choose between <em>Monte Carlo</em> or{" "}
          <em>Analytical</em>.
        </li>
        {/** Only show simulation params for Monte Carlo */}
        <li>
          <strong>T</strong> → time horizon (only for Monte Carlo)
        </li>
        <li>
          <strong>N</strong> → number of time steps (only for Monte Carlo)
        </li>
        <li>
          <strong>M</strong> → number of trajectories (only for Monte Carlo)
        </li>
        <li>
          <strong>W₀</strong> → initial Brownian motion value (default 0, Monte
          Carlo only)
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">📊 Outputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          <strong>Monte Carlo:</strong> simulated trajectories of Xₜ, empirical
          mean over time, and verdict (martingale or not).
        </li>
        <li>
          <strong>Analytical:</strong> partial derivatives, drift and diffusion
          terms from Itô’s Lemma, and final expansion showing whether the drift
          vanishes.
        </li>
        <li>Final verdict: martingale ✅ or not ❌, with reasoning.</li>
      </ul>
    </div>
  );
}
