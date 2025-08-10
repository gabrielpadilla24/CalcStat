// CriticalPointsInput.tsx
import MathFunctionInput from "@/components/MathFunctionInput";

type CriticalPointsResponse = {
  original: string;
  first_derivative: string;
  second_derivative: string;
  critical_points: string[];
  inflection_points: string[];
  second_derivative_classification: string;
  absolute_extrema: {
    max: string | null;
    min: string | null;
  };
};

const CriticalPointsInput = ({
  onResult,
}: {
  onResult: (
    original: string,
    first_derivative: string,
    second_derivative: string,
    critical_points: string[],
    inflection_points: string[],
    second_derivative_classification: string,
    absolute_extrema: {
      max: string | null;
      min: string | null;
    }
  ) => void;
}) => (
  <MathFunctionInput<CriticalPointsResponse>
    label="Enter a function to analyze critical points:"
    endpoint="http://localhost:8000/calculus/critical-points"
    payloadKey="function"
    buttonText="Find Critical Points"
    onSuccess={(data) =>
      onResult(
        data.original,
        data.first_derivative,
        data.second_derivative,
        data.critical_points,
        data.inflection_points,
        data.second_derivative_classification,
        data.absolute_extrema
      )
    }
  />
);

export default CriticalPointsInput;
