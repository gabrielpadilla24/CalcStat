import re
import numpy as np

def print_matrix(M: np.ndarray, step_name: str):
    """
    Imprime la matriz con un encabezado descriptivo para cada paso.
    """
    print(f"\n--- {step_name} ---")
    # Formato de impresión para mejorar la legibilidad de los números
    np.set_printoptions(formatter={'float': '{: 0.4f}'.format})
    print(M)
    np.set_printoptions(formatter=None) # Restablece el formato

def solve_linear_system(equations: list[str]):
    """
    Analiza un sistema de ecuaciones lineales y lo resuelve usando la eliminación gaussiana.

    Args:
        equations (list): Una lista de cadenas, donde cada cadena es una ecuación.

    Returns:
        dict: Un diccionario con el estado del proceso y la solución.
    """
    # 1. Analizar las ecuaciones para construir las matrices A y b
    
    # Variables en un orden fijo: x, y, z
    variables = ['x', 'y', 'z']
    
    # Encontrar qué variables están realmente en el sistema
    # Se ha corregido la lógica para que sea más robusta y no dependa de los límites de palabra (\b)
    present_variables = [v for v in variables if any(v in eq for eq in equations)]
    if not present_variables:
        return {
            "status": "Error",
            "message": "No se encontraron variables válidas (x, y, z) en las ecuaciones.",
            "solution": None
        }

    A_rows = []
    b_vector = []
    
    print("\n--- Analizando Ecuaciones ---")
    for eq_str in equations:
        try:
            lhs, rhs = eq_str.split('=')
            lhs = lhs.replace(" ", "") # Eliminar espacios para un análisis más simple
            rhs = rhs.strip()
        except ValueError:
            print(f"Error: La ecuación '{eq_str}' no tiene el formato correcto (ej. ax+by=c).")
            return {
                "status": "Error",
                "message": f"Formato de ecuación inválido: '{eq_str}'",
                "solution": None
            }
        
        # Nueva lógica de análisis para mayor robustez
        # Usamos un diccionario para manejar la suma de coeficientes si se repiten las variables
        current_coeffs = {var: 0.0 for var in present_variables}
        
        # Expresión regular para encontrar todos los términos (coeficiente y variable)
        # Se ha corregido para capturar coeficientes al inicio de la cadena o sin signo
        pattern = r"([+-]?\d*\.?\d*)\s*([a-z])"
        
        # Buscar todas las coincidencias en el lado izquierdo de la ecuación
        matches = re.findall(pattern, lhs + "+") # Agregar un '+' temporal para capturar el último término
        
        # Procesar las coincidencias
        for coef_str, var in matches:
            if var in current_coeffs:
                # Determinar el valor numérico del coeficiente
                if coef_str == '':
                    total_coeff = 1.0
                elif coef_str == '+':
                    total_coeff = 1.0
                elif coef_str == '-':
                    total_coeff = -1.0
                else:
                    total_coeff = float(coef_str)
                current_coeffs[var] += total_coeff

        # Extraer el término constante
        try:
            constant = float(rhs)
        except ValueError:
            print(f"Error: El término constante '{rhs}' no es un número válido.")
            return {
                "status": "Error",
                "message": f"El término constante '{rhs}' debe ser numérico.",
                "solution": None
            }
            
        # Ordenar los coeficientes según las variables presentes
        A_rows.append([current_coeffs[v] for v in present_variables])
        b_vector.append(constant)
    
    A = np.array(A_rows, dtype=float)
    b = np.array(b_vector, dtype=float)
    
    # 2. Unir A y b en la matriz aumentada
    M = np.concatenate((A, b.reshape(-1, 1)), axis=1)
    n = len(M)
    
    # Imprimir la matriz inicial
    print("\n--- Matriz Aumentada Inicial ---")
    print(M)
    
    # 3. Fase 1: Eliminación Gaussiana
    for i in range(n):
        # Pivoteo Parcial: Encontrar la fila con el valor absoluto más grande
        max_row = i
        for k in range(i + 1, n):
            if abs(M[k, i]) > abs(M[max_row, i]):
                max_row = k
        M[[i, max_row]] = M[[max_row, i]]
        print_matrix(M, f"Paso {i+1}.1: Intercambio de fila {i} con fila {max_row}")

        pivot = M[i, i]
        if abs(pivot) < 1e-10: # Tolerancia para flotantes
            return {
                "status": "No unique solution",
                "message": f"No hay una solución única. El pivote en la columna {i} es casi cero.",
                "solution": None
            }
        
        # Normalizar la fila del pivote
        M[i] = M[i] / pivot
        print_matrix(M, f"Paso {i+1}.2: Normalizar fila {i}")

        # Eliminar las entradas debajo y arriba del pivote
        for j in range(n):
            if i != j:
                factor = M[j, i]
                M[j] -= factor * M[i]
        print_matrix(M, f"Paso {i+1}.3: Eliminación de columna {i}")

    # 4. Fase 2: Obtener la solución (la matriz ya está en forma reducida)
    x = M[:, -1]
    solution_dict = {f"{var}": float(f"{val:.4f}") for var, val in zip(present_variables, x)}
    
    print("\n--- Resultado Final ---")
    print("El sistema resuelto es:")
    for var, val in solution_dict.items():
        print(f"  {var} = {val}")

    return {
        "status": "Success",
        "message": "Solución encontrada exitosamente.",
        "solution": solution_dict
    }

# --- Ejemplo de uso ---
# Ejemplo 1: Un sistema resoluble con 3 variables
print("\n" + "="*50)
print("Resolviendo Ejemplo 1: 3 variables")
eqs1 = [
    "2x+y-z=8",
    "-3x-y+2z=-11",
    "-2x+y+2z=-3"
]
result1 = solve_linear_system(eqs1)
print(result1)

# Ejemplo 2: Un sistema con 2 variables para demostrar la flexibilidad
print("\n" + "="*50)
print("Resolviendo Ejemplo 2: 2 variables")
eqs2 = [
    "x+y=5",
    "2x-3y=15"
]
result2 = solve_linear_system(eqs2)
print(result2)

# Ejemplo 3: Un sistema con una solución no única
print("\n" + "="*50)
print("Resolviendo Ejemplo 3: Sin solución única")
eqs3 = [
    "x+2y=5",
    "2x+4y=10"
]
result3 = solve_linear_system(eqs3)
print(result3)
