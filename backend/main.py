from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from math import pow
import numpy_financial as npf
import numpy as np
from typing import Literal, Optional, List
from sympy import symbols, diff, simplify, Mul, Pow, Function, Symbol, Add, sin, cos, tan, log, exp, sqrt
from sympy.parsing.sympy_parser import parse_expr
import sympy
from sympy import latex as sympy_latex
from sympy.parsing.latex import parse_latex
import re



app = FastAPI()

# -----------------------------
# CONFIGURACIÓN CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# MODELOS
# -----------------------------
class ExponentialData(BaseModel):
    initialValue: float
    growthRate: float
    time: float
    addConstant: bool
    constantValue: float
    frequency: str  # "Yearly" o "Monthly"

class FixedRateData(BaseModel):
    homePrice: float
    downPayment: float
    interestRate: float  # anual en %
    duration: int        # años

class ARMData(BaseModel):
    homePrice: float
    downPayment: float
    initialRate: float   # tasa inicial anual en %
    armType: str         # Ej: "5/1", "7/6", etc.
    loanTerm: int        # duración del préstamo en años

class InterestOnlyData(BaseModel):
    homePrice: float
    downPayment: float
    interestRate: float       # anual en %
    interestOnlyPeriod: int   # años
    totalTerm: int            # años

class BalloonPaymentData(BaseModel):
    homePrice: float
    downPayment: float
    interestRate: float  # anual en %
    loanTerm: int        # duración total del préstamo en años
    balloonYear: int     # año en que se hace el pago final


class RefinanceData(BaseModel):
    currentMonthlyPayment: float
    balanceLeft: float
    remainingTermYears: int
    currentRate: float
    newRate: float
    newTermYears: int
    closingCosts: float

class RefinanceScoreData(BaseModel):
    monthlySavings: float
    interestSavings: float
    oldTermMonths: int
    newTermMonths: int
    originalWasBetter: bool
    priority: str  # "debt" o "monthly"


class ReverseMortgageData(BaseModel):
    homeEquity: float
    years: int
    interestRate: float  # porcentaje anual
    type: Literal["Lump Sum", "Monthly Advance"]
    lumpSum: Optional[float] = None
    monthlyAdvance: Optional[float] = None

class NPVData(BaseModel):
    futureValue: float
    years: int
    interestRate: float  # porcentaje anual

class NPVSequenceData(BaseModel):
    cashFlows: List[float]
    interestRate: float  # porcentaje anual

class IRRData(BaseModel):
    cashFlows: List[int]

class SavingsData(BaseModel):
    goal: float
    years: int
    interest_rate: float  # porcentaje anual

class GrowthComparisonData(BaseModel):
    initial_amount: float
    years: int
    interest_rates: List[float]

class DerivativeRequest(BaseModel):
    equation: str

class CriticalPointsData(BaseModel):
    equation: str

# -----------------------------
# ENDPOINT DE INTERÉS COMPUESTO
# -----------------------------
@app.post("/compoundinterest")
def calcular_compound(data: ExponentialData):
    valores = [round(data.initialValue, 2)]  # Año 0
    aportes = [round(data.initialValue, 2)]
    capital = data.initialValue
    total_aportado = round(data.initialValue, 2)

    for año in range(1, int(data.time) + 1):
        capital *= (1 + data.growthRate / 100)

        if data.addConstant:
            if data.frequency == "Yearly":
                total_aportado += data.constantValue
                capital += data.constantValue
            elif data.frequency == "Monthly":
                total_aportado += data.constantValue * 12
                capital += data.constantValue * 12

        valores.append(round(capital, 2))
        aportes.append(round(total_aportado, 2))

    resultado_final = round(capital, 2)

    return {
        "resultado": resultado_final,
        "valoresPorAño": valores,
        "aportesPorAño": aportes,
    }

