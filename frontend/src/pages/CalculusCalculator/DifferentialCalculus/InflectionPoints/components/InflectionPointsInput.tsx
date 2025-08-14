// // src/pages/CalculusCalculator/DifferentialCalculus/InflectionPoints/components/InflectionPointsInput.tsx
// import MathFunctionInput from "@/components/MathFunctionInput";

// // Lo que devuelve el backend /inflectionpoints
// type InflectionPointsResponse = {
//   // Fórmulas en LaTeX
//   original: string; // f(x)
//   first_derivative: string; // f'(x)
//   second_derivative: string; // f''(x)

//   // Candidatos a inflexión (abscisas)
//   second_derivative_zeros: string[]; // x donde f''(x) = 0 (LaTeX)
//   second_derivative_singularities: string[]; // x donde f'' no existe (LaTeX)

//   // Puntos de inflexión confirmados
//   inflection_points: { x: string; y: string }[]; // coordenadas exactas en LaTeX
//   inflection_points_coords: string[]; // "(x, y)" listo para Desmos

//   // Intervalos de concavidad (LaTeX legible para UI)
//   concavity_intervals_latex: {
//     up: string; // donde f es cóncava hacia arriba
//     down: string; // donde f es cóncava hacia abajo
//   };
// };

// const InflectionPointsInput = ({
//   onResult,
// }: {
//   onResult: (
//     original: string,
//     first_derivative: string,
//     second_derivative: string,
//     second_derivative_zeros: string[],
//     second_derivative_singularities: string[],
//     inflection_points: { x: string; y: string }[],
//     inflection_points_coords: string[],
//     concavity_intervals_latex: { up: string; down: string }
//   ) => void;
// }) => (
//   <MathFunctionInput<InflectionPointsResponse>
//     label="Enter a function to analyze concavity & inflection points:"
//     endpoint="http://localhost:8000/inflectionpoints"
//     payloadKey="equation"
//     buttonText="Analyze Concavity"
//     onSuccess={(data) =>
//       onResult(
//         data.original,
//         data.first_derivative,
//         data.second_derivative,
//         data.second_derivative_zeros,
//         data.second_derivative_singularities,
//         data.inflection_points,
//         data.inflection_points_coords,
//         data.concavity_intervals_latex
//       )
//     }
//   />
// );

// export default InflectionPointsInput;
// src/pages/.../InflectionPoints/components/InflectionPointsInput.tsx
import MathFunctionInput from "@/components/MathFunctionInput";

type InflectionPointsResponse = {
  original: string;
  first_derivative: string;
  second_derivative: string;
  second_derivative_zeros: string[];
  second_derivative_singularities: string[];
  inflection_points: { x: string; y: string }[];
  inflection_points_coords: string[];
  // (cuando amplíes) inflection_points, etc...
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
  );
}
