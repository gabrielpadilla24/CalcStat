from pydantic import BaseModel
import numpy as np
import sympy as sp
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
import re

class BrownianData(BaseModel):
    x0: float = 0.0
    mu: float = 0.0
    sigma: float = 1.0
    T: float = 1.0
    N: int = 1000
    M: int = 10

class ItoData(BaseModel):
    integrand: str       
    T: float = 1.0      
    N: int = 1000        
    M: int = 10          
    w0: float = 0.0    

class ItoLemmaData(BaseModel):
    f: str        # function f(t,x)
    mu: str       # drift μ(t,x)
    sigma: str    # volatility σ(t,x) 

class SDEData(BaseModel):
    x0: float
    mu: str
    sigma: str
    T: float
    N: int
    M: int

class MartingaleData(BaseModel):
    process: str     # función f(t, W)
    mode: str       # "montecarlo" o "analytical"
    T: float = 0.0        # horizonte temporal
    N: int = 0            # pasos
    M: int = 0            # trayectorias
    w0: float = 0.0       # valor inicial de W0

class EVData(BaseModel):
    process: str 

class QVData(BaseModel):
    process: str
    mode: str                # "analytical" o "montecarlo"
    T: float = 0
    N: int = 0
    M: int = 0
    a: float = 0
    b: float = 0
    mu: float = 0
    sigma: float = 0

class GirsanovData(BaseModel):
    mu: float      # drift original bajo P
    sigma: float   # volatilidad > 0
    mu_tilde: float  # nuevo drift bajo Q
    T: float = 1.0   # horizonte temporal (opcional)
    N: int = 100     # pasos discretización (para Monte Carlo)
    M: int = 20      # número de trayectorias (para Monte Carlo)
    mode: str = "analytical"   # "analytical" o "montecarlo"


def normalize_latex(expr: str) -> str:
    expr = expr.replace(r"\cdot", "*")
    expr = expr.replace("^", "**")
    return expr.strip()

