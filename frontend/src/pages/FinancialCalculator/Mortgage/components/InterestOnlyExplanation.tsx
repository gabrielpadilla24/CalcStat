const InterestOnlyExplanation: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-[1200px] mx-auto border border-gray-200 mt-12 mb-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
        💰 Interest-Only Mortgage Explained
      </h1>

      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
        🧠 How It Works
      </h2>
      <p className="mb-4 text-gray-700 text-sm sm:text-base">
        An <strong>Interest-Only Mortgage</strong> allows you to pay only the
        interest on the loan for an initial period, usually a few years. 🟢
        During this time, your monthly payments are lower because you're not
        paying down the principal.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
        💸 Two Phases
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-4 text-sm sm:text-base">
        <li>
          <strong>📉 Interest-Only Period:</strong> You only pay interest, so
          payments are lower, but the loan balance doesn’t decrease.
        </li>
        <li>
          <strong>📈 Afterward:</strong> You start paying both principal and
          interest. Payments are higher than before.
        </li>
      </ul>

      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
        📘 Our Assumption
      </h2>
      <p className="mb-4 text-gray-700 text-sm sm:text-base">
        In our model, once the interest-only period ends, the remaining balance
        becomes a 🧱 <strong>Fixed Rate Mortgage</strong> over the rest of the
        term. This helps us simulate a realistic amortization schedule.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
        🔄 Alternatives
      </h2>
      <p className="text-gray-700 mb-2 text-sm sm:text-base">
        In real life, the loan could transition to other types like:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4 text-sm sm:text-base">
        <li>🔁 Adjustable Rate Mortgage (ARM)</li>
        <li>🧮 Interest + Principal Balloon</li>
        <li>📊 Refinancing into a new loan</li>
      </ul>
    </div>
  );
};

export default InterestOnlyExplanation;
