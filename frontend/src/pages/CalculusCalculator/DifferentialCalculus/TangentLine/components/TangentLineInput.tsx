import { useState } from "react";
import MathFunctionInput from "@/components/MathFunctionInput";
import CoordinatesInput, {
  CoordinatesValue,
} from "@/components/CoordenatesInput";
type TangentLineResponse = {
  original: string;
  fxTangent: string;
  derivative: string;
  my: string;
};

const TangentLineInput = ({
  onResult,
}: {
  onResult: (
    original: string,
    tangentpoint: string,
    derivative: string,
    my: string
  ) => void;
}) => {
  const [coords, setCoords] = useState<CoordinatesValue>({});

  return (
    <div className="w-full">
      <CoordinatesInput onChange={setCoords} />

      <MathFunctionInput<TangentLineResponse, CoordinatesValue>
        label="Enter a function to find the tangent line:"
        endpoint="http://localhost:8000/tangentline"
        payloadKey="equation"
        extraPayload={coords}
        buttonText="Calculate Tangent Line"
        onSuccess={(data) =>
          onResult(data.original, data.fxTangent, data.derivative, data.my)
        }
      />
    </div>
  );
};

export default TangentLineInput;
