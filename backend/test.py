from sympy import symbols, diff, Mul, Pow, Function, Symbol, Add
from sympy.parsing.sympy_parser import parse_expr
import sympy
from sympy.abc import x

def derivar_paso_a_paso(expr, variable):
    print(f"\nCalculando la derivada de {expr} con respecto a {variable}.")
    print("-" * 60)

    is_product = expr.func == Mul

    # --- Detección mejorada de la regla de la cadena ---
    is_chain_candidate = False

    # Caso general: funciones compuestas tipo sin(x**2), exp(2*x), etc.
    if isinstance(expr, Function) and expr.args and expr.args[0] != variable and expr.args[0].has(variable):
        is_chain_candidate = True
    elif isinstance(expr, Pow) and expr.base != variable and expr.base.has(variable):
        is_chain_candidate = True

    if is_product:
        print("El programa ha identificado que se debe aplicar la **REGLA DEL PRODUCTO**.")
        f_x = expr.args[0]
        g_x = expr.args[1]
        print(f"La función es de la forma $f(x) \\cdot g(x)$ donde:")
        print(f"  $f(x) = {f_x}$")
        print(f"  $g(x) = {g_x}$")
        print("-" * 60)

        print(f"Paso 1: Calculamos la derivada de $f(x) = {f_x}$:")
        df_dx = diff(f_x, variable)
        print(f"  $f'(x) = \\frac{{d}}{{d{variable}}} ({f_x}) = {df_dx}$")
        print("-" * 60)

        print(f"Paso 2: Calculamos la derivada de $g(x) = {g_x}$:")
        dg_dx = diff(g_x, variable)
        print(f"  $g'(x) = \\frac{{d}}{{d{variable}}} ({g_x}) = {dg_dx}$")
        print("-" * 60)

        print(f"Paso 3: Aplicamos la regla del producto: $(f \\cdot g)' = f' \\cdot g + f \\cdot g'$")
        print(f"  $({f_x} \\cdot {g_x})' = ({df_dx}) \\cdot ({g_x}) + ({f_x}) \\cdot ({dg_dx})$")
        termino1 = df_dx * g_x
        termino2 = f_x * dg_dx
        derivada_intermedia = Add(termino1, termino2, evaluate=False)

        print(f"  Término 1: ${termino1}$")
        print(f"  Término 2: ${termino2}$")
        print(f"  Sumando los términos: ${termino1} + {termino2}$")
        derivada_final_simplificada = derivada_intermedia.simplify()

        print("-" * 60)
        print(f"Paso 4: Simplificamos la expresión (si es posible):")
        print(f"  Derivada simplificada = ${derivada_final_simplificada}$")
        print("-" * 60)

        return derivada_final_simplificada

    elif is_chain_candidate:
        print("El programa ha identificado que se debe aplicar la **REGLA DE LA CADENA**.")
        print("La regla de la cadena se aplica a funciones compuestas, $h(g(x))$.")
        print("Su derivada es $h'(g(x)) \\cdot g'(x)$.")

        outer_func_obj = expr.func
        inner_expr = expr.args[0] if expr.args else None

        if inner_expr and inner_expr.has(variable) and inner_expr != variable:
            print(f"Para la función ${expr}$:")
            dummy_u = Symbol('u')
            outer_func_with_dummy = expr.subs(inner_expr, dummy_u)

            print(f"  Función externa: $h(u) = {outer_func_with_dummy}$")
            print(f"  Función interna: $u = g(x) = {inner_expr}$")
            print("-" * 60)

            print(f"Paso 1: Derivamos la función externa $h(u) = {outer_func_with_dummy}$:")
            dh_du = diff(outer_func_with_dummy, dummy_u)
            print(f"  $h'(u) = \\frac{{d}}{{du}} ({outer_func_with_dummy}) = {dh_du}$")
            print("-" * 60)

            h_prime_of_g_x = dh_du.subs(dummy_u, inner_expr)
            print(f"Paso 2: Sustituimos $u$ por $g(x) = {inner_expr}$:")
            print(f"  $h'(g(x)) = {h_prime_of_g_x}$")
            print("-" * 60)

            print(f"Paso 3: Derivamos la función interna $g(x) = {inner_expr}$:")
            dg_dx = diff(inner_expr, variable)
            print(f"  $g'(x) = \\frac{{d}}{{d{variable}}} ({inner_expr}) = {dg_dx}$")
            print("-" * 60)

            print(f"Paso 4: Multiplicamos $h'(g(x)) \\cdot g'(x)$:")
            derivada_final = h_prime_of_g_x * dg_dx
            print(f"  ${h_prime_of_g_x} \\cdot {dg_dx}$")
            print("-" * 60)

            derivada_final_simplificada = derivada_final.simplify()
            print(f"Paso 5: Simplificamos la expresión (si es posible):")
            print(f"  Derivada simplificada = ${derivada_final_simplificada}$")
            print("-" * 60)
            return derivada_final_simplificada
        else:
            print("No se pudo desglosar la regla de la cadena automáticamente.")
            derivada_final = diff(expr, variable)
            print(f"  Derivada directa = ${derivada_final}$")
            print("-" * 60)
            return derivada_final

    else:
        print("Parece ser una **derivada básica**.")
        derivada_final = diff(expr, variable)
        print(f"  $\\frac{{d}}{{d{variable}}} ({expr}) = {derivada_final}$")
        print("-" * 60)
        return derivada_final

# ---------------- INTERACTIVO ----------------
print("--- Calculadora de Derivadas con Regla del Producto/Cadena ---")
print("Usa 'x' como variable. Ejemplos:")
print("  Producto: x**2 * sin(x)")
print("  Cadena: sin(x**2), exp(3*x), (x+1)**4")

while True:
    try:
        func_str = input("\nIngresa la función a derivar (en términos de 'x'): ")
        func = parse_expr(func_str, local_dict={'x': x, 'sin': sympy.sin, 'cos': sympy.cos,
                                                'tan': sympy.tan, 'exp': sympy.exp,
                                                'log': sympy.log, 'sqrt': sympy.sqrt})
        resultado = derivar_paso_a_paso(func, x)
        print(f"\nLa derivada final de {func} es: {resultado}")
    except Exception as e:
        print(f"Error: {e}")
        print("Revisa la sintaxis. Recuerda usar '*' para multiplicar (ej: 2*x).")

    continuar = input("\n¿Quieres calcular otra derivada? (s/n): ").lower()
    if continuar != 's':
        break

print("¡Gracias por usar la calculadora de derivadas!")
