import sympy
import re
from sympy.parsing.latex import parse_latex

def clean_latex_input(latex_string):
    """
    Elimina los caracteres de barra invertida seguidos de un espacio
    que se encuentran dentro de los corchetes {}.

    Args:
        latex_string (str): La expresión LaTeX de entrada.

    Returns:
        str: La expresión LaTeX limpia.
    """
    # Usa una expresión regular para encontrar y reemplazar "\ " dentro de {}
    # La expresión regular busca:
    # r'\{([^}]+)\}' -> Coincide con cualquier cosa dentro de {}
    # y luego reemplaza los espacios seguidos de \
    def replacer(match):
        # match.group(1) es el contenido dentro de los corchetes {}
        content = match.group(1)
        # Reemplaza los caracteres "\ " con ""
        cleaned_content = content.replace('\\ ', '')
        return f'{{{cleaned_content}}}'

    return re.sub(r'\{([^}]+)\}', replacer, latex_string)

def latex_to_sympy(latex_string):
    """
    Convierte una expresión LaTeX a su equivalente en SymPy.

    Args:
        latex_string (str): La expresión matemática en formato LaTeX.

    Returns:
        str: La expresión en formato SymPy.
    """
    try:
        # Primero, limpia la cadena de entrada
        cleaned_latex_string = clean_latex_input(latex_string)
        
        # Luego, usa parse_latex para convertir el string LaTeX a un objeto SymPy.
        sympy_expr = parse_latex(cleaned_latex_string)
        
        # Usa str() para obtener la representación de la expresión en SymPy como un string.
        return str(sympy_expr)
    except Exception as e:
        return f"Error al convertir la expresión: {e}"

# Solicita al usuario que introduzca una expresión LaTeX por consola
print("Introduce una expresión matemática en formato LaTeX (ej: \\frac{2x}{3x-1}):")
user_input = input(">> ")

# Llama a la función para convertir la entrada del usuario
sympy_result = latex_to_sympy(user_input)

# Muestra el resultado
print(f"\nLa expresión LaTeX que introdujiste: {user_input}")
print(f"Convertida a SymPy: {sympy_result}")