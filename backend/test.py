import re
import numpy as np

def sistema_a_matriz(sistema):
    """
    Convierte un sistema de ecuaciones lineales en su representación matricial (A, b).
    Args:
        sistema (list[str]): Lista de ecuaciones como strings.
    Returns:
        tuple: (A, b) donde A es la matriz de coeficientes y b el vector de términos independientes.
    """
    # Extraer todas las variables presentes
    variables = set()
    for eq in sistema:
        variables.update(re.findall(r'[a-zA-Z]+', eq.split('=')[0]))
    variables = sorted(list(variables))

    A = []
    b = []
    for eq in sistema:
        coef = [0] * len(variables)
        # Buscar coeficientes de cada variable
        for i, var in enumerate(variables):
            # Coincidencias de coeficiente y variable
            matches = re.findall(r'([+-]?\s*\d*\.?\d*)\s*' + var, eq)
            total = 0
            for m in matches:
                m = m.replace(' ', '')
                if m in ['', '+', '-']:
                    m = m + '1' if m in ['+', '-'] else '1'
                total += float(m)
            coef[i] = total
        # Extraer término independiente
        rhs = eq.split('=')[1]
        b.append(float(rhs.strip()))
        A.append(coef)
    return np.array(A), np.array(b)

# Ejemplo de uso:
sistema = [
    "2x + 3y = 5",
    "-x + 4y = 6"
]
A, b = sistema_a_matriz(sistema)
print("A =", A)
print("b =", b)