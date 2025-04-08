import { useRef, useState } from "react";
import ExponentialForm from "./components/ExponentialForm";
import ExponentialGraph from "./components/ExponentialGraph";
import ExponentialFormula from "./components/ExponentialFormula";
import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

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

  // 👉 Ref para hacer scroll a la fórmula
  const formulaRef = useRef<HTMLDivElement>(null);

  const scrollToFormula = () => {
    formulaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavBar />
      {/* 🔽 Contenedor principal */}

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Compound Interest Calculator
        </h1>

        <div className="flex justify-center items-start gap-10">
          <div>
            <ExponentialForm
              setValoresPorAño={setValoresPorAño}
              setAportesPorAño={setAportesPorAño}
              setFormulaData={setFormulaData}
              setMostrarFormulaConValores={setMostrarFormulaConValores}
              scrollToFormula={scrollToFormula} // ✅ PASAMOS scrollToFormula
            />
          </div>
          <div>
            <ExponentialGraph valores={valoresPorAño} aportes={aportesPorAño} />
          </div>
        </div>

        {/* 🔽 Fórmula con scroll-to-ref */}
        <div ref={formulaRef}>
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
      <BottomCTA buttonText="Browse Financial" href="/financial" />
    </>
  );
};

export default ExponentialCalculator;
