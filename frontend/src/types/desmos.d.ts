declare module "desmos" {
  interface CalculatorOptions {
    expressions?: boolean;
    expressionsTopbar?: boolean;
    expressionsCollapsed?: boolean;
    settingsMenu?: boolean;
    zoomButtons?: boolean;
    lockViewport?: boolean;
    border?: boolean;
    keypad?: boolean;
    graphpaper?: boolean;
  }

  interface Expression {
    id?: string;
    latex: string;
    color?: string;
    hidden?: boolean;
  }

  interface GraphingCalculator {
    setExpression(expression: Expression): void;
    setExpressions(expressions: Expression[]): void;
    removeExpression(expression: { id: string }): void;
    getExpressions(): Expression[];
    updateSettings(settings: Partial<CalculatorOptions>): void;
    resize(): void;
    destroy(): void;
  }

  interface DesmosStatic {
    GraphingCalculator: (element: HTMLElement, options?: CalculatorOptions) => GraphingCalculator;
  }

  const Desmos: DesmosStatic;
  export default Desmos;
}
