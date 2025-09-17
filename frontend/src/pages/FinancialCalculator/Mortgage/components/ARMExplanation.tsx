interface ARMExplanationProps {
  fixedYearsMessage?: string;
}

const ARMExplanation: React.FC<ARMExplanationProps> = ({
  fixedYearsMessage,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-[1200px] mx-auto border border-gray-200 mt-8 mb-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-2 mb-6 text-gray-900">
        🏡 Adjustable Rate Mortgage (ARM) Explained
      </h1>

      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
        ⚙️ How It Works
      </h2>
      <p className="mb-4 text-gray-700 text-sm sm:text-base">
        ARMs typically offer a lower starting interest rate compared to Fixed
        Rate Mortgages. However, the rate adjusts periodically after an initial
        fixed period.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
        📊 Example: 5/6 ARM
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-4 text-sm sm:text-base">
        <li>
          <strong>5️⃣</strong> — Fixed interest rate for the first 5 years.
        </li>
        <li>
          <strong>6️⃣</strong> — After that, it adjusts every 6 months.
        </li>
      </ul>

      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
        📝 Common ARM Types
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-4 text-sm sm:text-base">
        <li>
          <strong>5/1 ARM</strong>: Fixed for 5 years, adjusts every year.
        </li>
        <li>
          <strong>7/1 ARM</strong>: Fixed for 7 years, adjusts every year.
        </li>
        <li>
          <strong>10/1 ARM</strong>: Fixed for 10 years, adjusts every year.
        </li>
      </ul>

      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
        📈 Rate Adjustments
      </h2>
      <p className="text-gray-700 mb-2 text-sm sm:text-base">
        The adjustable rate is based on a financial index (like SOFR or LIBOR)
        and can:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4 text-sm sm:text-base">
        <li>⬆️ Increase your monthly payment if interest rates go up.</li>
        <li>⬇️ Lower your payment if rates go down.</li>
      </ul>

      {fixedYearsMessage && (
        <p className="text-blue-700 font-medium mt-6 text-center text-sm sm:text-base">
          📌 <strong>{fixedYearsMessage}</strong>
        </p>
      )}
    </div>
  );
};

export default ARMExplanation;
