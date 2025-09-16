"use client";

export default function QVInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">
        What is Quadratic Variation?
      </h2>

      <p className="text-gray-700 leading-relaxed">
        Quadratic variation is a key concept in stochastic calculus that
        measures the accumulated variance of a stochastic process over time. For
        a process
        <strong> Xₜ </strong>, the quadratic variation up to time t is denoted
        by <code>[X]ₜ</code>. Intuitively, it captures the “roughness” or
        volatility of the path.
      </p>

      <h3 className="text-lg font-semibold mt-4">Brownian Motion</h3>
      <p className="text-gray-700 leading-relaxed">
        A standard Brownian motion has quadratic variation
        <code>[W]ₜ = t</code>. This property is fundamental: it tells us that
        Brownian paths are highly irregular, with variance growing linearly in
        time. This is why stochastic integrals are defined using quadratic
        variation instead of classical calculus.
      </p>

      <h3 className="text-lg font-semibold mt-4">General Itô Processes</h3>
      <p className="text-gray-700 leading-relaxed">
        For an Itô process of the form
        <code>dXₜ = μ(t, Xₜ) dt + σ(t, Xₜ) dWₜ</code>, the quadratic variation
        is given by:
      </p>
      <p className="text-gray-700 italic">[X]ₜ = ∫₀ᵗ σ²(s, Xₛ) ds</p>
      <p className="text-gray-700 leading-relaxed">
        This means that only the diffusion term (σ) contributes to the quadratic
        variation — the drift μ does not affect it.
      </p>

      <h3 className="text-lg font-semibold mt-4">Why is it Useful?</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>
          It is the foundation of <strong>Itô’s Lemma</strong>, which requires
          quadratic variation to compute stochastic differentials.
        </li>
        <li>
          In finance, quadratic variation measures the{" "}
          <strong>realized volatility</strong> of asset prices.
        </li>
        <li>
          It distinguishes stochastic processes from deterministic ones (where
          quadratic variation is zero).
        </li>
      </ul>

      <p className="text-gray-700 leading-relaxed mt-4">
        In summary, quadratic variation is what makes stochastic calculus
        different from classical calculus. It reflects how randomness
        accumulates in a process and plays a central role in both theory and
        applications.
      </p>
    </div>
  );
}
