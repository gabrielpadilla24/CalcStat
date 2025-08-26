from pydantic import BaseModel
from typing import Union, Literal
from scipy.stats import binom
from scipy.stats import poisson, geom, norm


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
    




# --- Poisson request ---
class PoissonData(BaseModel):
    lam: float
    query: ProbabilityQuery


class ProbabilityDistribution:
    @staticmethod
    def compute_binomial(data: BinomialData):
        # ... ya definido como lo tienes
        pass

    @staticmethod
    def compute_poisson(data: PoissonData):
        lam = data.lam
        q = data.query

        dist = poisson(lam)

        # Valores de soporte hasta 4 desviaciones estándar aprox
        max_k = int(lam + 5 * (lam**0.5))
        support = list(range(0, max_k + 1))
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
            "lam": lam,
            "query": q.dict(),
            "support": support,      # valores posibles de X
            "pmf": pmf_values,       # lista de P(X=k)
            "cdf": cdf_values,       # lista de P(X<=k)
            "prob_result": prob_result,
            "prob_latex": prob_latex,
        }



# --- Geometric request ---
class GeometricData(BaseModel):
    p: float
    query: ProbabilityQuery


class ProbabilityDistribution:
    @staticmethod
    def compute_geometric(data: GeometricData):
        p = data.p
        q = data.query

        dist = geom(p)  # distribución geométrica

        # valores de soporte (ejemplo: hasta 50 intentos, ajustable)
        max_k = 50
        support = list(range(1, max_k + 1))
        pmf_values = [dist.pmf(k) for k in support]
        cdf_values = [dist.cdf(k) for k in support]

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
            "p": p,
            "query": q.dict(),
            "support": support,
            "pmf": pmf_values,
            "cdf": cdf_values,
            "prob_result": prob_result,
            "prob_latex": prob_latex,
        }



# --- Normal request ---
class NormalData(BaseModel):
    mu: float   # media
    sigma: float  # desviación estándar (>0)
    query: Union[QueryLeq, QueryGeq, QueryBetween]  # no usamos "equal"


class ProbabilityDistribution:
    @staticmethod
    def compute_normal(data: NormalData):
        mu, sigma = data.mu, data.sigma
        q = data.query

        dist = norm(mu, sigma)  # distribución normal con media mu y sigma

        # Valores de soporte (de μ - 4σ a μ + 4σ)
        min_x = int(mu - 4 * sigma)
        max_x = int(mu + 4 * sigma)
        support = [x for x in range(min_x, max_x + 1)]
        pdf_values = [dist.pdf(x) for x in support]
        cdf_values = [dist.cdf(x) for x in support]

        # Resultado de la consulta
        prob_result = None
        prob_latex = ""

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
            "mu": mu,
            "sigma": sigma,
            "query": q.dict(),
            "support": support,    # valores de X
            "pdf": pdf_values,     # densidad f(x)
            "cdf": cdf_values,     # acumulada F(x)
            "prob_result": prob_result,
            "prob_latex": prob_latex,
        }
