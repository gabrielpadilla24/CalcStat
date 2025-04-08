const RefinanceEducation = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-xl mt-10 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        📚 Understanding Mortgage Refinancing
      </h2>

      <p className="mb-4">
        🏡 Refinancing your mortgage can be a powerful tool to lower your
        monthly payments, reduce total interest, or pay off your loan faster —
        but it's not always the right move. Each situation is unique!
      </p>

      <p className="mb-4">
        💸 It's essential to weigh the{" "}
        <span className="font-semibold">closing costs</span> against the
        potential savings. Sometimes, what looks cheaper monthly might cost more
        in the long run.
      </p>

      <p className="mb-4">
        ⏳ Consider your timeline — will you stay in the home long enough to
        break even? Will the new loan extend your debt for many more years?
      </p>

      <p className="mb-4">
        📊 Use tools like this calculator to explore scenarios, but remember:
        numbers are just part of the story.
      </p>

      <div className="bg-white border border-red-200 rounded-lg p-4 mt-6 text-sm text-red-700">
        ⚠️ <strong>This is not financial advice.</strong> This tool and content
        are for <span className="italic">educational purposes only</span>.
        Always consult with a licensed financial advisor or mortgage expert
        before making major decisions.
      </div>
    </div>
  );
};

export default RefinanceEducation;
