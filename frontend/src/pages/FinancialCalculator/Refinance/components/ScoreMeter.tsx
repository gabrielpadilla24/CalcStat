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
        <div className="text-center text-xs text-gray-500">
          For educational purposes only, not financial advice.
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;