# -----------------------------
# ENDPOINT DE HIPOTECA A TASA FIJA
# -----------------------------
@app.post("/fixedrate")
def calcular_fixed_rate(data: FixedRateData):
    loan_amount = data.homePrice - data.downPayment
    annual_rate = data.interestRate / 100
    monthly_rate = annual_rate / 12
    total_payments = data.duration * 12

    if monthly_rate == 0:
        monthly_payment = loan_amount / total_payments
    else:
        monthly_payment = loan_amount * (monthly_rate * (1 + monthly_rate) ** total_payments) / \
                          ((1 + monthly_rate) ** total_payments - 1)

    principal_paid = [0.0]
    interest_paid = [0.0]
    loan_balance = [round(loan_amount, 2)]

    balance = loan_amount
    yearly_principal = 0
    yearly_interest = 0
    acum_principal = 0
    acum_interest = 0

    for month in range(1, total_payments + 1):
        interest = balance * monthly_rate
        principal = monthly_payment - interest
        balance -= principal

        yearly_principal += principal
        yearly_interest += interest

        if month % 12 == 0 or month == total_payments:
            acum_principal += yearly_principal
            acum_interest += yearly_interest

            principal_paid.append(round(acum_principal, 2))
            interest_paid.append(round(acum_interest, 2))
            loan_balance.append(round(balance if balance > 0 else 0, 2))

            yearly_principal = 0
            yearly_interest = 0

    return {
        "monthlyPayment": round(monthly_payment, 2),
        "loanAmount": round(loan_amount, 2),
        "totalPayments": total_payments,
        "monthlyRate": round(monthly_rate * 100, 4),
        "principalPaid": principal_paid,
        "interestPaid": interest_paid,
        "loanBalance": loan_balance,
    }

# -----------------------------
# ENDPOINT DE HIPOTECA TIPO ARM
# -----------------------------
@app.post("/arm")
def calcular_arm(data: ARMData):
    loan_amount = data.homePrice - data.downPayment
    annual_rate = data.initialRate / 100
    monthly_rate = annual_rate / 12
    total_payments = data.loanTerm * 12

    # Obtener años fijos desde el tipo ARM (ej. "5/1", "7/6")
    fixed_years = int(data.armType.split("/")[0])
    fixedYearsMessage = (
        f"The monthly payment applies to the first {fixed_years} years only."
    )

    if monthly_rate == 0:
        monthly_payment = loan_amount / total_payments
    else:
        monthly_payment = loan_amount * (monthly_rate * (1 + monthly_rate) ** total_payments) / \
                          ((1 + monthly_rate) ** total_payments - 1)

    principal_paid = [0.0]
    interest_paid = [0.0]
    loan_balance = [round(loan_amount, 2)]

    balance = loan_amount
    yearly_principal = 0
    yearly_interest = 0
    acum_principal = 0
    acum_interest = 0

    for month in range(1, total_payments + 1):
        interest = balance * monthly_rate
        principal = monthly_payment - interest
        balance -= principal

        yearly_principal += principal
        yearly_interest += interest

        if month % 12 == 0 or month == total_payments:
            acum_principal += yearly_principal
            acum_interest += yearly_interest

            principal_paid.append(round(acum_principal, 2))
            interest_paid.append(round(acum_interest, 2))
            loan_balance.append(round(balance if balance > 0 else 0, 2))

            yearly_principal = 0
            yearly_interest = 0

    return {
        "monthlyPayment": round(monthly_payment, 2),
        "loanAmount": round(loan_amount, 2),
        "totalPayments": total_payments,
        "monthlyRate": round(monthly_rate * 100, 4),
        "principalPaid": principal_paid,
        "interestPaid": interest_paid,
        "loanBalance": loan_balance,
        "fixedYearsMessage": fixedYearsMessage,
    }

