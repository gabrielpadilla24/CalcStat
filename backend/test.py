from sympy import symbols, diff, sympify, sin, cos, tan, cot, sec, csc

def derivative_calculator(expr_str, var_str):
    x = symbols(var_str)
    expr = sympify(expr_str)
    derivative = diff(expr, x)
    return derivative

if __name__ == "__main__":
    expr_input = input("Enter the expression (e.g., sin(x) + x**2): ")
    var_input = input("Enter the variable (e.g., x): ")
    result = derivative_calculator(expr_input, var_input)
    print(f"The derivative of {expr_input} with respect to {var_input} is:\n{result}")