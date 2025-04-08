import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import CompoundInterestCalculator from "./pages/FinancialCalculator/CompoundInterest/CompoundInterestCalculator";
import FinancialCalculator from "./pages/FinancialCalculator/FinancialCalculator";
import Menu from "./pages/Menu";
import ScrollToTop from "./components/ScrollToTop";
import MortgageCalculator from "./pages/FinancialCalculator/Mortgage/MortgageCalculator";
import RefinanceCalculator from "./pages/FinancialCalculator/Refinance/RefinanceCalculator";

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

        <Route path="/financial" element={<FinancialCalculator />} />
        <Route path="/calculators" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
