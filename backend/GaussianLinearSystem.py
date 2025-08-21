import re
import numpy as np
from typing import List, Dict, Tuple, Iterable, Any, Optional

class GaussianLinearSystem:
    """
    Resuelve sistemas lineales por Eliminación Gaussiana y genera LaTeX de la
    matriz aumentada [A|b]. Variables soportadas: x, y, z (en ese orden si aparecen).
    """

    def __init__(self, variables_order: Iterable[str] = ("x", "y", "z"), tol: float = 1e-10, collect_steps: bool = False):
        self.variables_order = list(variables_order)
        self.tol = tol
        self.collect_steps = collect_steps
        self.steps: List[str] = []

    # ---------- utilidades ----------
    def _log(self, M: Optional[np.ndarray], title: str) -> None:
        if not self.collect_steps:
            return
        if M is None:
            self.steps.append(f"\n--- {title} ---")
        else:
            np.set_printoptions(formatter={"float": "{: 0.4f}".format})
            self.steps.append(f"\n--- {title} ---\n{M}")
            np.set_printoptions(formatter=None)

    def _present_variables(self, equations: List[str]) -> List[str]:
        return [v for v in self.variables_order if any(v in eq for eq in equations)]

    def _parse_equations(self, equations: List[str]) -> Tuple[np.ndarray, np.ndarray, List[str]]:
        """
        Convierte ["2x+y=5", "x-y=1", ...] -> (A, b, variables_presentes)
        Suma coeficientes si una variable aparece repetida en una misma ecuación.
        """
        vars_present = self._present_variables(equations)
        if not vars_present:
            raise ValueError("No valid variables (x, y, z) found in the equations.")

        A_rows: List[List[float]] = []
        b_vals: List[float] = []

        for eq_str in equations:
            try:
                lhs, rhs = eq_str.split("=")
            except ValueError:
                raise ValueError(f"Invalid Format: '{eq_str}' (use 'ax+by= c').")

            lhs = lhs.replace(" ", "")
            rhs = rhs.strip()

            # acumula coeficientes por variable presente
            coeffs: Dict[str, float] = {v: 0.0 for v in vars_present}

            # Términos tipo [coef]var, con coef opcional (+, -, vacío)
            # restringimos a una sola letra a-z; luego filtramos por vars_present
            for coef_str, var in re.findall(r"([+-]?\d*\.?\d*)\s*([a-z])", lhs + "+"):
                if var not in coeffs:
                    continue
                if coef_str in ("", "+"):
                    c = 1.0
                elif coef_str == "-":
                    c = -1.0
                else:
                    c = float(coef_str)
                coeffs[var] += c

            try:
                b_val = float(rhs)
            except ValueError:
                raise ValueError(f"The constant term '{rhs}' must be numeric.")

            A_rows.append([coeffs[v] for v in vars_present])
            b_vals.append(b_val)

        A = np.array(A_rows, dtype=float)
        b = np.array(b_vals, dtype=float)
        return A, b, vars_present

    def _augmented_latex(self, A: np.ndarray, b: np.ndarray) -> str:
        """Genera LaTeX para la matriz aumentada [A|b]."""
        colfmt = "c" * A.shape[1] + "|c"
        lines = []
        for i in range(A.shape[0]):
            left = " & ".join(f"{A[i, j]:g}" for j in range(A.shape[1]))
            lines.append(f"    {left} & {b[i]:g}")
        body = " \\\\\n".join(lines)
        return "\\left[ \\begin{array}{" + colfmt + "}\n" + body + "\n\\end{array} \\right]"

    # ---------- algoritmo principal ----------
    def _gaussian_elimination(self, A: np.ndarray, b: np.ndarray) -> Tuple[str, Optional[np.ndarray]]:
        """
        RREF con pivoteo parcial. Devuelve ('unique'| 'no_unique', x_or_None).
        Soporta m×n (usa pivots=min(m,n)); si no hay pivote en algún paso -> no única.
        """
        M = np.concatenate((A, b.reshape(-1, 1)), axis=1).astype(float)
        m, n = A.shape
        pivots = min(m, n)

        self._log(M, "Initial Augmented Matrix")

        for i in range(pivots):
            # elegir pivote por valor absoluto máximo en columna i
            max_row = i + np.argmax(np.abs(M[i:, i]))
            M[[i, max_row]] = M[[max_row, i]]
            self._log(M, f"Step {i+1}.1: Swap row {i} ↔ {max_row}")

            pivot = M[i, i]
            if abs(pivot) < self.tol:
                self._log(M, f"Pivot ~ 0 in column {i} → system has no unique solution")
                return "no_unique", None

            # normalizar fila pivote
            M[i] = M[i] / pivot
            self._log(M, f"Step {i+1}.2: Normalize row {i}")

            # anular el resto de la columna
            for j in range(m):
                if j != i:
                    factor = M[j, i]
                    M[j] = M[j] - factor * M[i]
            self._log(M, f"Step {i+1}.3: Eliminate column {i}")

        # solución (tomamos las primeras n filas para n variables)
        if m < n:
            # sistema subdeterminado: no única
            return "no_unique", None

        x = M[:n, -1]  # n variables
        return "unique", x

    # ---------- API pública ----------
    def solve_from_strings(self, equations: List[str]) -> Dict[str, Any]:
        """
        Entrada: ecuaciones como strings 'ax+by= c'.
        Salida: dict con estado, solución, LaTeX de [A|b], variables y, opcionalmente, pasos.
        """
        A, b, vars_present = self._parse_equations(equations)
        coeffmatrix = self._augmented_latex(A, b)
        status, x = self._gaussian_elimination(A, b)

        result: Dict[str, Any] = {
            "status": "Success" if status == "unique" else "No unique solution",
            "variables": vars_present,
            "coeffmatrix": coeffmatrix,
            "solution": None,
            "solution_latex": None,
        }

        if status == "unique" and x is not None:
            solution_dict = {v: float(f"{val:.4f}") for v, val in zip(vars_present, x)}
            vars_col = " \\\\ ".join(vars_present)
            vals_col = " \\\\ ".join(f"{solution_dict[v]}" for v in vars_present)
            solution_latex = (
                "\\begin{bmatrix} " + vars_col + " \\end{bmatrix} = "
                "\\begin{bmatrix} " + vals_col + " \\end{bmatrix}"
            )
            result["solution"] = solution_dict
            result["solution_latex"] = solution_latex

        if self.collect_steps:
            result["steps"] = self.steps  # logs de matrices por paso

        return result

    def solve_from_lhs_rhs(self, items: Iterable[Any]) -> Dict[str, Any]:
        """
        Entrada alternativa: objetos con atributos/dict 'lhs' y 'rhs' (p.ej. Pydantic).
        """
        eq_strings: List[str] = []
        for it in items:
            lhs = getattr(it, "lhs", None) if not isinstance(it, dict) else it.get("lhs")
            rhs = getattr(it, "rhs", None) if not isinstance(it, dict) else it.get("rhs")
            if lhs is None or rhs is None:
                raise ValueError("Each item must have 'lhs' and 'rhs'.")
            eq_strings.append(f"{str(lhs)}={str(rhs)}")
        return self.solve_from_strings(eq_strings)
