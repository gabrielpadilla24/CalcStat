"use client";

import { useEffect, useRef, useState } from "react";

/** === Tipos mínimos (idénticos a los tuyos) === */
export type DesmosExpression = { id: string; latex?: string };
export type DesmosOptions = {
  expressions?: boolean;
  expressionsCollapsed?: boolean; // 👈 panel colapsado «»
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

/** Declaración global SOLO aquí (no la dupliques en otros archivos) */
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

/** Props del componente genérico */
type DesmosGraphProps = {
  /** Una o varias expresiones para graficar */
  expressions: DesmosExpression | DesmosExpression[];
  /** Altura del canvas (px) */
  height?: number;
  /** Opciones UI (opcional) */
  ui?: DesmosOptions;
  /** Título opcional (si quieres que el wrapper lo muestre) */
  title?: string;
};

export default function DesmosGraph({
  expressions,
  height = 500,
  ui,
  title,
}: DesmosGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<DesmosCalculator | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Marca listo cuando el script ya está en window
  useEffect(() => {
    if (typeof window !== "undefined" && window.Desmos) setIsReady(true);
  }, []);

  // Inicializa Desmos una vez
  useEffect(() => {
    if (!isReady || !containerRef.current || calculatorRef.current) return;

    calculatorRef.current = window.Desmos!.GraphingCalculator(
      containerRef.current,
      {
        expressions: true,
        expressionsCollapsed: true,
        keypad: false,
        settingsMenu: false,
        zoomButtons: true,
        expressionsTopbar: true,
        border: false,
        ...ui,
      }
    );

    return () => {
      try {
        calculatorRef.current?.destroy();
      } finally {
        calculatorRef.current = null;
      }
    };
  }, [isReady, ui]);

  // Aplica/actualiza expresiones
  useEffect(() => {
    const calc = calculatorRef.current;
    if (!calc || !isReady) return;

    const list = Array.isArray(expressions) ? expressions : [expressions];

    list.forEach((e) => {
      const latex = e.latex?.trim();
      if (latex) {
        calc.setExpression({ id: e.id, latex });
      } else {
        try {
          calc.removeExpression({ id: e.id });
        } catch {
          return; // evita eslint(no-empty) y no-unused-vars
        }
      }
    });
  }, [expressions, isReady]);

  // Resize cuando cambie el tamaño del contenedor
  useEffect(() => {
    if (!calculatorRef.current || !containerRef.current) return;
    const ro = new ResizeObserver(() => {
      try {
        calculatorRef.current?.resize();
      } catch {
        return;
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isReady]);

  return (
    <div className="w-full bg-white border border-gray-300 p-4 rounded-xl mt-6 shadow-md overflow-hidden">
      {title ? (
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      ) : null}
      <div ref={containerRef} className="w-full" style={{ height }} />
      {!isReady && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Cargando motor de gráficos…
        </p>
      )}
    </div>
  );
}