# -----------------------------
# ENDPOINT DE HIPOTECA INTEREST ONLY
# -----------------------------
@app.post("/interestonly")
def calcular_interest_only(data: InterestOnlyData):
    loan_amount = data.homePrice - data.downPayment
    annual_rate = data.interestRate / 100
    monthly_rate = annual_rate / 12

    interest_only_months = data.interestOnlyPeriod * 12
    total_months = data.totalTerm * 12
    remaining_months = total_months - interest_only_months

    # -----------------------------
    # Pago mensual durante periodo de solo intereses
    # -----------------------------
    interest_only_payment = round(loan_amount * monthly_rate, 2)

    # -----------------------------
    # Pago mensual después del periodo de interés (como FRM con plazo reducido)
    # -----------------------------
    if monthly_rate == 0 or remaining_months == 0:
        fixed_payment_after = loan_amount / remaining_months if remaining_months else 0
    else:
        fixed_payment_after = loan_amount * (monthly_rate * (1 + monthly_rate) ** remaining_months) / \
            ((1 + monthly_rate) ** remaining_months - 1)

    fixed_payment_after = round(fixed_payment_after, 2)

    # -----------------------------
    # Simular amortización total para gráfico
    # -----------------------------
    balance = loan_amount
    principal_paid = [0.0]
    interest_paid = [0.0]
    loan_balance = [round(balance, 2)]

    acum_principal = 0.0
    acum_interest = 0.0
    yearly_principal = 0.0
    yearly_interest = 0.0

    for month in range(1, total_months + 1):
        if month <= interest_only_months:
            interest = balance * monthly_rate
            principal = 0.0
        else:
            interest = balance * monthly_rate
            principal = fixed_payment_after - interest
            balance -= principal
            if balance < 0:
                balance = 0.0

        yearly_interest += interest
        yearly_principal += principal

        if month % 12 == 0 or month == total_months:
            acum_principal += yearly_principal
            acum_interest += yearly_interest

            principal_paid.append(round(acum_principal, 2))
            interest_paid.append(round(acum_interest, 2))
            loan_balance.append(round(balance, 2))

            yearly_interest = 0.0
            yearly_principal = 0.0

    return {
        "interestOnlyPayment": interest_only_payment,
        "fixedPaymentAfter": fixed_payment_after,
        "monthlyRate": round(monthly_rate * 100, 4),
        "loanAmount": round(loan_amount, 2),
        "totalPayments": total_months,
        "principalPaid": principal_paid,
        "interestPaid": interest_paid,
        "loanBalance": loan_balance,
    }

# -----------------------------
# ENDPOINT DE HIPOTECA BALLOON
# -----------------------------
@app.post("/balloon")
def calcular_balloon_payment(data: BalloonPaymentData):
    loan_amount = data.homePrice - data.downPayment
    annual_rate = data.interestRate / 100
    monthly_rate = annual_rate / 12

    total_months = data.loanTerm * 12
    balloon_month = data.balloonYear * 12

    if balloon_month >= total_months:
        return {
            "error": "Balloon year must be less than the total loan term."
        }

    if monthly_rate == 0:
        monthly_payment = loan_amount / total_months
    else:
        monthly_payment = loan_amount * (monthly_rate * (1 + monthly_rate) ** total_months) / \
                          ((1 + monthly_rate) ** total_months - 1)

    principal_paid = [0.0]
    interest_paid = [0.0]
    loan_balance = [round(loan_amount, 2)]

    balance = loan_amount
    yearly_principal = 0.0
    yearly_interest = 0.0
    acum_principal = 0.0
    acum_interest = 0.0

    for month in range(1, balloon_month + 1):
        interest = balance * monthly_rate
        principal = monthly_payment - interest
        balance -= principal

        yearly_principal += principal
        yearly_interest += interest

        if month == balloon_month:
            yearly_principal += balance
            balance = 0.0

        if month % 12 == 0 or month == balloon_month:
            acum_principal += yearly_principal
            acum_interest += yearly_interest

            principal_paid.append(round(acum_principal, 2))
            interest_paid.append(round(acum_interest, 2))
            loan_balance.append(round(balance, 2))

            yearly_principal = 0.0
            yearly_interest = 0.0

    # 💥 Aquí sacamos el balloon payment final del último mes
    balloon_payment = round(principal_paid[-1] - principal_paid[-2], 2)

    return {
        "monthlyPayment": round(monthly_payment, 2),
        "loanAmount": round(loan_amount, 2),
        "monthlyRate": round(monthly_rate * 100, 4),
        "principalPaid": principal_paid,
        "interestPaid": interest_paid,
        "loanBalance": loan_balance,
        "secondPayment": balloon_payment  # 👈 necesario para que aparezca la pestaña
    }


