const IRRInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 text-gray-800 w-full max-w-5xl mx-auto mt-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 text-center">
        📈 Understanding the Internal Rate of Return (IRR)
      </h2>

      <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
        <p>
          💡 <strong>IRR</strong> (Internal Rate of Return) is the discount rate
          that makes the <strong>Net Present Value (NPV)</strong> of all future
          cash flows equal to zero.
        </p>

        <p>
          📊 It’s a powerful tool used in finance to evaluate the profitability
          of an investment or project. If the IRR is higher than your required
          return or cost of capital, the project is considered a good
          investment.
        </p>

        <p>
          🔍 In simple terms, IRR helps answer:{" "}
          <em>
            “What’s the actual return this project is giving me per year?”
          </em>
        </p>

        <p>
          🧮 Internally, the calculator tests multiple discount rates until it
          finds the one where inflows and outflows balance perfectly — that’s
          your IRR!
        </p>

        <p className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-3 sm:p-4">
          ✅ <strong>Example:</strong> If a project has an IRR of{" "}
          <strong>12%</strong>, it means it's expected to generate an annual
          return of 12% over its lifetime.
        </p>

        <div>
          <p className="font-semibold">⚠️ Important Notes:</p>
          <ul className="list-disc ml-4 sm:ml-6 space-y-1">
            <li>
              IRR assumes all interim cash flows are reinvested at the IRR
              itself, which may not always be realistic.
            </li>
            <li>
              A project can have multiple IRRs if cash flows change signs more
              than once (non-conventional cash flows).
            </li>
            <li>
              IRR is best used alongside other metrics like NPV, Payback Period,
              or ROI.
            </li>
          </ul>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-gray-500 italic text-center">
          This explanation is for educational purposes only and should not be
          considered financial advice.
        </p>
      </div>
    </div>
  );
};

export default IRRInfo;
