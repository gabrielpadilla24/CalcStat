"use client";

import { useEffect, useRef, useState } from "react";

// Tipos mínimos para evitar "any"
type DesmosExpression = { id: string; latex?: string };
type DesmosOptions = {
  expressions?: boolean;
  expressionsCollapsed?: boolean; // 👈 clave para mostrar solo los “»”
  keypad?: boolean;
  settingsMenu?: boolean;
  zoomButtons?: boolean;
  expressionsTopbar?: boolean;
  border?: boolean;
};
type DesmosCalculator = {
  setExpression: (expr: DesmosExpression) => void;
  removeExpression: (expr: { id: string }) => void;
  resize: () => void;
  destroy: () => void;
  updateSettings?: (opts: Partial<DesmosOptions>) => void;
};

declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: (
        element: HTMLElement,
        options?: DesmosOptions
      ) => DesmosCalculator;
    };
  }
}

type DerivativesGraphProps = {
  /** Ej: "x^2 + 2x + 1" o "y=x^2+2". Si viene sin "y=", el componente lo añade. */
  expression?: string;
  /** Opcional: LaTeX directo listo para Desmos, ej: "y = x^{2} + 2x + 1" */
  latex?: string;
};

const DerivativesGraph: React.FC<DerivativesGraphProps> = ({
  expression,
  latex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<DesmosCalculator | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Marca listo cuando el script ya está en window
  useEffect(() => {
    if (typeof window !== "undefined" && window.Desmos) setIsReady(true);
  }, []);

  // Inicializa Desmos una vez: panel habilitado pero colapsado
  useEffect(() => {
    if (!isReady || !containerRef.current || calculatorRef.current) return;

    calculatorRef.current = window.Desmos!.GraphingCalculator(
      containerRef.current,
      {
        expressions: true, // panel habilitado…
        expressionsCollapsed: true, // …pero colapsado por defecto (muestra «»)
        keypad: false,
        settingsMenu: false,
        zoomButtons: true,
        expressionsTopbar: true,
        border: false,
      }
    );

    return () => {
      calculatorRef.current?.destroy();
      calculatorRef.current = null;
    };
  }, [isReady]);

  // Actualiza la expresión principal
  useEffect(() => {
    const calc = calculatorRef.current;
    if (!calc || !isReady) return;

    const toPlot =
      (latex && latex.trim()) ||
      (expression && expression.trim()
        ? expression.trim().startsWith("y=")
          ? expression.trim()
          : `y=${expression.trim()}`
        : "");

    if (toPlot) {
      calc.setExpression({ id: "main", latex: toPlot });
    } else {
      calc.removeExpression({ id: "main" });
    }
  }, [expression, latex, isReady]);

  // Resize cuando cambie el tamaño del contenedor
  useEffect(() => {
    if (!calculatorRef.current || !containerRef.current) return;
    const ro = new ResizeObserver(() => {
      try {
        calculatorRef.current?.resize();
      } catch {
        /* noop */
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isReady]);

  return (
    <div className="w-full bg-white border border-gray-300 p-4 rounded-xl mt-6 shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🧮 Interactive Graphing Calculator
      </h2>
      <div ref={containerRef} className="w-full" style={{ height: 500 }} />
      {!isReady && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Cargando motor de gráficos…
        </p>
      )}
    </div>
  );
};

export default DerivativesGraph;
