"use client";

import DesmosGraph, { DesmosExpression } from "@/components/DesmosGraph";

type ProbabilityQuery =
  | { kind: "equal"; k: number }
  | { kind: "leq"; k: number }
  | { kind: "geq"; k: number }
  | { kind: "between"; a: number; b: number };

type Props = {
  n: number;
  p: number;
  query?: ProbabilityQuery;
  height?: number;
};

export default function BinomialGraph({ n, p, query, height = 500 }: Props) {
  const exprs: DesmosExpression[] = [
    {
      id: "binomial",
      latex: `y=binomialdist(${n}, ${p})`,
    },
  ];

  // 🔹 Resaltar consulta según el tipo
  if (query) {
    if (query.kind === "equal") {
      exprs.push({
        id: "highlight",
        latex: `y=binomialdist(${n}, ${p}, ${query.k})`,
      });
    } else if (query.kind === "leq") {
      exprs.push({
        id: "highlight",
        latex: `y=binomialdist(${n}, ${p}, [0, ${query.k}])`,
      });
    } else if (query.kind === "geq") {
      exprs.push({
        id: "highlight",
        latex: `y=binomialdist(${n}, ${p}, [${query.k}, ${n}])`,
      });
    } else if (query.kind === "between") {
      exprs.push({
        id: "highlight",
        latex: `y=binomialdist(${n}, ${p}, [${query.a}, ${query.b}])`,
      });
    }
  }

  return (
    <DesmosGraph
      title="📊 Binomial Distribution"
      height={height}
      expressions={exprs}
      ui={{
        expressions: true,
        expressionsCollapsed: true,
        keypad: false,
        settingsMenu: false,
        zoomButtons: true,
        expressionsTopbar: false,
        border: false,
      }}
    />
  );
}
