import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

interface ScoreMeterProps {
  value: number;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ value }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-6">
      {/* Gauge */}
      <div>
        <ReactSpeedometer
          maxValue={100}
          value={value}
          valueFormat={"d"}
          customSegmentStops={[0, 20, 40, 60, 80, 100]}
          segmentColors={[
            "#FF4C4C", // rojo vivo
            "#FF9900", // naranja vivo
            "#FFEB3B", // amarillo brillante
            "#8BC34A", // verde lima
            "#00C853", // verde esmeralda
          ]}
          currentValueText={"Refinance Score: ${value}"}
          textColor="black"
          height={250}
          width={350}
          needleColor="gray"
          ringWidth={30}
        />
      </div>

      {/* Priority Options */}
      <div className="text-left">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          What’s your priority?
        </h2>
        <div className="flex items-center mb-4">
          <input
            id="priority-debt"
            type="radio"
            value="debt"
            name="refinance-priority"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />

          <label
            htmlFor="priority-debt"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Debt Free ASAP
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="priority-monthly"
            type="radio"
            value="monthly"
            name="refinance-priority"
            defaultChecked
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />

          <label
            htmlFor="priority-monthly"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Lower Monthly Payments
          </label>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;
