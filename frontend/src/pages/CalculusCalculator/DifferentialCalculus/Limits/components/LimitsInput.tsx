// src/pages/CalculusCalculator/Limits/components/LimitsInput.tsx
import MathFunctionInput from "@/components/MathFunctionInput";

type LimitsResponse = {
  original: string;
  limit: string;
  fx: string;
};

const LimitsInput = ({
  onResult,
}: {
  onResult: (original: string, limit: string, fx: string) => void;
}) => (
  <MathFunctionInput<LimitsResponse>
    label="Enter a function to calculate its limit:"
    endpoint="/limits"
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
      onResult(data.original, data.limit, data.fx);
    }}
  />
);

export default LimitsInput;