class StochasticSimulator:

    @staticmethod
    def simulate_brownian(data: BrownianData):
        x0, mu, sigma, T, N, M = (
            data.x0, data.mu, data.sigma, data.T, data.N, data.M
        )

        dt = T / N
        increments = np.random.normal(
            loc=mu * dt, scale=sigma * np.sqrt(dt), size=(M, N)
        )

        paths = np.zeros((M, N + 1))
        paths[:, 0] = x0
        paths[:, 1:] = x0 + np.cumsum(increments, axis=1)

        # 🔹 Formato para Recharts [{step: 0, traj0: ..., traj1: ...}, ...]
        chart_data = []
        for step in range(N + 1):
            row = {"step": step}
            for m in range(M):
                row[f"traj{m}"] = float(paths[m, step])
            chart_data.append(row)

        return {
            "params": data.dict(),
            "chartData": chart_data   # ya listo para Recharts
        }
    
    @staticmethod
    def simulate_ito(data: ItoData):
        T, N, M, w0 = data.T, data.N, data.M, data.w0
        dt = T / N

        # símbolos para parsing
        t_sym, W_sym = sp.symbols("t W")
        expr = sp.sympify(data.integrand)
        f_t_W = sp.lambdify((t_sym, W_sym), expr, "numpy")

        # Simulación de M trayectorias de W
        dW = np.random.normal(0, np.sqrt(dt), size=(M, N))
        W = np.zeros((M, N + 1))
        W[:, 0] = w0
        W[:, 1:] = w0 + np.cumsum(dW, axis=1)

        # Simulación de la integral de Itô
        I = np.zeros((M, N + 1))
        for i in range(N):
            t_i = i * dt
            X_t = f_t_W(t_i, W[:, i])   # evalúa integrando en cada trayectoria
            I[:, i+1] = I[:, i] + X_t * dW[:, i]

        # 🔹 Formato para Recharts [{step: 0, traj0:..., traj1:...}, ...]
        chart_data = []
        for step in range(N + 1):
            row = {"step": step}
            for m in range(M):
                row[f"traj{m}"] = float(I[m, step])
            chart_data.append(row)

        return {
            "params": data.dict(),
            "chartData": chart_data
        }


    @staticmethod
    def apply_ito_lemma(data: ItoLemmaData):
        t, x = sp.symbols("t x")

        # 🔹 Normalizar inputs
        f_in = normalize_latex(data.f)
        mu_in = normalize_latex(data.mu)
        sigma_in = normalize_latex(data.sigma)

        # Parsear funciones
        f_expr = sp.sympify(f_in, locals={"t": t, "x": x})
        mu_expr = sp.sympify(mu_in, locals={"t": t, "x": x})
        sigma_expr = sp.sympify(sigma_in, locals={"t": t, "x": x})

        # Derivadas parciales
        f_t = sp.diff(f_expr, t)
        f_x = sp.diff(f_expr, x)
        f_xx = sp.diff(f_expr, x, 2)

        # Términos de Itô
        drift = f_t + mu_expr * f_x + sp.Rational(1, 2) * (sigma_expr**2) * f_xx
        diffusion = sigma_expr * f_x

        steps = [
            rf"\frac{{\partial f}}{{\partial t}} = {sp.latex(f_t)}",
            rf"\frac{{\partial f}}{{\partial x}} = {sp.latex(f_x)}",
            rf"\frac{{\partial^2 f}}{{\partial x^2}} = {sp.latex(f_xx)}",
            r"\text{Substitute into Itô's Lemma:}",
            rf"df(t,X_t) = \Big({sp.latex(drift)}\Big)\, dt + \Big({sp.latex(diffusion)}\Big)\, dW_t"
        ]

        return {
            "params": data.dict(),
            "partials": {
                "f_t": sp.latex(f_t),
                "f_x": sp.latex(f_x),
                "f_xx": sp.latex(f_xx),
            },
            "drift": sp.latex(drift),
            "diffusion": sp.latex(diffusion),
            "final": steps[-1],
            "steps": steps
        }
    
    @staticmethod
    def solve_sde(data: SDEData):
        # Variables simbólicas
        t, x = sp.symbols("t x")

        # Transformaciones para parsing
        transformations = standard_transformations + (implicit_multiplication_application,)

        def normalize(expr: str) -> str:
            if not expr:
                return "0"
            expr = (
                expr.replace(r"\cdot", "*")  # 0.2 \cdot x -> 0.2*x
                .replace("·", "*")           # símbolo punto medio -> *
                .replace("^", "**")          # x^2 -> x**2
            )
            return expr.strip()

        # Parsear con multiplicación implícita habilitada
        mu_expr = parse_expr(normalize(data.mu), local_dict={"t": t, "x": x}, transformations=transformations)
        sigma_expr = parse_expr(normalize(data.sigma), local_dict={"t": t, "x": x}, transformations=transformations)

        mu_func = sp.lambdify((t, x), mu_expr, "numpy")
        sigma_func = sp.lambdify((t, x), sigma_expr, "numpy")

        # Parámetros
        dt = data.T / data.N
        sqrt_dt = np.sqrt(dt)

        # Simulación de trayectorias
        paths = np.zeros((data.M, data.N + 1))
        paths[:, 0] = data.x0

        for i in range(data.N):
            t_i = i * dt
            dW = np.random.normal(0, sqrt_dt, size=data.M)
            X_i = paths[:, i]
            paths[:, i+1] = X_i + mu_func(t_i, X_i) * dt + sigma_func(t_i, X_i) * dW

        # 🔹 Estadísticas finales
        final_values = paths[:, -1]
        stats = {
            "mean": float(np.mean(final_values)),
            "variance": float(np.var(final_values)),
            "min": float(np.min(final_values)),
            "max": float(np.max(final_values)),
        }

        # 🔹 Formato Recharts
        chart_data = []
        for step in range(data.N + 1):
            row = {"step": step}
            for m in range(data.M):
                row[f"traj{m}"] = float(paths[m, step])
            chart_data.append(row)

        return {
            "params": data.dict(),
            "chartData": chart_data,
            "stats": stats,
        }
    
    @staticmethod
    def test_martingale(data: MartingaleData):
        t, W = sp.symbols("t W")

        # Normalizador: soporta "0.2W", "tW", "\cdot", "^"
        def normalize(expr: str) -> str:
            expr = expr.replace(r"\cdot", "*").replace("^", "**")
            expr = re.sub(r"(\d)([a-zA-Z\(])", r"\1*\2", expr)  # 2x -> 2*x
            return expr.strip()

        if not data.process or not data.mode:
            return {"error": "Both 'process' and 'mode' are required."}

        expr = sp.sympify(normalize(data.process), locals={"t": t, "W": W})

        # -----------------------
        # MODO ANALÍTICO (Itô)
        # -----------------------
        if data.mode == "analytical":
            f_t = sp.diff(expr, t)
            f_W = sp.diff(expr, W)
            f_WW = sp.diff(expr, W, 2)

            drift = f_t + sp.Rational(1, 2) * f_WW  # mu=0, sigma=1
            diffusion = f_W
            drift_simplified = sp.simplify(drift)

            is_martingale = False
            if drift_simplified == 0 or drift_simplified.equals(0):
                is_martingale = True
            else:
                drift_val = float(sp.N(drift_simplified.subs({t: 0, W: 0})))
                if abs(drift_val) < 1e-10:
                    is_martingale = True

            steps = [
                rf"\frac{{\partial f}}{{\partial t}} = {sp.latex(f_t)}",
                rf"\frac{{\partial f}}{{\partial W}} = {sp.latex(f_W)}",
                rf"\frac{{\partial^2 f}}{{\partial W^2}} = {sp.latex(f_WW)}",
                r"\text{Substitute into Itô's Lemma:}",
                rf"df(t,W_t) = \Big({sp.latex(drift_simplified)}\Big)\, dt + \Big({sp.latex(diffusion)}\Big)\, dW_t"
            ]

            return {
                "mode": "analytical",
                "params": data.dict(),
                "partials": {
                    "f_t": sp.latex(f_t),
                    "f_W": sp.latex(f_W),
                    "f_WW": sp.latex(f_WW),
                },
                "drift": sp.latex(drift_simplified),
                "diffusion": sp.latex(diffusion),
                "isMartingale": bool(is_martingale),
                "reason": "Drift term vanished" if is_martingale else "Non-zero drift term",
                "final": steps[-1],
                "steps": steps
            }

        # -----------------------
        # MODO MONTE CARLO
        # -----------------------
        elif data.mode == "montecarlo":
            if data.N <= 0 or data.M <= 0 or data.T <= 0:
                return {"error": "Monte Carlo mode requires positive T, N, and M."}

            dt = data.T / data.N
            sqrt_dt = np.sqrt(dt)

            f_func = sp.lambdify((t, W), expr, "numpy")

            # Simulación de Browniano
            dW = np.random.normal(0, sqrt_dt, size=(data.M, data.N))
            W_paths = np.zeros((data.M, data.N + 1))
            W_paths[:, 0] = data.w0
            W_paths[:, 1:] = data.w0 + np.cumsum(dW, axis=1)

            # Simulación del proceso
            process_paths = np.zeros((data.M, data.N + 1))
            for i in range(data.N + 1):
                t_i = i * dt
                process_paths[:, i] = f_func(t_i, W_paths[:, i])

            means = process_paths.mean(axis=0)
            vars_ = process_paths.var(axis=0)

            # 🔹 limitar trayectorias a mostrar
            max_traj = min(data.M, 50)

            chart_data = []
            for step in range(data.N + 1):
                row = {
                    "step": step,
                    "mean": float(means[step]),
                    "var": float(vars_[step])
                }
                for m in range(max_traj):
                    row[f"traj{m}"] = float(process_paths[m, step])
                chart_data.append(row)

            # ✅ Nuevo criterio: media final ≈ media inicial
            tol_rel = 0.05  # 5% tolerancia relativa
            mean0, meanT = means[0], means[-1]
            is_martingale = abs(meanT - mean0) <= tol_rel * abs(mean0)

            return {
                "mode": "montecarlo",
                "params": data.dict(),
                "chartData": chart_data,
                "isMartingale": bool(is_martingale),
                "reason": "Empirical mean stayed close to initial value"
                if is_martingale
                else f"Empirical mean drifted (from {mean0:.3f} to {meanT:.3f})",
                "trajectoriesShown": max_traj,
                "trajectoriesTotal": data.M
            }

        else:
            return {"error": f"Unknown mode: {data.mode}"}
        
    @staticmethod
    def compute_expectation_variance(data: EVData):
        t, W, σ, a, b = sp.symbols("t W σ a b")

        if not data.process:
            return {"error": "Process is required."}

        steps = []
        formula = ""

        if data.process == "Brownian motion":
            EX, VarX = 0, t
            formula = r"W_t"
            steps = [r"E[W_t] = 0", r"\mathrm{Var}(W_t) = t"]

        elif data.process == "Deterministic time":
            EX, VarX = t, 0
            formula = r"t"
            steps = [r"E[t] = t", r"\mathrm{Var}(t) = 0"]

        elif data.process == "Exponential martingale":
            EX, VarX = 1, sp.exp(σ**2*t) - 1
            formula = r"e^{\sigma W_t - \tfrac{1}{2}\sigma^2 t}"
            steps = [
                r"E\!\left[e^{\sigma W_t - \tfrac{1}{2}\sigma^2 t}\right] = 1",
                r"\mathrm{Var} = e^{\sigma^2 t} - 1"
            ]

        elif data.process == "Shifted Brownian motion":
            EX, VarX = b, a**2 * t
            formula = r"a W_t + b"
            steps = [
                r"E[a W_t + b] = b",
                r"\mathrm{Var}(a W_t + b) = a^2 t"
            ]

        elif data.process == "Quadratic martingale":
            EX, VarX = 0, 2*t**2
            formula = r"W_t^2 - t"
            steps = [
                r"E[W_t^2 - t] = 0",
                r"\mathrm{Var}(W_t^2 - t) = 2t^2"
            ]

        else:
            return {
                "mode": "analytical",
                "params": data.dict(),
                "expectation": "Not available analytically",
                "variance": "Not available analytically",
                "formula": "N/A",
                "steps": []
            }

        return {
            "mode": "analytical",
            "params": data.dict(),
            "expectation": sp.latex(EX),
            "variance": sp.latex(VarX),
            "formula": formula,   # 🔥 Fórmula añadida
            "steps": steps
        }
    
    @staticmethod
    def compute_qv(data: QVData):
        t, W, a, b, mu, sigma = sp.symbols("t W a b mu sigma")

        if not data.process or not data.mode:
            return {"error": "Both 'process' and 'mode' are required."}

        # -----------------------
        # MODO ANALÍTICO
        # -----------------------
        if data.mode == "analytical":
            steps, qv_formula, qv_value, display_formula = [], None, None, None

            if data.process == "Brownian motion":
                display_formula = r"W_t"
                qv_formula = r"[W]_t = t"
                qv_value = sp.latex(t)
                steps = [r"[W]_t = t"]

            elif data.process == "Scaled Brownian motion":
                display_formula = r"a W_t"
                qv_formula = r"[a W]_t = a^2 t"
                qv_value = sp.latex((data.a**2) * t)
                steps = [
                    rf"[aW]_t = a^2 [W]_t = {data.a**2}\,t",
                    r"[W]_t = t"
                ]

            elif data.process == "Shifted Brownian motion":
                display_formula = r"a W_t + b"
                qv_formula = r"[a W + b]_t = a^2 t"
                qv_value = sp.latex((data.a**2) * t)
                steps = [
                    rf"[a W_t + b]_t = a^2 [W]_t + [b]_t = {data.a**2}\,t + 0",
                    r"[W]_t = t, \quad [b]_t = 0"
                ]

            elif data.process == "Geometric Brownian motion":
                display_formula = r"e^{(\mu - \tfrac{1}{2}\sigma^2)t + \sigma W_t}"
                qv_formula = r"[X]_t = \int_0^t (\sigma X_s)^2 ds"
                qv_value = "Integral form only"
                steps = [
                    r"dX_t = \mu X_t dt + \sigma X_t dW_t",
                    r"\Rightarrow [X]_t = \int_0^t (\sigma X_s)^2 ds"
                ]

            else:
                return {
                    "mode": "analytical",
                    "params": data.dict(),
                    "formula": "N/A",
                    "qv_formula": "Not available analytically",
                    "qv_value": "N/A",
                    "steps": []
                }

            return {
                "mode": "analytical",
                "params": data.dict(),
                "formula": display_formula,  # 🔥 fórmula LaTeX lista
                "qv_formula": qv_formula,
                "qv_value": qv_value,
                "steps": steps
            }

        # -----------------------
        # MODO MONTE CARLO
        # -----------------------
        elif data.mode == "montecarlo":
            if data.N <= 0 or data.M <= 0 or data.T <= 0:
                return {"error": "Monte Carlo mode requires positive T, N, and M."}

            if data.N > 5000 or data.M > 200:
                return {
                    "error": "Too many steps/trajectories. "
                            "Please try with N ≤ 5000 and M ≤ 200."
                }

            dt = data.T / data.N
            sqrt_dt = np.sqrt(dt)

            dW = np.random.normal(0, sqrt_dt, size=(data.M, data.N))
            W_paths = np.cumsum(dW, axis=1)
            W_paths = np.hstack([np.zeros((data.M, 1)), W_paths])  # include W0 = 0

            if data.process == "Brownian motion":
                display_formula = r"W_t"
                X_paths = W_paths

            elif data.process == "Scaled Brownian motion":
                display_formula = r"a W_t"
                X_paths = data.a * W_paths

            elif data.process == "Shifted Brownian motion":
                display_formula = r"a W_t + b"
                X_paths = data.a * W_paths + data.b

            elif data.process == "Geometric Brownian motion":
                display_formula = r"e^{(\mu - \tfrac{1}{2}\sigma^2)t + \sigma W_t}"
                mu = data.mu or 0.05
                sigma = data.sigma or 0.2
                time_grid = np.linspace(0, data.T, data.N + 1)
                X_paths = np.exp((mu - 0.5 * sigma**2) * time_grid + sigma * W_paths)

            else:
                return {"error": f"Monte Carlo not implemented for {data.process}"}

            # Quadratic variation ≈ sum of squared increments
            qv_paths = np.cumsum(np.diff(X_paths, axis=1) ** 2, axis=1)
            qv_paths = np.hstack([np.zeros((data.M, 1)), qv_paths])

            mean_qv = qv_paths.mean(axis=0)
            max_traj = min(data.M, 50)

            chart_data = []
            for step in range(data.N + 1):
                row = {"step": step, "mean_qv": float(mean_qv[step])}
                for m in range(max_traj):
                    row[f"traj{m}"] = float(qv_paths[m, step])
                chart_data.append(row)

            return {
                "mode": "montecarlo",
                "params": data.dict(),
                "formula": display_formula,  # 🔥 fórmula LaTeX lista
                "chartData": chart_data,
                "trajectoriesShown": max_traj,
                "trajectoriesTotal": data.M
            }

        else:
            return {"error": f"Unknown mode: {data.mode}"}


    @staticmethod
    def compute_girsanov(data: GirsanovData):
        t, W, mu, sigma, mu_tilde = sp.symbols("t W mu sigma mu_tilde")

        # Validaciones básicas
        if data.sigma <= 0:
            return {"error": "σ must be positive."}

        if not data.mode:
            return {"error": "Mode must be provided."}

        # -----------------------
        # MODO ANALÍTICO
        # -----------------------
        if data.mode == "analytical":
            # θ = (μ - μ̃)/σ
            theta_val = (data.mu - data.mu_tilde) / data.sigma
            theta_expr = (mu - mu_tilde) / sigma

            # Radon–Nikodym derivative
            Z_t = sp.exp(-theta_expr * W - sp.Rational(1, 2) * theta_expr**2 * t)

            steps = [
                rf"dX_t = {data.mu} \, dt + {data.sigma} \, dW_t",
                rf"\theta = \frac{{\mu - \tilde{{\mu}}}}{{\sigma}} = \frac{{{data.mu} - {data.mu_tilde}}}{{{data.sigma}}} = {theta_val:.4f}",
                rf"W_t^Q = W_t + \theta t",
                rf"dX_t = {data.mu_tilde} \, dt + {data.sigma} \, dW_t^Q",
                rf"Z_t = \exp\Big(-\theta W_t - \tfrac{{1}}{{2}}\theta^2 t \Big)"
            ]

            return {
                "mode": "analytical",
                "params": data.dict(),
                "theta": theta_val,
                "process_P": rf"dX_t = {data.mu} \, dt + {data.sigma} \, dW_t",
                "process_Q": rf"dX_t = {data.mu_tilde} \, dt + {data.sigma} \, dW_t^Q",
                "radon_nikodym": sp.latex(Z_t),
                "steps": steps
            }

        # -----------------------
        # MODO MONTE CARLO
        # -----------------------
        elif data.mode == "montecarlo":
            if not data.T or not data.N or not data.M:
                return {"error": "Monte Carlo requires T, N, and M."}

            # Input limits
            if data.N > 5000 or data.M > 200:
                return {
                    "error": "Too many steps/trajectories. "
                            "Please try with N ≤ 5000 and M ≤ 200."
                }

            dt = data.T / data.N
            sqrt_dt = np.sqrt(dt)

            # Simulación de Brownian increments
            dW = np.random.normal(0, sqrt_dt, size=(data.M, data.N))
            W_paths = np.cumsum(dW, axis=1)
            W_paths = np.hstack([np.zeros((data.M, 1)), W_paths])  # incluir W0 = 0
            time_grid = np.linspace(0, data.T, data.N + 1)

            # θ
            theta_val = (data.mu - data.mu_tilde) / data.sigma

            # Trayectorias bajo P
            X_P = data.mu * time_grid + data.sigma * W_paths

            # Trayectorias bajo Q (ajustamos drift con Girsanov)
            W_Q = W_paths + theta_val * time_grid
            X_Q = data.mu_tilde * time_grid + data.sigma * W_Q

            # Datos para graficar (limitamos a 50 trayectorias)
            max_traj = min(data.M, 50)
            chart_data = []
            for step in range(data.N + 1):
                row = {"step": int(step), "time": float(time_grid[step])}
                for m in range(max_traj):
                    row[f"trajP_{m}"] = float(X_P[m, step])
                    row[f"trajQ_{m}"] = float(X_Q[m, step])
                chart_data.append(row)

            # Estadísticas al final (en T) para Q
            X_T = X_Q[:, -1]
            stats = {
                "mean": float(np.mean(X_T)),
                "variance": float(np.var(X_T)),
                "min": float(np.min(X_T)),
                "max": float(np.max(X_T)),
            }

            return {
                "mode": "montecarlo",
                "params": data.dict(),
                "theta": theta_val,
                "chartData": chart_data,
                "stats": stats,
                "trajectoriesShown": max_traj,
                "trajectoriesTotal": data.M,
            }

        else:
            return {"error": f"Unknown mode: {data.mode}"}
