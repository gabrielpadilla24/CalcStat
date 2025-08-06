import { useEffect, useRef } from "react";
import Desmos from "desmos";

const DerivativesGraph = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const desmosInstance = useRef<ReturnType<
    typeof Desmos.GraphingCalculator
  > | null>(null);

  useEffect(() => {
    if (calculatorRef.current && !desmosInstance.current) {
      desmosInstance.current = Desmos.GraphingCalculator(
        calculatorRef.current,
        {
          expressions: true,
          keypad: true,
          settingsMenu: false,
          expressionsTopbar: true,
          zoomButtons: true,
          border: false,
        }
      );
    }

    // Cleanup on unmount
    return () => {
      if (desmosInstance.current) {
        desmosInstance.current.destroy();
        desmosInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-xl mt-10 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🧮 Interactive Graphing Calculator
      </h2>
      <div
        ref={calculatorRef}
        className="w-full"
        style={{ minHeight: "500px" }}
      />
    </div>
  );
};

export default DerivativesGraph;
