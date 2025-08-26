import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import CompoundInterestCalculator from "./pages/FinancialCalculator/CompoundInterest/CompoundInterestCalculator";
import FinancialCalculator from "./pages/FinancialCalculator/FinancialCalculator";
import Menu from "./pages/Menu";
import ScrollToTop from "./components/ScrollToTop";
import MortgageCalculator from "./pages/FinancialCalculator/Mortgage/MortgageCalculator";
import RefinanceCalculator from "./pages/FinancialCalculator/Refinance/RefinanceCalculator";
import ReverseMortgageCalculator from "./pages/FinancialCalculator/ReverseMortgage/ReverseMortgageCalculator";
import NPVCalculator from "./pages/FinancialCalculator/NPV/NPVCalculator";
import IRRCalculator from "./pages/FinancialCalculator/IRR/IRRCalculator";
import SavingsCalculator from "./pages/FinancialCalculator/Savings/SavingsCalculator";
import GrowthComparisonCalculator from "./pages/FinancialCalculator/GrowthComparison/GrowthComparisonCalculator";
import CalculusLandingPage from "./pages/CalculusCalculator/CalculusCalculator";
import DerivativesCalculator from "./pages/CalculusCalculator/DifferentialCalculus/Derivatives/DerivativesCalculator";
import CriticalPointsCalculator from "./pages/CalculusCalculator/DifferentialCalculus/CriticalPoints/CriticalPointsCalculator";
import TangentLineCalculator from "./pages/CalculusCalculator/DifferentialCalculus/TangentLine/TangentLineCalculator";
import InflectionPointsCalculator from "./pages/CalculusCalculator/DifferentialCalculus/InflectionPoints/InflectionPointsCalculator";
import ImplicitDiffCalculator from "./pages/CalculusCalculator/DifferentialCalculus/ImplicitDifferentiation/ImplicitDiffCalculator";
import LimitsCalculator from "./pages/CalculusCalculator/DifferentialCalculus/Limits/LimitsCalculator";
import LinearAlgebraCalculator from "./pages/LinearAlgebra/LinearAlgebraCalculator";
import DeterminantCalculator from "./pages/LinearAlgebra/Determinant/DeterminantCalculator";
import InverseCalculator from "./pages/LinearAlgebra/Inverse/InverseCalculator";
import EqSystemCalculator from "./pages/LinearAlgebra/EqSystem/EqSystemCalculator";
import EigenCalculator from "./pages/LinearAlgebra/Eigen/EigenCalculator";
import SVDCalculator from "./pages/LinearAlgebra/SVD/SVDCalculator";
import GramSchmidtCalculator from "./pages/LinearAlgebra/GramSchmidt/GramSchmidtCalculator";
import ProbabilityAndStatsCalculator from "./pages/ProbabilityAndStats/ProbabilityandStatsCalculator";
import BinomialCalculator from "./pages/ProbabilityAndStats/Binomial/BinomialCalculator";

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/compoundinterest"
          element={<CompoundInterestCalculator />}
        />
        <Route path="/mortgage" element={<MortgageCalculator />} />
        <Route
          path="/mortgage/fixed"
          element={<MortgageCalculator loanType="Fixed Rate" />}
        />
        <Route
          path="/mortgage/arm"
          element={<MortgageCalculator loanType="ARM" />}
        />
        <Route
          path="/mortgage/interest-only"
          element={<MortgageCalculator loanType="Interest Only" />}
        />
        <Route
          path="/mortgage/balloon"
          element={<MortgageCalculator loanType="Balloon Payments" />}
        />

        <Route path="/mortgage/refinance" element={<RefinanceCalculator />} />

        <Route
          path="/mortgage/reversemortgage"
          element={<ReverseMortgageCalculator />}
        />

        <Route path="/financial/npv" element={<NPVCalculator />} />
        <Route path="/financial/irr" element={<IRRCalculator />} />

        <Route path="/financial/savings" element={<SavingsCalculator />} />

        <Route
          path="/financial/comparison"
          element={<GrowthComparisonCalculator />}
        />

        <Route path="/financial" element={<FinancialCalculator />} />

        {/*Calculus Calculators */}
        <Route path="/calculus" element={<CalculusLandingPage />} />

        {/* Differential Calculus */}
        <Route
          path="/calculus/derivatives"
          element={<DerivativesCalculator />}
        />

        <Route
          path="/calculus/criticalpoints"
          element={<CriticalPointsCalculator />}
        />

        <Route
          path="/calculus/tangentline"
          element={<TangentLineCalculator />}
        />

        <Route
          path="/calculus/inflectionpoints"
          element={<InflectionPointsCalculator />}
        />

        <Route
          path="/calculus/implicitdiff"
          element={<ImplicitDiffCalculator />}
        />

        <Route path="/calculus/limits" element={<LimitsCalculator />} />

        {/*LINEAR ALGEBRA */}
        <Route path="/linearalgebra" element={<LinearAlgebraCalculator />} />

        <Route
          path="/linearalgebra/determinant"
          element={<DeterminantCalculator />}
        />

        <Route path="/linearalgebra/inverse" element={<InverseCalculator />} />

        <Route
          path="/linearalgebra/eqsystem"
          element={<EqSystemCalculator />}
        />

        <Route path="/linearalgebra/eigen" element={<EigenCalculator />} />

        <Route path="/linearalgebra/svd" element={<SVDCalculator />} />

        <Route
          path="/linearalgebra/gramschmidt"
          element={<GramSchmidtCalculator />}
        />

        {/* Cards (all Probability and Stats calculators) */}

        <Route
          path="/probabilityandstats"
          element={<ProbabilityAndStatsCalculator />}
        />

        <Route
          path="/probabilityandstats/binomialdistribution"
          element={<BinomialCalculator />}
        />

        {/* Other routes can be added here */}
        <Route path="/calculators" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
