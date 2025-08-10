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












# from sympy import (
#     symbols, diff, simplify, Eq, S, limit, Abs, Piecewise,
#     solveset, singularities, piecewise_fold
# )

# x = symbols("x")

# # --- util: puntos no diferenciables pero con f continua ---
# def nondifferentiable_points(f, x):
#     fprime = diff(f, x)

#     # 1) candidatos: singularidades de f'
#     cand = set()
#     try:
#         cand |= set(singularities(fprime, x, domain=S.Reals))
#     except Exception:
#         pass

#     # 2) candidatos: ceros de argumentos de Abs(...)
#     for g in f.atoms(Abs):
#         arg = g.args[0]
#         try:
#             sols = solveset(Eq(arg, 0), x, domain=S.Reals)
#             if sols.is_FiniteSet:
#                 cand |= set(sols)
#         except Exception:
#             pass

#     # 3) candidatos: fronteras de Piecewise (cambios de régimen)
#     pw = piecewise_fold(f)
#     if isinstance(pw, Piecewise):
#         for _, condset in pw.as_expr_set_pairs():
#             try:
#                 bd = condset.boundary
#                 if getattr(bd, "is_FiniteSet", False):
#                     cand |= set(bd)
#                 else:
#                     # extremos de intervalos si existen
#                     for it in getattr(bd, "args", ()):
#                         for end in getattr(it, "endpoints", ()):
#                             if getattr(end, "is_real", False):
#                                 cand.add(end)
#             except Exception:
#                 pass

#     # Filtra reales finitos
#     cand = [c for c in cand if getattr(c, "is_real", False)]

#     nd_points = []
#     for c in cand:
#         # continuidad de f en c
#         try:
#             Lp = limit(f, x, c, dir="+")
#             Lm = limit(f, x, c, dir="-")
#             is_cont = Lp.is_finite and Lm.is_finite and Lp.equals(Lm)
#             if not is_cont:
#                 continue
#         except Exception:
#             continue

#         # derivadas laterales
#         try:
#             fp_plus = limit(fprime, x, c, dir="+")
#             fp_minus = limit(fprime, x, c, dir="-")
#             if (fp_plus.is_finite and fp_minus.is_finite and not fp_plus.equals(fp_minus)) \
#                or (not fp_plus.is_finite) or (not fp_minus.is_finite):
#                 nd_points.append(c)
#         except Exception:
#             # si no se pudieron evaluar límites pero hay singularidad en f'
#             # y f es continua, lo consideramos no diferenciable
#             nd_points.append(c)

#     # ordena y dedup
#     try:
#         nd_points = sorted(set(nd_points), key=lambda z: float(z))
#     except Exception:
#         nd_points = list(dict.fromkeys(nd_points))
#     return nd_points


# @app.post("/criticalpoints")
# def compute_critical_points(data: CriticalPointsData):
#     expr = parse_latex(clean_latex_input(data.equation.strip()))

#     # derivadas
#     primera_derivada = simplify(diff(expr, x))
#     segunda_derivada = simplify(diff(primera_derivada, x))

#     # críticos por f'(x)=0
#     try:
#         crit_zero = solveset(Eq(primera_derivada, 0), x, domain=S.Reals)
#         if getattr(crit_zero, "is_FiniteSet", False):
#             crit_zero_list = list(crit_zero)
#         else:
#             # si es Interval/EmptySet/etc.
#             crit_zero_list = []
#     except Exception:
#         # fallback con solve (menos robusto)
#         crit_zero_list = sympy.solve(primera_derivada, x)
#         # filtra reales
#         crit_zero_list = [c for c in crit_zero_list if getattr(c, "is_real", False)]

#     # críticos por no diferenciabilidad (f continua)
#     nd_list = nondifferentiable_points(expr, x)

#     # merge + stringify
#     all_crit = list(dict.fromkeys(crit_zero_list + nd_list))
#     try:
#         all_crit = sorted(all_crit, key=lambda z: float(z))
#     except Exception:
#         pass

#     return {
#         "original": data.equation,
#         "first_derivative": str(primera_derivada),
#         "second_derivative": str(segunda_derivada),
#         "critical_points": [str(cp) for cp in all_crit],  # incluye f'(x)=0 y no diferenciables
#         "inflection_points": [],
#         "second_derivative_classification": "",
#         "absolute_extrema": {"max": None, "min": None},
#     }
