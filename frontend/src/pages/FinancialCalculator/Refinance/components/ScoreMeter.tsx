import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

interface ScoreMeterProps {
  value: number;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ value }) => {
  return (
    <div className="flex flex-col items-center justify-center my-6 w-full">
      {/* Gauge centrado */}
      <div className="flex justify-center w-full">
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
          currentValueText={`Refinance Score: ${value}`}
          textColor="black"
          height={250}
          width={350}
          needleColor="gray"
          ringWidth={30}
        />
      </div>

      <div className="text-center text-xs text-gray-500 mt-2">
        For educational purposes only, not financial advice.
      </div>
    </div>
  );
};

export default ScoreMeter;
