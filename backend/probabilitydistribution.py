from pydantic import BaseModel
from typing import Union, Literal, List, Optional
from scipy.stats import binom, poisson, geom, norm, expon
import numpy as np
import sympy as sp


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

class UniformData(BaseModel):
    a: float   # límite inferior
    b: float   # límite superior
    query: Union[QueryLeq, QueryGeq, QueryBetween]

class BayesData(BaseModel):
    p_a: float                 # P(A)
    p_b: float | None = None   # P(B), opcional si se conoce
    p_b_given_a: float         # P(B|A)
    p_b_given_not_a: float | None = None  # P(B|¬A), opcional

class EVMData(BaseModel):
    variableType: Literal["discrete", "continuous"]
    support: Optional[List[float]] = None
    probs: Optional[List[float]] = None
    equation: Optional[str] = None
    interval: Optional[List[float]] = None
    momentOrders: Optional[List[int]] = [1, 2, 3]


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
    

    @staticmethod
    def compute_uniform(data: UniformData):
        a, b = data.a, data.b
        q = data.query

        if a >= b:
            raise ValueError("The lower limit 'a' must be less than the upper limit 'b'.")

        # --- PDF y CDF ---
        def pdf(x):
            if a <= x <= b:
                return 1.0 / (b - a)
            return 0.0

        def cdf(x):
            if x < a:
                return 0.0
            elif x > b:
                return 1.0
            else:
                return (x - a) / (b - a)

        # soporte: 200 puntos entre [a, b]
        support = [round(x, 2) for x in np.linspace(a, b, 200)]
        pdf_values = [pdf(x) for x in support]
        cdf_values = [cdf(x) for x in support]

        # --- Resultado de la consulta ---
        prob_result = None
        prob_latex = ""

        if q.kind == "leq":
            prob_result = cdf(q.k)
            prob_latex = f"P(X \\leq {q.k}) = \\frac{{{q.k} - {a}}}{{{b} - {a}}} = {prob_result:.5f}"

        elif q.kind == "geq":
            prob_result = 1 - cdf(q.k)
            prob_latex = f"P(X \\geq {q.k}) = 1 - F({q.k}) = {prob_result:.5f}"

        elif q.kind == "between":
            prob_result = cdf(q.b) - cdf(q.a)
            prob_latex = f"P({q.a} \\leq X \\leq {q.b}) = F({q.b}) - F({q.a}) = {prob_result:.5f}"

        return {
            "a": a,
            "b": b,
            "query": q.dict(),
            "support": support,   # valores de X
            "pdf": pdf_values,    # densidad uniforme
            "cdf": cdf_values,    # acumulada
            "prob_result": prob_result,
            "prob_latex": prob_latex,
        }
    
    @staticmethod
    def compute_bayes(data: BayesData):
        p_a = data.p_a
        p_b = data.p_b
        p_b_given_a = data.p_b_given_a
        p_b_given_not_a = data.p_b_given_not_a

        # Si no tenemos P(B), usamos la Ley de la prob. total
        if p_b is None:
            if p_b_given_not_a is None:
                raise ValueError("If P(B) is not provided, P(B|¬A) is required.")
            p_b = p_b_given_a * p_a + p_b_given_not_a * (1 - p_a)

        # Teorema de Bayes
        posterior = (p_b_given_a * p_a) / p_b

        # Construcción de la fórmula LaTeX
        if p_b_given_not_a is not None and data.p_b is None:
            latex = (
                f"P(A|B) = \\frac{{P(B|A)P(A)}}{{P(B|A)P(A) + P(B|¬A)(1-P(A))}}"
                f" = \\frac{{{p_b_given_a} \\cdot {p_a}}}{{{p_b_given_a} \\cdot {p_a} + {p_b_given_not_a} \\cdot (1-{p_a})}}"
                f" = {posterior:.5f}"
            )
        else:
            latex = (
                f"P(A|B) = \\frac{{P(B|A)P(A)}}{{P(B)}}"
                f" = \\frac{{{p_b_given_a} \\cdot {p_a}}}{{{p_b}}}"
                f" = {posterior:.5f}"
            )

        return {
            "p_a": p_a,
            "p_b": p_b,
            "p_b_given_a": p_b_given_a,
            "p_b_given_not_a": p_b_given_not_a,
            "posterior": posterior,
            "latex": latex,
        }
    
    @staticmethod
    def compute_evm(data: EVMData):
        try:
            if data.variableType == "discrete":
                if not data.support or not data.probs:
                    raise ValueError("Support and probabilities are required for discrete variables.")

                if len(data.support) != len(data.probs):
                    raise ValueError("Support and probability arrays must have the same length.")

                total_prob = sum(data.probs)
                if abs(total_prob - 1) > 1e-6:
                    raise ValueError("Probabilities must sum to 1.")

                # Esperanza
                E = round(sum(x * p for x, p in zip(data.support, data.probs)), 3)

                # Varianza
                Var = round(sum(((x - E) ** 2) * p for x, p in zip(data.support, data.probs)), 3)

                # Momentos
                moments = []
                for k in data.momentOrders or [1, 2, 3]:
                    mk = round(sum((x ** k) * p for x, p in zip(data.support, data.probs)), 3)
                    moments.append({"order": k, "value": mk})

                return {
                    "expectedValue": E,
                    "variance": Var,
                    "moments": moments,
                    "variableType": "discrete",
                }

            # (más adelante: continuous con integrales)
            else:
                raise NotImplementedError("Continuous variables not yet supported.")

        except Exception as e:
            return {"error": str(e)}