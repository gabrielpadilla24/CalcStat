from pydantic import BaseModel
import numpy as np


class BrownianData(BaseModel):
    x0: float = 0.0
    mu: float = 0.0
    sigma: float = 1.0
    T: float = 1.0
    N: int = 1000
    M: int = 10


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
