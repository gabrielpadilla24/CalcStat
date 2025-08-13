// types/desmos.d.ts
// Asegúrate de que "typeRoots" incluye "./types" en tu tsconfig si lo usas.
// Con tsconfig estándar de Next, basta con que el archivo esté dentro del repo.

export {};

declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: (
        element: HTMLElement,
        options?: DesmosConstructorOptions
      ) => DesmosCalculator;
    };
  }
}

export type DesmosConstructorOptions = {
  expressions?: boolean;
  expressionsCollapsed?: boolean;
  keypad?: boolean;
  settingsMenu?: boolean;
  zoomButtons?: boolean;
  expressionsTopbar?: boolean;
  border?: boolean;
};

export type DesmosExpressionPayload = {
  id: string;
  latex: string;
  color?: string;
  hidden?: boolean;
  label?: string;
  showLabel?: boolean;
};

export interface DesmosCalculator {
  setExpression: (expr: DesmosExpressionPayload) => void;
  removeExpression: (expr: { id: string }) => void;
  resize: () => void;
  destroy: () => void;
  updateSettings?: (opts: Partial<DesmosConstructorOptions>) => void;

  // Algunas builds exponen esto; lo dejamos opcional para evitar ts(2741)
  setMathBounds?: (b: {
    left: number;
    right: number;
    bottom: number;
    top: number;
  }) => void;
}
