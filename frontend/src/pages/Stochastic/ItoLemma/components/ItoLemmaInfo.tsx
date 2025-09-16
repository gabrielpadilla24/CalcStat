"use client";

export default function ItoLemmaInfo() {
  return (
    <div
      id="ito-lemma-info"
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">ℹ️ About Itô’s Lemma</h2>

      <p className="mb-4 text-gray-700">
        <strong>Itô’s Lemma</strong> is the cornerstone of stochastic calculus.
        It is the stochastic analogue of the chain rule from classical calculus,
        and is essential in mathematical finance for deriving models like the
        Black–Scholes equation.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">📌 Formula</h3>
      <p className="mb-3 text-gray-700">
        If <code>Xₜ</code> follows the SDE:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        dXₜ = μ(t, Xₜ) dt + σ(t, Xₜ) dWₜ
      </p>

      <p className="mb-3 text-gray-700">
        then for a twice–differentiable function <code>f(t, Xₜ)</code>, Itô’s
        Lemma gives:
      </p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        df(t, Xₜ) = fₜ dt + fₓ dXₜ + ½ fₓₓ (σ²) dt
      </p>
      <p className="mb-3 text-gray-700">Substituting dXₜ = μ dt + σ dWₜ:</p>
      <p className="bg-gray-50 border rounded p-2 text-center font-mono">
        df(t, Xₜ) = [ fₜ + μ fₓ + ½ σ² fₓₓ ] dt + [ σ fₓ ] dWₜ
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">🎛 Inputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          <strong>f(t, x)</strong> → function of t and x (e.g.{" "}
          <code>"t*x**2"</code>, <code>"exp(x)"</code>, <code>"log(x)"</code>)
        </li>
        <li>
          <strong>μ(t, x)</strong> → drift function of the process (e.g.{" "}
          <code>"0.05*x"</code>)
        </li>
        <li>
          <strong>σ(t, x)</strong> → volatility function of the process (e.g.{" "}
          <code>"0.2*x"</code>)
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">📊 Outputs</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Partial derivatives fₜ, fₓ, fₓₓ</li>
        <li>Drift term of df(t, Xₜ)</li>
        <li>Diffusion term of df(t, Xₜ)</li>
        <li>Final expression of Itô’s Lemma</li>
        <li>Step-by-step derivation (LaTeX)</li>
      </ul>
    </div>
  );
}
