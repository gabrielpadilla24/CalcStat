from sympy import symbols, diff, latex, sympify

# Solicitar entrada al usuario
expr_input = input("Ingresa la función a derivar (por ejemplo, x**2 + sin(x)): ")
var_input = input("Respecto a qué variable? (por ejemplo, x): ")

# Definir la variable simbólica
var = symbols(var_input)

# Convertir la entrada a una expresión simbólica
expr = sympify(expr_input)

# Calcular la derivada
derivada = diff(expr, var)

# Mostrar el resultado en formato LaTeX
print("La derivada en formato LaTeX es:")
print(latex(derivada))
