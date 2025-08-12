import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";
addStyles();

type Props = {
  x0: string;
  onX0Change: (v: string) => void;
  provideY0: boolean;
  onProvideY0Change: (v: boolean) => void;
  y0: string;
  onY0Change: (v: string) => void;
  className?: string;
};

const norm = (v: string) => v.replace(",", ".").trim();

const PointOfTangencyInput: React.FC<Props> = ({
  x0,
  onX0Change,
  provideY0,
  onProvideY0Change,
  y0,
  onY0Change,
  className = "",
}) => {
  return (
    <div
      className={`w-[600px] mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-3">Point of Tangency</h3>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="font-medium">x₀:</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. 1.5"
            value={x0}
            onChange={(e) => onX0Change(e.target.value)}
            className="w-32 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={provideY0}
            onChange={(e) => onProvideY0Change(e.target.checked)}
          />
          <span>Also provide y₀</span>
        </label>

        {provideY0 && (
          <label className="flex items-center gap-2">
            <span className="font-medium">y₀:</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="optional"
              value={y0}
              onChange={(e) => onY0Change(e.target.value)}
              className="w-32 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>
        )}
      </div>

      <div className="text-sm text-gray-600 mt-3">
        Preview:&nbsp;
        <StaticMathField>
          {provideY0
            ? `\\left(${norm(x0) || "x_0"},\\;${norm(y0) || "y_0"}\\right)`
            : `\\left(${norm(x0) || "x_0"},\\;f(${norm(x0) || "x_0"})\\right)`}
        </StaticMathField>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Tip: If you don’t provide y₀, it will be computed as f(x₀).
      </p>
    </div>
  );
};

export default PointOfTangencyInput;
