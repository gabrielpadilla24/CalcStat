import { useState } from "react";
import ExponentialForm from "./components/ExponentialForm";
import ExponentialGraph from "./components/ExponentialGraph";
import ExponentialFormula from "./components/ExponentialFormula";

const ExponentialCalculator = () => {
  const [valoresPorAño, setValoresPorAño] = useState<number[]>([]);
  const [aportesPorAño, setAportesPorAño] = useState<number[]>([]);

  const [formulaData, setFormulaData] = useState({
    P: 0,
    r: 0,
    t: 0,
    C: 0,
    frequency: "Yearly",
  });

  const [mostrarFormulaConValores, setMostrarFormulaConValores] =
    useState(false);

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
            setFormulaData={setFormulaData}
            setMostrarFormulaConValores={setMostrarFormulaConValores}
          />
        </div>
        <div>
          <ExponentialGraph valores={valoresPorAño} aportes={aportesPorAño} />
        </div>
      </div>

      <div>
        <ExponentialFormula
          P={formulaData.P}
          r={formulaData.r}
          t={formulaData.t}
          C={formulaData.C}
          frequency={formulaData.frequency}
          showSubstituted={mostrarFormulaConValores}
        />
      </div>
    </div>
  );
};

export default ExponentialCalculator;
