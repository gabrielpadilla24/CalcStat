import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ExponentialCalculator from "./pages/CompoundInterest/ExponentialCalculator";
import FinancialCalculator from "./pages/FinancialCalculator/FinancialCalculator";
import Menu from "./pages/Menu";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/compoundinterest" element={<ExponentialCalculator />} />
        <Route path="/financial" element={<FinancialCalculator />} />
        <Route path="/calculators" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
