const ExponentialFormula = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8 max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        📘 Formula Used
      </h2>

      <p className="mb-2 text-gray-700">
        This calculator uses the formula for exponential growth with periodic
        contributions:
      </p>

      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
        FV = P * (1 + r)<sup>t</sup> + [C * ((1 + r/n)<sup>nt</sup> - 1)] /
        (r/n)
      </pre>

      <p className="text-gray-600 text-sm mb-1">
        <strong>Where:</strong>
      </p>
      <ul className="list-disc list-inside text-gray-600 text-sm">
        <li>
          <strong>FV</strong>: Final value
        </li>
        <li>
          <strong>P</strong>: Initial amount
        </li>
        <li>
          <strong>r</strong>: Annual interest rate (as a decimal)
        </li>
        <li>
          <strong>t</strong>: Time in years
        </li>
        <li>
          <strong>C</strong>: Contribution amount per period
        </li>
        <li>
          <strong>n</strong>: Number of compounding periods per year
        </li>
      </ul>
    </div>
  );
};

export default ExponentialFormula;
