from pydantic import BaseModel
from typing import Union, Literal, List, Optional
from scipy.stats import binom, poisson, geom, norm, expon, uniform, bernoulli, t, chi2, f
import numpy as np
import sympy as sp
import math
import statsmodels.api as sm



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


class CLTData(BaseModel):
    distribution: str                # "bernoulli", "binomial", "poisson", "uniform", "exponential", "normal"
    params: dict                     # parámetros de la distribución
    n: int                           # tamaño de muestra
    n_sim: int   

class InferenceData(BaseModel):
    test: Literal["z", "t", "chi2", "anova"]
    xbar: float | None = None      # media muestral
    mu0: float | None = None       # media hipotética o varianza hipotética (para chi2)
    s: float | None = None         # desviación estándar (σ o s) o varianza muestral
    n: int | None = None           # tamaño de muestra
    alpha: float = 0.05            # nivel de significancia
    alternative: Literal["!=", ">", "<"] = "!="
    groups: list[list[float]] | None = None   # para ANOVA


class RegressionData(BaseModel):
    X: List[List[float]]   # Matriz de predictores (puede ser 1 o varias columnas)
    Y: List[float]         # Variable dependiente


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
        

    @staticmethod
    def compute_clt(data: CLTData):
        dist_name = data.distribution.lower()
        params = data.params
        n = data.n
        n_sim = data.n_sim

        # --- Selección de distribución ---
        if dist_name == "bernoulli":
            p = params.get("p", 0.5)
            dist = bernoulli(p)
        elif dist_name == "binomial":
            n0, p = params.get("n", 10), params.get("p", 0.5)
            dist = binom(n0, p)
        elif dist_name == "poisson":
            lam = params.get("lam", 1)
            dist = poisson(lam)
        elif dist_name == "uniform":
            a, b = params.get("a", 0), params.get("b", 1)
            dist = uniform(a, b - a)
        elif dist_name == "exponential":
            lam = params.get("lam", 1)
            dist = expon(scale=1 / lam)
        elif dist_name == "normal":
            mu, sigma = params.get("mu", 0), params.get("sigma", 1)
            dist = norm(mu, sigma)
        else:
            raise ValueError(f"Unknown distribution: {dist_name}")

        # --- Simulación de medias ---
        samples = dist.rvs(size=(n_sim, n))
        sample_means = samples.mean(axis=1)

        # --- Teoría ---
        mu = dist.mean()
        sigma2 = dist.var()
        theo_mean = mu
        theo_var = sigma2 / n

        # --- Histograma (backend) ---
        bins = 30
        min_val, max_val = sample_means.min(), sample_means.max()
        counts, bin_edges = np.histogram(sample_means, bins=bins, density=True)
        mids = (bin_edges[:-1] + bin_edges[1:]) / 2

        # --- Curva normal teórica ---
        pdf_vals = norm.pdf(mids, loc=theo_mean, scale=np.sqrt(theo_var))

        # --- Datos listos para gráfico ---
        graph_data = [
            {"x": float(mids[i]), "freq": float(counts[i]), "normal": float(pdf_vals[i])}
            for i in range(len(mids))
        ]

        return {
            "simMean": float(np.mean(sample_means)),
            "simVar": float(np.var(sample_means)),
            "theoMean": float(theo_mean),
            "theoVar": float(theo_var),
            "mu": float(mu),
            "sigma2": float(sigma2),
            "n": n,
            "n_sim": n_sim,
            "distribution": dist_name,
            "params": params,
            "graphData": graph_data,  # 🔥 listo para frontend
        }
    
    @staticmethod
    def compute_inference(data: InferenceData):
        test = data.test.lower()

        # =============================
        # Z-test y T-test (medias)
        # =============================
        if test in ["z", "t"]:
            xbar, mu0, s, n, alpha, alt = (
                data.xbar, data.mu0, data.s, data.n, data.alpha, data.alternative
            )
            se = s / math.sqrt(n)

            if test == "z":
                stat = (xbar - mu0) / se
                dist = norm(0, 1)
                z_val = norm.ppf(1 - alpha/2)
                ci = [xbar - z_val * se, xbar + z_val * se]
                latex_ci = r"CI = \bar{x} \pm z_{\alpha/2}\cdot \frac{\sigma}{\sqrt{n}}"
            else:  # T-test
                stat = (xbar - mu0) / se
                dist = t(df=n-1)
                t_val = t.ppf(1 - alpha/2, df=n-1)
                ci = [xbar - t_val * se, xbar + t_val * se]
                latex_ci = r"CI = \bar{x} \pm t_{\alpha/2,n-1}\cdot \frac{s}{\sqrt{n}}"

            # --- p-valor según hipótesis ---
            if alt == "!=":
                p_value = 2 * (1 - dist.cdf(abs(stat)))
            elif alt == ">":
                p_value = 1 - dist.cdf(stat)
            else:  # alt == "<"
                p_value = dist.cdf(stat)

            decision = "Reject H0" if p_value < alpha else "Fail to reject H0"

            return {
                "test": test,
                "statistic": stat,
                "p_value": p_value,
                "alpha": alpha,
                "alternative": alt,
                "ci": ci,
                "latex_ci": latex_ci,
                "decision": decision,
                "inputs": data.dict()
            }

        # =============================
        # χ² Test (varianza)
        # =============================
        if test == "chi2":
            s2, n, sigma0, alpha, alt = data.s, data.n, data.mu0, data.alpha, data.alternative
            df = n - 1
            stat = (df * s2) / sigma0

            # Intervalo de confianza para la varianza
            lower = (df * s2) / chi2.ppf(1 - alpha/2, df)
            upper = (df * s2) / chi2.ppf(alpha/2, df)
            ci = [lower, upper]

            # Valor-p según hipótesis
            if alt == "!=":
                p_value = 2 * min(chi2.cdf(stat, df), 1 - chi2.cdf(stat, df))
            elif alt == ">":
                p_value = 1 - chi2.cdf(stat, df)
            else:
                p_value = chi2.cdf(stat, df)

            decision = "Reject H0" if p_value < alpha else "Fail to reject H0"

            return {
                "test": "chi2",
                "statistic": stat,
                "p_value": p_value,
                "ci": ci,
                "latex_ci": r"CI = \left[\frac{(n-1)s^2}{\chi^2_{1-\alpha/2,n-1}}, \frac{(n-1)s^2}{\chi^2_{\alpha/2,n-1}}\right]",
                "decision": decision,
                "inputs": data.dict()
            }

        # =============================
        # ANOVA (One-Way)
        # =============================
        if test == "anova":
            groups = data.groups
            alpha = data.alpha

            k = len(groups)  # número de grupos
            N = sum(len(g) for g in groups)  # total observaciones
            grand_mean = sum(sum(g) for g in groups) / N

            # Suma de cuadrados entre grupos
            SSB = sum(len(g) * (sum(g)/len(g) - grand_mean)**2 for g in groups)
            df_between = k - 1

            # Suma de cuadrados dentro de grupos
            SSW = sum(sum((x - (sum(g)/len(g)))**2 for x in g) for g in groups)
            df_within = N - k

            MSB = SSB / df_between
            MSW = SSW / df_within
            F_stat = MSB / MSW

            # Valor-p
            p_value = 1 - f.cdf(F_stat, df_between, df_within)

            decision = "Reject H0" if p_value < alpha else "Fail to reject H0"

            return {
                "test": "anova",
                "statistic": F_stat,
                "p_value": p_value,
                "decision": decision,
                "df_between": df_between,
                "df_within": df_within,
                "inputs": data.dict(),
                "explanation": "ANOVA tests whether at least one group mean differs."
            }

        # =============================
        # Si el test no es soportado
        # =============================
        raise ValueError("Unsupported test type")
    
    @staticmethod
    def compute_regression(data: RegressionData):
        try:
            X = np.array(data.X, dtype=float)
            Y = np.array(data.Y, dtype=float)

            if X.ndim == 1:  # caso simple: lista plana
                X = X.reshape(-1, 1)

            # Intercepto
            if data.include_intercept:
                X = sm.add_constant(X)

            model = sm.OLS(Y, X).fit()

            # Nombres de coeficientes
            coef_names = (
                ["β0"] + [f"β{i+1}" for i in range(X.shape[1] - 1)]
                if data.include_intercept
                else [f"β{i+1}" for i in range(X.shape[1])]
            )

            # Coeficientes y estadísticos
            coefs = dict(zip(coef_names, model.params.round(5).tolist()))
            stderr = dict(zip(coef_names, model.bse.round(5).tolist()))
            tvalues = dict(zip(coef_names, model.tvalues.round(5).tolist()))
            pvalues = dict(zip(coef_names, model.pvalues.round(5).tolist()))

            # Métricas globales
            r2 = float(round(model.rsquared, 5))
            r2_adj = float(round(model.rsquared_adj, 5))
            fstat = float(round(model.fvalue, 5)) if model.fvalue is not None else None
            f_pvalue = float(round(model.f_pvalue, 5)) if model.f_pvalue is not None else None

            # Ecuación en LaTeX
            terms = []
            for i, name in enumerate(coef_names):
                if name == "β0":
                    terms.append(f"{coefs[name]}")
                else:
                    terms.append(f"{coefs[name]} X_{i}")
            latex_eq = "y = " + " + ".join(terms)

            return {
                "coefficients": coefs,
                "stderr": stderr,
                "tvalues": tvalues,
                "pvalues": pvalues,
                "r2": r2,
                "r2_adj": r2_adj,
                "fstat": fstat,
                "f_pvalue": f_pvalue,
                "equation_latex": latex_eq,
            }
        except Exception as e:
            return {"error": str(e)}