import MathFunctionInput from "@/components/MathFunctionInput";

type InflectionPointsResponse = {
  original: string;
  first_derivative: string;
  second_derivative: string;
  second_derivative_zeros: string[];
  second_derivative_singularities: string[];
  inflection_points: { x: string; y: string }[];
  inflection_points_coords: string[];
};

export default function InflectionPointsInput({
  onResult,
}: {
  onResult: (
    original: string,
    first_derivative: string,
    second_derivative: string,
    second_derivative_zeros: string[],
    second_derivative_singularities: string[],
    inflection_points: { x: string; y: string }[],
    inflection_points_coords: string[]
  ) => void;
}) {
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <MathFunctionInput<InflectionPointsResponse>
        label="Enter a function to analyze inflection candidates:"
        endpoint="http://localhost:8000/inflectionpoints"
        payloadKey="equation"
        buttonText="Analyze"
        onSuccess={(data) =>
          onResult(
            data.original,
            data.first_derivative,
            data.second_derivative,
            data.second_derivative_zeros,
            data.second_derivative_singularities,
            data.inflection_points,
            data.inflection_points_coords
          )
        }
      />
    </div>
  );
}
