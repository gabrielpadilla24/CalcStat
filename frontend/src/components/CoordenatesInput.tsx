import React, { useState } from "react";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

export type CoordinatesValue = {
  x0?: number;
  y0?: number;
};

interface CoordinatesInputProps {
  label?: string;
  onChange: (coords: CoordinatesValue) => void;
  className?: string;
}

const CoordinatesInput: React.FC<CoordinatesInputProps> = ({
  label = "Point of Tangency",
  onChange,
  className = "",
}) => {
  const [x0, setX0] = useState("");
  const [provideY0, setProvideY0] = useState(false);
  const [y0, setY0] = useState("");

  const norm = (v: string) => v.replace(",", ".").trim();
  const parseNum = (v: string) => {
    const n = Number(norm(v));
    return Number.isFinite(n) ? n : undefined;
  };

  const handleX0Change = (val: string) => {
    setX0(val);
    onChange({ x0: parseNum(val), ...(provideY0 ? { y0: parseNum(y0) } : {}) });
  };

  const handleY0Change = (val: string) => {
    setY0(val);
    if (provideY0) {
      onChange({ x0: parseNum(x0), y0: parseNum(val) });
    }
  };

  const handleProvideY0 = (checked: boolean) => {
    setProvideY0(checked);
    if (!checked) {
      onChange({ x0: parseNum(x0) }); // quitamos y0
    } else {
      onChange({ x0: parseNum(x0), y0: parseNum(y0) });
    }
  };

  return (
    <div
      className={`w-[600px] mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-3">{label}</h3>

      <div className="flex flex-col gap-3">
        {/* x₀ */}
        <label className="flex items-center gap-2">
          <span className="font-medium">x₀:</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. 1.5"
            value={x0}
            onChange={(e) => handleX0Change(e.target.value)}
            className="w-40 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </label>

        {/* toggle y₀ */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={provideY0}
            onChange={(e) => handleProvideY0(e.target.checked)}
          />
          <span>Also provide y₀</span>
        </label>

        {/* y₀ debajo */}
        {provideY0 && (
          <label className="flex items-center gap-2">
            <span className="font-medium">y₀:</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="optional"
              value={y0}
              onChange={(e) => handleY0Change(e.target.value)}
              className="w-40 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>
        )}
      </div>

      {/* preview */}
      <div className="text-sm text-gray-600 mt-4">
        <span className="block mb-1 font-medium text-gray-700">Preview:</span>
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

export default CoordinatesInput;
