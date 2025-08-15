// src/pages/CalculusCalculator/Limits/components/LimitsInput.tsx
import MathFunctionInput from "@/components/MathFunctionInput";

type LimitsResponse = {
  original: string;
  limit: string;
};

const LimitsInput = ({
  onResult,
}: {
  onResult: (original: string, limit: string) => void;
}) => (
  <MathFunctionInput<LimitsResponse>
    label="Enter a function to calculate its limit:"
    endpoint="http://localhost:8000/limits"
    payloadKey="equation"
    buttonText="Calculate Limit"
    inputLeft={
      <img
        src="/img/limitimg.png"
        alt="limit"
        className="h-10 w-auto object-contain select-none"
        draggable={false}
      />
    }
    onSuccess={(data) => {
      onResult(data.original, data.limit);
    }}
  />
);

export default LimitsInput;
