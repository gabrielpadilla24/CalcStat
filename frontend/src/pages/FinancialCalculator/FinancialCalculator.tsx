import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";

const FinancialCalculator = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {/* Header Section */}
      <div className="flex flex-col items-center text-center px-4 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Financial Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Plan smarter. Whether you're calculating interest, loans, or
          investments — our financial tools help you stay ahead.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center gap-4 flex-wrap mb-20 px-4">
        <button className="bg-[#5FBA9B] text-white px-5 py-2 rounded-lg hover:bg-[#4ea487] transition">
          All Financial
        </button>
        <button className="bg-white text-[#5FBA9B] border border-[#5FBA9B] px-5 py-2 rounded-lg hover:bg-[#e0f7f1] transition">
          Compound
        </button>
        <button className="bg-white text-[#5FBA9B] border border-[#5FBA9B] px-5 py-2 rounded-lg hover:bg-[#e0f7f1] transition">
          Loan
        </button>
        <button className="bg-white text-[#5FBA9B] border border-[#5FBA9B] px-5 py-2 rounded-lg hover:bg-[#e0f7f1] transition">
          Investment
        </button>
        <button className="bg-white text-[#5FBA9B] border border-[#5FBA9B] px-5 py-2 rounded-lg hover:bg-[#e0f7f1] transition">
          Savings
        </button>
      </div>

      {/* Call to Action */}
      <div className="bg-[#4A9A80] py-16 text-center px-4">
        <h2 className="text-white text-3xl font-semibold mb-4">
          Ready to Explore More?
        </h2>
        <Link to="/calculators">
          <button className="bg-white text-[#4A9A80] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            Browse All Calculators
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FinancialCalculator;
