const RefinanceEducation = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-300 p-4 sm:p-6 rounded-xl mt-8 text-gray-800 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        📚 Understanding Mortgage Refinancing
      </h2>

      <div className="space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          🏡 Refinancing your mortgage can be a powerful tool to lower your
          monthly payments, reduce total interest, or pay off your loan faster —
          but it's not always the right move. Each situation is unique!
        </p>

        <p>
          💸 It's essential to weigh the{" "}
          <span className="font-semibold">closing costs</span> against the
          potential savings. Sometimes, what looks cheaper monthly might cost
          more in the long run.
        </p>

        <p>
          ⏳ Consider your timeline — will you stay in the home long enough to
          break even? Will the new loan extend your debt for many more years?
        </p>

        <p>
          📊 Use tools like this calculator to explore scenarios, but remember:
          numbers are just part of the story.
        </p>
      </div>

      <div className="bg-white border border-red-200 rounded-lg p-3 sm:p-4 mt-6 text-xs sm:text-sm text-red-700">
        ⚠️ <strong>This is not financial advice.</strong> This tool and content
        are for <span className="italic">educational purposes only</span>.
        Always consult with a licensed financial advisor or mortgage expert
        before making major decisions.
      </div>
    </div>
  );
};

export default RefinanceEducation;
