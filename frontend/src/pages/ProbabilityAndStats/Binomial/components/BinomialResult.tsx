"use client";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type BinomialResponse = {
  n: number;
  p: number;
  query: ProbabilityQuery;
};

type Props = {
  result: BinomialResponse | null;
};

export default function BinomialResult({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No result yet. Submit parameters first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Binomial Result</h2>
      <p>
        <strong>n:</strong> {result.n}
      </p>
      <p>
        <strong>p:</strong> {result.p}
      </p>
      <p>
        <strong>Query:</strong>{" "}
        {result.query.kind === "equal" && `P(X = ${result.query.k})`}
        {result.query.kind === "leq" && `P(X ≤ ${result.query.k})`}
        {result.query.kind === "geq" && `P(X ≥ ${result.query.k})`}
        {result.query.kind === "between" &&
          `P(${result.query.a} ≤ X ≤ ${result.query.b})`}
      </p>
    </div>
  );
}
