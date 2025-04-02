import { useState } from "react";
import ExponentialForm from "./components/ExponentialForm";
import ExponentialGraph from "./components/ExponentialGraph";

const ExponentialCalculator = () => {
  const [valoresPorAño, setValoresPorAño] = useState<number[]>([]);
  const [aportesPorAño, setAportesPorAño] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        Exponential Growth Calculator
      </h1>

      <div className="flex justify-center items-start gap-10">
        <div>
          <ExponentialForm
            setValoresPorAño={setValoresPorAño}
            setAportesPorAño={setAportesPorAño}
          />
        </div>
        <div>
          <ExponentialGraph valores={valoresPorAño} aportes={aportesPorAño} />
        </div>
      </div>
    </div>
  );
};

export default ExponentialCalculator;
