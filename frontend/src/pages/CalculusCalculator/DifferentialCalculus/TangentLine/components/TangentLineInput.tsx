import MathFunctionInput from "@/components/MathFunctionInput";
type TangentLineResponse = {
  original: string;
  x0: number; // x-coordinate of the point of tangency
  fxTangent: string;
  derivative: string;
  my: string;
};

const TangentLineInput = ({
  onResult,
}: {
  onResult: (
    original: string,
    x0: number,
    fxTangent: string,
    derivative: string,
    my: string
  ) => void;
}) => (
  <MathFunctionInput<TangentLineResponse>
    label="Enter a function to find the tangent line:"
    endpoint="http://localhost:8000/tangentline"
    payloadKey="equation"
    buttonText="Calculate Tangent Line"
    onSuccess={(data) => {
      console.log("📥 Respuesta del backend:", data); // 👈 Esto va a la consola del navegador
      onResult(
        data.original,
        data.x0,
        data.fxTangent,
        data.derivative,
        data.my
      );
    }}
  />
);

export default TangentLineInput;
