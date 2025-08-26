from pydantic import BaseModel
from typing import Union, Literal
from scipy.stats import binom, poisson, geom, norm, expon
import numpy as np


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


# --- Data models ---
class BinomialData(BaseModel):
    n: int
    p: float
    query: ProbabilityQuery


class PoissonData(BaseModel):
    lam: float
    query: ProbabilityQuery


class GeometricData(BaseModel):
    p: float
    query: ProbabilityQuery


class NormalData(BaseModel):
    mu: float   # media
    sigma: float  # desviación estándar (>0)
    query: Union[QueryLeq, QueryGeq, QueryBetween]  # no usamos "equal"


class ExponentialDistrData(BaseModel):
    lam: float   # tasa (>0)
    query: Union[QueryLeq, QueryGeq, QueryBetween]  # no usamos "equal"


# --- Unified Handler class ---
class ProbabilityDistribution:
    @staticmethod
    def compute_binomial(data: BinomialData):
        n, p = data.n, data.p
        q = data.query
        dist = binom(n, p)

        support = list(range(0, n + 1))
        pmf_values = [dist.pmf(k) for k in support]
        cdf_values = [dist.cdf(k) for k in support]

        prob_result, prob_latex = None, ""
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
            "n": n, "p": p, "query": q.dict(),
            "support": support, "pmf": pmf_values, "cdf": cdf_values,
            "prob_result": prob_result, "prob_latex": prob_latex,
        }

    @staticmethod
    def compute_poisson(data: PoissonData):
        lam, q = data.lam, data.query
        dist = poisson(lam)

        max_k = int(lam + 5 * (lam**0.5))
        support = list(range(0, max_k + 1))
        pmf_values = [dist.pmf(k) for k in support]
        cdf_values = [dist.cdf(k) for k in support]

        prob_result, prob_latex = None, ""
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
            "lam": lam, "query": q.dict(),
            "support": support, "pmf": pmf_values, "cdf": cdf_values,
            "prob_result": prob_result, "prob_latex": prob_latex,
        }

    @staticmethod
    def compute_geometric(data: GeometricData):
        p, q = data.p, data.query
        dist = geom(p)

        max_k = 50
        support = list(range(1, max_k + 1))
        pmf_values = [dist.pmf(k) for k in support]
        cdf_values = [dist.cdf(k) for k in support]

        prob_result, prob_latex = None, ""
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
            "p": p, "query": q.dict(),
            "support": support, "pmf": pmf_values, "cdf": cdf_values,
            "prob_result": prob_result, "prob_latex": prob_latex,
        }

    @staticmethod
    def compute_normal(data: NormalData):
        mu, sigma, q = data.mu, data.sigma, data.query
        dist = norm(mu, sigma)

        min_x, max_x = int(mu - 4 * sigma), int(mu + 4 * sigma)
        support = [x for x in range(min_x, max_x + 1)]
        pdf_values = [dist.pdf(x) for x in support]
        cdf_values = [dist.cdf(x) for x in support]

        prob_result, prob_latex = None, ""
        if q.kind == "leq":
            prob_result = dist.cdf(q.k)
            prob_latex = f"P(X \\leq {q.k}) = {prob_result:.5f}"
        elif q.kind == "geq":
            prob_result = 1 - dist.cdf(q.k)
            prob_latex = f"P(X \\geq {q.k}) = 1 - F({q.k}) = {prob_result:.5f}"
        elif q.kind == "between":
            prob_result = dist.cdf(q.b) - dist.cdf(q.a)
            prob_latex = f"P({q.a} \\leq X \\leq {q.b}) = F({q.b}) - F({q.a}) = {prob_result:.5f}"

        return {
            "mu": mu, "sigma": sigma, "query": q.dict(),
            "support": support, "pdf": pdf_values, "cdf": cdf_values,
            "prob_result": prob_result, "prob_latex": prob_latex,
        }

    @staticmethod
    def compute_exponential(data: ExponentialDistrData):
        lam, q = data.lam, data.query
        dist = expon(scale=1/lam)

        max_x = dist.ppf(0.999)
        support = [round(x, 2) for x in np.linspace(0, max_x, 200)]
        pdf_values = [dist.pdf(x) for x in support]
        cdf_values = [dist.cdf(x) for x in support]

        prob_result, prob_latex = None, ""
        if q.kind == "leq":
            prob_result = dist.cdf(q.k)
            prob_latex = f"P(X \\leq {q.k}) = {prob_result:.5f}"
        elif q.kind == "geq":
            prob_result = 1 - dist.cdf(q.k)
            prob_latex = f"P(X \\geq {q.k}) = 1 - F({q.k}) = {prob_result:.5f}"
        elif q.kind == "between":
            prob_result = dist.cdf(q.b) - dist.cdf(q.a)
            prob_latex = f"P({q.a} \\leq X \\leq {q.b}) = F({q.b}) - F({q.a}) = {prob_result:.5f}"

        return {
            "lam": lam, "query": q.dict(),
            "support": support, "pdf": pdf_values, "cdf": cdf_values,
            "prob_result": prob_result, "prob_latex": prob_latex,
        }
