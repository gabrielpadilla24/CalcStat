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
