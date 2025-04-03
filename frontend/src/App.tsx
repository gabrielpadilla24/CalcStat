import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ExponentialCalculator from "./pages/ExponentialCalculator/ExponentialCalculator";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculadora" element={<ExponentialCalculator />} />
      </Routes>
    </Router>
  );
};

export default App;
