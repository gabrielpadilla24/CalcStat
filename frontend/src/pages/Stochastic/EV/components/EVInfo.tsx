"use client";

export default function EVInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Expectation & Variance of Stochastic Processes
      </h2>

      <p>
        In stochastic processes, two fundamental quantities are the expectation
        and the variance of a process X(t).
      </p>

      <h3 className="text-lg font-semibold">Expectation E[X(t)]</h3>
      <p>
        The expectation describes the average value the process takes at time t.
        It provides insight into the drift or central tendency of the process.
      </p>
      <ul className="list-disc list-inside">
        <li>
          For Brownian motion W(t), the expectation is 0, showing no drift.
        </li>
        <li>
          For a shifted Brownian motion aW(t) + b, the expectation is b, which
          reflects the constant shift.
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Variance Var(X(t))</h3>
      <p>
        The variance measures the dispersion or uncertainty of the process at
        time t. A larger variance means the outcomes are more spread out.
      </p>
      <ul className="list-disc list-inside">
        <li>
          For Brownian motion, Var(W(t)) = t, meaning uncertainty grows linearly
          with time.
        </li>
        <li>
          For an exponential martingale, the variance grows as exp(sigma^2 t) −
          1, showing exponential increase.
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Why does this matter?</h3>
      <p>
        These quantities are essential in finance, physics, and engineering. In
        finance, they help quantify expected returns and risk. In physics, they
        describe random particle motion. In general, they provide the tools to
        understand how randomness evolves over time.
      </p>
    </div>
  );
}