# ------------------------------
# ENDPOINT DE REFINANCE MORTGAGE
# ------------------------------

def calculate_advanced_refinance_score(
    monthly_savings,
    difference_in_interest,
    n_remaining,
    n_new,
    balance_left,
    closing_costs,
    current_monthly_payment,
    new_monthly_payment,
    months_to_recoup
):
    # -------- NPV ----------
    discount_rate = 0.004  # ~4.8% anual
    npv = sum([
        monthly_savings / ((1 + discount_rate) ** t)
        for t in range(1, n_new + 1)
    ]) - closing_costs

    if npv <= 0:
        score_npv = 0
    elif npv < 0.2 * balance_left:
        score_npv = (npv / (0.2 * balance_left)) * 100
    else:
        score_npv = 100

    # -------- IRR ----------
    cash_flows = [-closing_costs] + [monthly_savings] * n_new
    irr_value = npf.irr(cash_flows)  # mensual

    if irr_value is None or np.isnan(irr_value) or irr_value <= 0:
        irr_annual = -1
    
    else:
        irr_annual = (1 + irr_value) ** 12 - 1

    if irr_annual <= 0:
        score_irr = 0
    elif irr_annual < 0.08:
        score_irr = (irr_annual / 0.08) * 100
    else:
        score_irr = 100


    valor_financiero_total = 0.5 * score_npv + 0.5 * score_irr


    # -------- Liquidez Mensual ----------
    delta_m = (new_monthly_payment - current_monthly_payment) / current_monthly_payment

    if delta_m >= 0.10:
        score_liquidez = 0
    elif delta_m <= -0.20:
        score_liquidez = 100
    else:
        score_liquidez = (abs(delta_m) / 0.20) * 100

    # -------- Eficiencia Temporal ----------
    delta_term_years = (n_new - n_remaining) / 12
    break_even_years = months_to_recoup / 12 if months_to_recoup else float('inf')

    score_eficiencia = 100 - 10 * delta_term_years - 5 * max(0, break_even_years - 2)
    score_eficiencia = max(0, score_eficiencia)

    # -------- Score Final ----------
    refinance_score = (
        0.4 * valor_financiero_total +
        0.3 * score_liquidez +
        0.3 * score_eficiencia
    )

    return round(refinance_score, 2)

