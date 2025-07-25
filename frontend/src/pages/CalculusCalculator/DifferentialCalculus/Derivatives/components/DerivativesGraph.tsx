import React, { useEffect, useRef } from "react";
import Desmos from "desmos";

interface DerivativesGraphProps {
  original: string;
  derivative: string;
}

const DerivativesGraph: React.FC<DerivativesGraphProps> = ({
  original,
  derivative,
}) => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const desmosCalculatorRef = useRef<ReturnType<
    typeof Desmos.GraphingCalculator
  > | null>(null);

  useEffect(() => {
    if (calculatorRef.current) {
      desmosCalculatorRef.current = Desmos.GraphingCalculator(
        calculatorRef.current,
        {
          expressions: true,
          keypad: false,
          settingsMenu: false,
          expressionsTopbar: false,
          zoomButtons: false,
          border: false,
        }
      );

      desmosCalculatorRef.current.setExpressions([
        {
          id: "original",
          latex: `f(x) = ${original}`,
          color: "#2d7ff9",
        },
        {
          id: "derivative",
          latex: `f'(x) = ${derivative}`,
          color: "#43b69a",
        },
      ]);
    }

    return () => {
      desmosCalculatorRef.current?.destroy();
    };
  }, [original, derivative]);

  return <div className="w-full h-[500px] rounded-xl" ref={calculatorRef} />;
};

export default DerivativesGraph;
