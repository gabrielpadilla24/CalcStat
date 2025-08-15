import MathFunctionInput from "@/components/MathFunctionInput";

type LimitsResponse = {
  original: string;
  limit: string;
  steps?: string[];
};

const LimitsInput = ({
  onResult,
}: {
  onResult: (original: string, limit: string, steps?: string[]) => void;
}) => (
  <MathFunctionInput<LimitsResponse>
    label="Enter a function to calculate its limit:"
    endpoint="http://localhost:8000/limits"
    payloadKey="equation"
    buttonText="Calculate Limit"
    onSuccess={(data) => {
      onResult(data.original, data.limit, data.steps);
    }}
  />
);

export default LimitsInput;
