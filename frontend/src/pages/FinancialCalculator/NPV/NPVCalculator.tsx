import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const NPVCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Net Present Value Calculator
        </h1>
      </div>

      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default NPVCalculator;
