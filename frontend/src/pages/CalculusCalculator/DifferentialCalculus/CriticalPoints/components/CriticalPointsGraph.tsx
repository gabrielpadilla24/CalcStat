// src/pages/calculus/components/CriticalPointsGraph.tsx
type Props = {
  expression: string;
  firstDerivative?: string;
  secondDerivative?: string;
  criticalPoints?: string[];
  inflectionPoints?: string[];
};

const CriticalPointsGraph: React.FC<Props> = ({
  expression,
  firstDerivative,
  secondDerivative,
  criticalPoints,
  inflectionPoints,
}) => {
  const hasInput = expression.trim().length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Graph</h2>

      {!hasInput ? (
        <p className="text-gray-600">
          Ingresa una función para ver el gráfico. (Coming soon…)
        </p>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Próximamente: render con Desmos, marcadores de críticos, puntos de
            inflexión y visual del intervalo.
          </p>

          {/* Placeholder del canvas/gráfico */}
          <div className="w-full h-64 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-500">
              Graph placeholder — {`f(x) = ${expression}`}
            </span>
          </div>

          {/* Info mínima opcional */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            {firstDerivative && (
              <div>
                <span className="font-semibold">f'(x): </span>
                <span className="break-all">{firstDerivative}</span>
              </div>
            )}
            {secondDerivative && (
              <div>
                <span className="font-semibold">f''(x): </span>
                <span className="break-all">{secondDerivative}</span>
              </div>
            )}
            {criticalPoints && criticalPoints.length > 0 && (
              <div>
                <span className="font-semibold">Critical points: </span>
                <span className="break-all">{criticalPoints.join(", ")}</span>
              </div>
            )}
            {inflectionPoints && inflectionPoints.length > 0 && (
              <div>
                <span className="font-semibold">Inflection points: </span>
                <span className="break-all">{inflectionPoints.join(", ")}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CriticalPointsGraph;
