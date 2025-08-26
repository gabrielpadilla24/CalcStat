from pydantic import BaseModel
from typing import Union, Literal


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
        """
        De momento: devolver solo los parámetros recibidos.
        Luego se implementarán cálculos reales con scipy.stats.binom.
        """
        return {
            "n": data.n,
            "p": data.p,
            "query": data.query.dict(),
        }
