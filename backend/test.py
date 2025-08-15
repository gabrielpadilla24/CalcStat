def aproximar_limite_a_infinito(funcion, x_inicial, pasos, factor):
    """
    Aproxima el límite de una función cuando x tiende a infinito.

    Args:
        funcion: La función a evaluar (debe aceptar un solo argumento).
        x_inicial: El valor inicial de x.
        pasos: El número de iteraciones.
        factor: El factor por el que se incrementa x en cada paso.

    Returns:
        Una lista de tuplas con los valores de x y los resultados de la función.
    """
    resultados = []
    x = x_inicial
    for i in range(pasos):
        valor_funcion = funcion(x)
        resultados.append((x, valor_funcion))
        x *= factor
    return resultados

# Definimos la función de ejemplo
def mi_funcion(x):
    return (3*x**2 + 2*x - 1) / (x**2 + 5*x + 6)

# Parámetros para la aproximación
x_inicial = 1000  # Empezamos con un valor grande
pasos = 10        # Hacemos 10 evaluaciones
factor = 10       # Multiplicamos x por 10 en cada paso (1000, 10000, 100000, ...)

# Llamamos a la función de aproximación
valores_aproximados = aproximar_limite_a_infinito(mi_funcion, x_inicial, pasos, factor)

# Imprimimos los resultados
print("Aproximación numérica del límite de f(x) cuando x -> ∞")
print("-" * 50)
for x, y in valores_aproximados:
    print(f"Para x = {x:,.0f}, f(x) = {y:.8f}")
print("-" * 50)
print(f"El valor se aproxima a {valores_aproximados[-1][1]:.8f}, lo que sugiere un límite de 3.0")