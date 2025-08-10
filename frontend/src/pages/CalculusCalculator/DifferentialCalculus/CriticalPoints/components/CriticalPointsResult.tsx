// src/pages/calculus/components/CriticalPointsResult.tsx
type AbsoluteExtrema = {
  max: string | null;
  min: string | null;
};

type Props = {
  original: string;
  firstDerivative: string;
  secondDerivative: string;
  criticalPoints: string[];
  inflectionPoints: string[];
  classification: string; // resultado de la prueba de segunda derivada (texto)
  absoluteExtrema: AbsoluteExtrema;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold text-gray-800 mb-2">{children}</h3>
);

const Line = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex gap-2 text-gray-700">
    <span className="font-medium">{label}</span>
    <span className="break-all">{value?.trim() ? value : "—"}</span>
  </div>
);

const List = ({ items }: { items: string[] }) => {
  if (!items || items.length === 0) return <p className="text-gray-600">—</p>;
  return (
    <ul className="list-disc list-inside text-gray-700">
      {items.map((it, i) => (
        <li key={`${it}-${i}`} className="break-all">
          {it}
        </li>
      ))}
    </ul>
  );
};

const CriticalPointsResult: React.FC<Props> = ({
  original,
  firstDerivative,
  secondDerivative,
  criticalPoints,
  inflectionPoints,
  classification,
  absoluteExtrema,
}) => {
  const hasData = original.trim().length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Results</h2>

      {!hasData ? (
        <p className="text-gray-600">
          Ingresa una función y presiona “Find Critical Points”. (Coming soon…)
        </p>
      ) : (
        <div className="space-y-5">
          {/* Resumen función y derivadas */}
          <div className="space-y-2">
            <SectionTitle>Function & Derivatives</SectionTitle>
            <Line label="f(x):" value={original} />
            <Line label="f'(x):" value={firstDerivative} />
            <Line label="f''(x):" value={secondDerivative} />
          </div>

          {/* Puntos críticos */}
          <div>
            <SectionTitle>Critical Points</SectionTitle>
            <List items={criticalPoints} />
          </div>

          {/* Puntos de inflexión */}
          <div>
            <SectionTitle>Inflection Points</SectionTitle>
            <List items={inflectionPoints} />
          </div>

          {/* Clasificación por segunda derivada */}
          <div>
            <SectionTitle>Second Derivative Test</SectionTitle>
            <p className="text-gray-700">
              {classification?.trim() ? classification : "—"}
            </p>
          </div>

          {/* Extremos absolutos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <SectionTitle>Absolute Max</SectionTitle>
              <p className="text-gray-700">{absoluteExtrema?.max ?? "—"}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <SectionTitle>Absolute Min</SectionTitle>
              <p className="text-gray-700">{absoluteExtrema?.min ?? "—"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriticalPointsResult;
