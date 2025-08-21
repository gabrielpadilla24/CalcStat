import re

def generar_matriz_latex(ecuaciones):
    """
    Convierte un sistema de ecuaciones lineales en una cadena de LaTeX para una matriz aumentada [A|b]
    con columnas en orden x, y, z (solo las que existan) y la última columna como el término independiente b.
    Las filas corresponden a las ecuaciones en el orden dado.
    """
    # 1) Variables en orden fijo x, y, z pero solo las que aparezcan
    variables = [v for v in ['x', 'y', 'z'] if any(v in eq for eq in ecuaciones)]
    if not variables:
        return r"\left[\,\right]"  # vacío seguro

    matriz = []

    # 2) Extraer coeficientes por ecuación
    for ecuacion in ecuaciones:
        partes = ecuacion.split("=")
        if len(partes) != 2:
            raise ValueError(f"Ecuación inválida: '{ecuacion}' (debe tener '=')")
        lado_izquierdo = partes[0].replace(" ", "")
        constante_str = partes[1].strip()

        # Coeficientes en orden x, y, z (solo presentes)
        fila = []
        for var in variables:
            # Busca el primer término con esa variable (coef opcional + signo)
            pattern = rf'([+-]?\d*\.?\d*){var}(?:[^a-zA-Z]|$)'
            match = re.search(pattern, lado_izquierdo)
            if match:
                coef_str = match.group(1)
                if coef_str in ("", "+"):
                    coef = 1.0
                elif coef_str == "-":
                    coef = -1.0
                else:
                    coef = float(coef_str)
            else:
                coef = 0.0
            fila.append(coef)

        # Término independiente al final (columna b)
        try:
            b = float(constante_str)
        except ValueError:
            raise ValueError(f"El término constante '{constante_str}' no es un número válido.")
        fila.append(b)

        matriz.append(fila)

    # 3) Construir LaTeX: columnas = len(variables) + 1 (b)
    column_format = "c" * len(variables) + "|c"
    filas_latex = []
    for fila in matriz:
        coefs = " & ".join(f"{v:g}" for v in fila[:-1])  # A
        b = f"{fila[-1]:g}"                              # b
        filas_latex.append(f"    {coefs} & {b}")

    body = " \\\\\n".join(filas_latex)
    latex_string = (
        "\\left[ \\begin{array}{" + column_format + "}\n" +
        body + "\n" +
        "\\end{array} \\right]"
    )
    return latex_string

# Ejemplo:
ecuaciones = ["2x+3y=54", "x+y=5", "4x+z=10"]
print(generar_matriz_latex(ecuaciones))
