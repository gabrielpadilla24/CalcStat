from pydantic import BaseModel
from typing import Union, Literal
from scipy.stats import binom


# --- Query models ---
class QueryEqual(BaseModel):
    kind: Literal["equal"]
    k: int


class QueryLeq(BaseModel):
    kind: Literal["leq"]
    k: int


class QueryGeq(BaseModel):
    kind: Literal["geq"]
    k: int


class QueryBetween(BaseModel):
    kind: Literal["between"]
    a: int
    b: int


ProbabilityQuery = Union[QueryEqual, QueryLeq, QueryGeq, QueryBetween]


# --- Binomial request ---
class BinomialData(BaseModel):
    n: int
    p: float
    query: ProbabilityQuery


# --- Handler class ---
class ProbabilityDistribution:
    @staticmethod
    def compute_binomial(data: BinomialData):
        n, p = data.n, data.p
        q = data.query

        dist = binom(n, p)  # distribución binomial

        # Valores posibles de X (0 ... n)
        support = list(range(0, n + 1))
        pmf_values = [dist.pmf(k) for k in support]
        cdf_values = [dist.cdf(k) for k in support]

        # Resultado de la consulta
        prob_result = None
        prob_latex = ""

        if q.kind == "equal":
            prob_result = dist.pmf(q.k)
            prob_latex = f"P(X = {q.k}) = {prob_result:.5f}"

        elif q.kind == "leq":
            prob_result = dist.cdf(q.k)
            prob_latex = f"P(X \\leq {q.k}) = {prob_result:.5f}"

        elif q.kind == "geq":
            prob_result = 1 - dist.cdf(q.k - 1)
            prob_latex = f"P(X \\geq {q.k}) = 1 - F({q.k-1}) = {prob_result:.5f}"

        elif q.kind == "between":
            prob_result = dist.cdf(q.b) - dist.cdf(q.a - 1)
            prob_latex = f"P({q.a} \\leq X \\leq {q.b}) = F({q.b}) - F({q.a-1}) = {prob_result:.5f}"

        return {
            "n": n,
            "p": p,
            "query": q.dict(),
            "support": support,      # valores posibles de X
            "pmf": pmf_values,       # lista de P(X=k)
            "cdf": cdf_values,       # lista de P(X<=k)
            "prob_result": prob_result,
            "prob_latex": prob_latex,
        }
