import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import CompoundInterestCalculator from "./pages/CompoundInterest/CompoundInterestCalculator";
import FinancialCalculator from "./pages/FinancialCalculator/FinancialCalculator";
import Menu from "./pages/Menu";
import ScrollToTop from "./pages/CompoundInterest/components/ScrollToTop";

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
        <Route path="/financial" element={<FinancialCalculator />} />
        <Route path="/calculators" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
