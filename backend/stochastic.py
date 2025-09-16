from pydantic import BaseModel
import numpy as np
import sympy as sp


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
        # Definir variables simbólicas
        t, x = sp.symbols("t x")

        # Parsear funciones de entrada
        f_expr = sp.sympify(data.f, locals={"t": t, "x": x})
        mu_expr = sp.sympify(data.mu, locals={"t": t, "x": x})
        sigma_expr = sp.sympify(data.sigma, locals={"t": t, "x": x})

        # Derivadas parciales
        f_t = sp.diff(f_expr, t)
        f_x = sp.diff(f_expr, x)
        f_xx = sp.diff(f_expr, x, 2)

        # Términos de Itô
        drift = f_t + mu_expr * f_x + sp.Rational(1, 2) * (sigma_expr**2) * f_xx
        diffusion = sigma_expr * f_x

        # Respuesta paso a paso
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
