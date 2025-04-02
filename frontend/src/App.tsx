// import { useState } from "react";
// import ExponentialForm from "./pages/ExponentialCalculator/components/ExponentialForm";
// import ExponentialGraph from "./pages/ExponentialCalculator/components/ExponentialGraph";

// function App() {
//   const [valoresPorAño, setValoresPorAño] = useState<number[]>([]);
//   const [aportesPorAño, setAportesPorAño] = useState<number[]>([]);

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <h1 className="text-4xl font-bold text-center mb-12">
//         Exponential Growth Calculator
//       </h1>

//       <div className="flex justify-center items-start gap-10">
//         <div>
//           <ExponentialForm
//             setValoresPorAño={setValoresPorAño}
//             setAportesPorAño={setAportesPorAño}
//           />
//         </div>
//         <div>
//           <ExponentialGraph valores={valoresPorAño} aportes={aportesPorAño} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

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