@app.post("/refinance")
def calcular_refinance(data: RefinanceData):


    r_current = data.currentRate / 100 / 12
    r_new = data.newRate / 100 / 12
    n_remaining = data.remainingTermYears * 12
    n_new = data.newTermYears * 12
    balance = data.balanceLeft
    closing_costs = data.closingCosts

    remaining_original_cost = data.currentMonthlyPayment * n_remaining

    new_monthly_payment = balance * (r_new * pow(1 + r_new, n_new)) / (pow(1 + r_new, n_new) - 1)
    total_cost_refinanced = new_monthly_payment * n_new + closing_costs

    difference_in_interest = remaining_original_cost - total_cost_refinanced
    monthly_savings = data.currentMonthlyPayment - new_monthly_payment
    months_to_recoup = closing_costs / monthly_savings if monthly_savings > 0 else None

    cumulative_original = [
        round(data.currentMonthlyPayment * (i + 1), 2) for i in range(n_remaining)
    ]
    cumulative_refinanced = [
        round(new_monthly_payment * (i + 1), 2) for i in range(n_new)
    ]

    # Agrupar por año (cada 12 meses)
    def agrupar_por_anio(data: list) -> list:
        return [round(data[i * 12 + 11], 2) for i in range(len(data) // 12)]

    grouped_original = agrupar_por_anio(cumulative_original)
    grouped_refinanced = agrupar_por_anio(cumulative_refinanced)

    max_len = max(len(grouped_original), len(grouped_refinanced))
    grouped_original += [None] * (max_len - len(grouped_original))
    grouped_refinanced += [None] * (max_len - len(grouped_refinanced))

    # ✅ Calcular refinanceScore simple balanceando factores
    refinance_score = calculate_advanced_refinance_score(
        monthly_savings,
        difference_in_interest,
        n_remaining,
        n_new,
        balance,
        closing_costs,
        data.currentMonthlyPayment,
        new_monthly_payment,
        months_to_recoup
    )


    return {
        "newMonthlyPayment": round(new_monthly_payment, 2),
        "monthlySavings": round(monthly_savings, 2),
        "differenceInInterest": round(difference_in_interest, 2),
        "totalCost": round(closing_costs, 2),
        "monthsToRecoupCosts": months_to_recoup,
        "cumulativeOriginal": cumulative_original,
        "cumulativeRefinanced": cumulative_refinanced,
        "groupedOriginal": grouped_original,
        "groupedRefinanced": grouped_refinanced,
        "refinanceScore": refinance_score  # ✅ agregado aquí
    }


#---------------------------------
# ENDPOINT DE REVERSE MORTGAGE
#---------------------------------

@app.post("/reverse-mortgage")
def calcular_reverse_mortgage(data: ReverseMortgageData):
    annual_rate = data.interestRate / 100
    years = data.years
    home_equity = data.homeEquity
    yearly_debt: List[float] = []
    amount_owed = 0.0

    if data.type == "Lump Sum":
        if data.lumpSum is None:
            return {"error": "Missing 'lumpSum' value for Lump Sum type."}
        amount_owed = data.lumpSum
        for _ in range(years):
            amount_owed *= (1 + annual_rate)
            yearly_debt.append(round(amount_owed, 2))

    elif data.type == "Monthly Advance":
        if data.monthlyAdvance is None:
            return {"error": "Missing 'monthlyAdvance' value for Monthly Advance type."}
        for year in range(1, years + 1):
            debt = 0.0
            for t in range(year):
                payment = data.monthlyAdvance * 12
                debt += payment * ((1 + annual_rate) ** (year - t - 1))
            yearly_debt.append(round(debt, 2))
        amount_owed = yearly_debt[-1]

    else:
        return {"error": "Invalid payout type."}

    if amount_owed > home_equity:
        return {
            "error": "Projected owed amount exceeds home equity.",
            "homeEquity": round(home_equity, 2),
            "amountOwedAtEnd": round(amount_owed, 2),
        }

    return {
        "amountOwedAtEnd": round(amount_owed, 2),
        "yearlyDebt": yearly_debt,
        "type": data.type,
        "years": data.years,
        "interestRate": data.interestRate,
    }


#---------------------------------
# ENDPOINT DE NPV
#---------------------------------

@app.post("/npv")
def calcular_npv(data:NPVData):
    future_value = data.futureValue
    years = data.years
    interest_rate = data.interestRate / 100

    npv = future_value / ((1 + interest_rate) ** years)
    return {
        "npv": round(npv, 2),
        "futureValue": round(future_value, 2),
        "years": years,
        "interestRate": data.interestRate,
    }

@app.post("/npv-sequence")
def calcular_npv_sequence(data: NPVSequenceData):
    rate = data.interestRate / 100
    npv = 0.0

    for year, amount in enumerate(data.cashFlows):
        discounted = amount / ((1 + rate) ** year)
        npv += discounted

    return {
        "npv": round(npv, 2),
        "cashFlows": [
            {"year": i, "value": round(cf, 2)} for i, cf in enumerate(data.cashFlows)
        ],
        "interestRate": data.interestRate
    }


#---------------------------------
# ENDPOINT DE IRR
#---------------------------------

@app.post("/irr")
def calcular_irr(data: IRRData):
    try:
        irr_result = npf.irr(data.cashFlows)

        if irr_result is None or np.isnan(irr_result):
            return {
                "error": "IRR could not be calculated. Ensure the cash flows include both negative and positive values."
            }

        irr_percentage = irr_result * 100

        # ✅ Si el IRR es 0 o negativo, usamos un rango fijo (0% a 20%)
        if irr_result <= 0:
            discount_rates = [i for i in range(0, 21)]  # 0% a 20%
        else:
            max_rate = irr_result * 2
            step_size = max_rate / 20
            discount_rates = [(i * step_size) * 100 for i in range(21)]  # porcentaje

        npvs = []
        for rate_pct in discount_rates:
            rate = rate_pct / 100
            npv = sum(cf / (1 + rate) ** t for t, cf in enumerate(data.cashFlows))
            npvs.append(round(npv, 2))

        return {
            "irr": round(irr_percentage, 2),
            "cashFlows": data.cashFlows,
            "discountRates": [round(r, 2) for r in discount_rates],
            "npvs": npvs,
        }

    except Exception as e:
        return {"error": str(e)}


#---------------------------------
# ENDPOINT DE SAVINGS
#---------------------------------

@app.post("/savings")
def calcular_savings_contribution(data: SavingsData):
    goal = data.goal
    r_annual = data.interest_rate / 100
    n_years = data.years

    # Convertimos a mensual
    r_monthly = r_annual / 12
    total_periods = n_years * 12

    # Calcular contribución mensual necesaria
    if r_monthly == 0:
        contribution = goal / total_periods
    else:
        contribution = (goal * r_monthly) / ((1 + r_monthly) ** total_periods - 1)

    # Calcular evolución anual para gráfico
    valores = [0.0]
    aportes = [0.0]
    acumulado = 0.0
    total_aportado = 0.0

    for year in range(1, n_years + 1):
        for _ in range(12):
            acumulado = acumulado * (1 + r_monthly) + contribution
            total_aportado += contribution
        valores.append(round(acumulado, 2))
        aportes.append(round(total_aportado, 2))

    return {
        "contribution": round(contribution, 2),
        "valores": valores,
        "aportes": aportes
    }


#---------------------------------
# ENDPOINT DE COMPARISON
#---------------------------------

@app.post("/growth-comparison")
def growth_comparison(data: GrowthComparisonData):
    initial = data.initial_amount
    years = data.years
    rates = data.interest_rates

    # Línea de tiempo: [0, 1, ..., years]
    timeline = list(range(0, years + 1))

    # Para cada tasa, calcula la evolución del capital año por año
    valores_por_tasa = []
    final_values = []

    for rate in rates:
        r = rate / 100
        valores = []
        for year in timeline:
            capital = initial * ((1 + r) ** year)
            valores.append(round(capital, 2))
        valores_por_tasa.append(valores)
        final_values.append(round(valores[-1], 2))

    return {
        "timeline": timeline,                  # Lista de años
        "interestRates": rates,                # Ej. [5.0, 8.0]
        "valoresPorTasa": valores_por_tasa,    # Lista de listas
        "finalValues": final_values            # Último valor de cada curva
    }




#---------------------------------# 
# ENDPOINT DE DERIVATIVES
#---------------------------------

#---------- PARSER ----------

def clean_latex_input(latex_string: str) -> str:
    # 1) Reemplazar NBSP por espacio normal
    cleaned = latex_string.replace("\u00A0", " ")

    # 2) Eliminar comandos de espacio (\,, \;, \:, \!, \quad, etc.)
    cleaned = re.sub(r"\\(?:,|;|:|!|quad|qquad)\b", "", cleaned)

    # 3) Eliminar barra invertida + espacios "\ " en todo el string (no solo en {})
    cleaned = re.sub(r"\\\s+", "", cleaned)

    return cleaned


def latex_to_sympy(latex_string):
    cleaned_latex_string = clean_latex_input(latex_string)
    sympy_expr = parse_latex(cleaned_latex_string)
    return str(sympy_expr)


# --------- DERIVADA PASO A PASO ---------
def derivar_paso_a_paso(expr, variable):
    steps = []
    is_product = expr.func == Mul

    is_chain_candidate = False
    if isinstance(expr, Function) and expr.args and expr.args[0] != variable and expr.args[0].has(variable):
        is_chain_candidate = True
    elif isinstance(expr, Pow) and expr.base != variable and expr.base.has(variable):
        is_chain_candidate = True

    if is_product:
        f_x = expr.args[0]
        g_x = expr.args[1]
        df_dx = diff(f_x, variable)
        dg_dx = diff(g_x, variable)
        termino1 = df_dx * g_x
        termino2 = f_x * dg_dx
        derivada_intermedia = Add(termino1, termino2, evaluate=False)
        derivada_final = derivada_intermedia.simplify()

        steps.append("📘 In the case of a product, we use the product rule:")
        steps.append("As a part of the first step of the product rule, we define the two functions:")
        steps.append("$f(x) = " + sympy_latex(f_x))
        steps.append("$g(x) = " + sympy_latex(g_x))
        steps.append("Then, we compute their derivatives:")
        steps.append("$f'(x) = " + sympy_latex(df_dx))
        steps.append("$g'(x) = " + sympy_latex(dg_dx))
        steps.append("Now we apply the product rule formula:")
        steps.append("$f'(x) \\cdot g(x) + f(x) \\cdot g'(x) = " + sympy_latex(termino1) + " + " + sympy_latex(termino2))
        steps.append("Finally, we simplify the expression:")
        steps.append("$" + sympy_latex(derivada_final))

        return derivada_final, steps


    elif is_chain_candidate:
        outer_func_obj = expr.func
        inner_expr = expr.args[0] if expr.args else None

        if inner_expr and inner_expr.has(variable) and inner_expr != variable:
            dummy_u = Symbol('u')
            outer_func_with_dummy = expr.subs(inner_expr, dummy_u)
            dh_du = diff(outer_func_with_dummy, dummy_u)
            h_prime_of_g_x = dh_du.subs(dummy_u, inner_expr)
            dg_dx = diff(inner_expr, variable)
            derivada_final = h_prime_of_g_x * dg_dx
            derivada_final_simplificada = derivada_final.simplify()
            steps.append("🎯 In the case of a chain rule, we use the following steps:\n")

            steps.append("1. We rewrite the function as a composition:")
            steps.append(f"$h(u) = {sympy_latex(outer_func_with_dummy)}, \\quad u = {sympy_latex(inner_expr)}")

            steps.append("\n2. We compute the derivative of the outer function with respect to u:")
            steps.append(f"$h'(u) = {sympy_latex(dh_du)} \\Rightarrow h'(g(x)) = {sympy_latex(h_prime_of_g_x)}")

            steps.append("\n3. We compute the derivative of the inner function:")
            steps.append(f"$g'(x) = {sympy_latex(dg_dx)}")

            steps.append("\n4. We apply the chain rule formula:")
            steps.append(f"$h'(g(x)) \\cdot g'(x) = {sympy_latex(h_prime_of_g_x)} \\cdot {sympy_latex(dg_dx)}")

            steps.append("\n5. Simplified Derivative:")
            steps.append(f"$" + sympy_latex(derivada_final_simplificada))

            return derivada_final_simplificada, steps

    # ✅ Basic case: direct differentiation
    derivada_final = diff(expr, variable)

    steps.append("🧮 Basic case: we directly differentiate the expression.")

    steps.append("1. We apply standard differentiation rules to the entire expression:")
    steps.append(f"$\\frac{{d}}{{dx}}\\left[{sympy_latex(expr)}\\right] = {sympy_latex(derivada_final)}")

    steps.append("2. Final Result:")
    steps.append(f"$ {sympy_latex(derivada_final)}")

    return derivada_final, steps





# --------- ENDPOINT PRINCIPAL ---------
@app.post("/derivatives")
async def compute_derivative(request: DerivativeRequest):
    try:
        x = symbols("x")
        expr = parse_latex(clean_latex_input(request.equation.strip()))
        derivative, steps = derivar_paso_a_paso(expr, x)

        return {
            "original": str(expr),
            "original_latex": sympy_latex(expr),
            "derivative": str(derivative),
            "derivative_latex": sympy_latex(derivative),
            "steps": steps
        }

    except Exception as e:
        return {"error": f"Failed to compute derivative: {str(e)}"}



#---------------------------------
# ENDPOINT Test
#---------------------------------
@app.post("/criticalpoints")
def compute_critical_points(data: CriticalPointsData):
    # Solo devolver lo que llega, en el formato esperado por el frontend
    return {
        "original": data.equation,
        "first_derivative": "",
        "second_derivative": "",
        "critical_points": [],
        "inflection_points": [],
        "second_derivative_classification": "",
        "absolute_extrema": {"max": None, "min": None},
    }