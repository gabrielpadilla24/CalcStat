import MathFunctionInput from "@/components/MathFunctionInput";

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
}) => (
  <MathFunctionInput<TangentLineResponse>
    label="Enter a function to find the tangent line:"
    endpoint="http://localhost:8000/tangentline"
    payloadKey="equation"
    buttonText="Calculate Tangent Line"
    onSuccess={(data) =>
      onResult(data.original, data.fxTangent, data.derivative, data.my)
    }
  />
);

export default TangentLineInput;
