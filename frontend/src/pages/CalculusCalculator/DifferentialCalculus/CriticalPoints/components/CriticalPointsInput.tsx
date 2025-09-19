import MathFunctionInput from "@/components/MathFunctionInput";

export type AbsoluteExtrema = {
  max: string | null;
  min: string | null;
};

export type CriticalPointsResponse = {
  original: string;
  first_derivative: string;
  second_derivative: string;
  critical_points: string[];
  second_derivative_classification: string;
  absolute_extrema: AbsoluteExtrema;
};

const CriticalPointsInput = ({
  onResult,
}: {
  onResult: (
    original: string,
    first_derivative: string,
    second_derivative: string,
    critical_points: string[],
    second_derivative_classification: string,
    absolute_extrema: AbsoluteExtrema
  ) => void;
}) => (
  <MathFunctionInput<CriticalPointsResponse>
    label="Enter a function to analyze critical points:"
    endpoint="/criticalpoints"
    payloadKey="equation"
    buttonText="Find Critical Points"
    extraContent={
      <div className="mt-3 text-center px-2">
        <a
          href="/calculus/derivatives"
          className="inline-flex flex-wrap items-center justify-center gap-1 text-sm sm:text-base text-gray-500 hover:text-gray-700 transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500"
        >
          see how to calculate the derivatives
          <span aria-hidden className="text-lg leading-none">
            ›
          </span>
        </a>
      </div>
    }
    onSuccess={(data) =>
      onResult(
        data.original,
        data.first_derivative,
        data.second_derivative,
        data.critical_points,
        data.second_derivative_classification,
        data.absolute_extrema
      )
    }
  />
);

export default CriticalPointsInput;
