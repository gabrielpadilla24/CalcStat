from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from math import pow
import numpy_financial as npf
import numpy as np
from typing import Literal, Optional, List, Dict, Tuple, Iterable, Any
from sympy import symbols, diff, simplify, Mul, Pow, Function, Symbol, Add, sin, cos, tan, log, exp, sqrt, solveset, Eq, S, singularities, Matrix
from sympy.parsing.sympy_parser import parse_expr
import sympy
from sympy import latex as sympy_latex
from sympy.parsing.latex import parse_latex
import re
from GaussianLinearSystem import GaussianLinearSystem



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

class TangentLineData(BaseModel):
    equation: str
    x0: float

class IntegralRequest(BaseModel):
    equation: str

class MatrixData(BaseModel):
    matrix: List[List[float]]

class EquationItem(BaseModel):
    lhs: str
    rhs: str

class EquationSystemData(BaseModel):
    equations: List[EquationItem]

class GramSchmidtData(BaseModel):
    vectors: List[List[float]]



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
# ENDPOINT: criticalpoints (con LaTeX, sin inflection points)
#---------------------------------




@app.post("/criticalpoints")
def compute_critical_points(data: CriticalPointsData):
    expr = parse_latex(clean_latex_input(data.equation.strip()))

    # Derivadas
    primera_derivada = simplify(diff(expr, x))
    segunda_derivada = simplify(diff(primera_derivada, x))

    # --- Puntos críticos ---
    crit_eq0 = solveset(Eq(primera_derivada, 0), x, domain=S.Reals)
    crit_list = list(crit_eq0) if getattr(crit_eq0, "is_FiniteSet", False) else []
    try:
        nd_points = list(singularities(primera_derivada, x, domain=S.Reals))
    except Exception:
        nd_points = []
    all_crit = sorted(set(crit_list + nd_points), key=lambda z: float(z))

    # --- Clasificación (texto) ---
    def clasificar_cp(c):
        try:
            f2 = float(segunda_derivada.subs(x, c))
            cx = round(float(c), 6)
            if f2 > 0: return f"x={cx}: local minimum (f''>0)"
            if f2 < 0: return f"x={cx}: local maximum (f''<0)"
        except Exception:
            pass
        try:
            cnum = float(c); d = 1e-6
            left = float(primera_derivada.subs(x, cnum - d))
            right = float(primera_derivada.subs(x, cnum + d))
            cx = round(cnum, 6)
            if left < 0 < right: return f"x={cx}: local minimum (sign change in f')"
            if left > 0 > right: return f"x={cx}: local maximum (sign change in f')"
            return f"x={cx}: inconclusive (no sign change)"
        except Exception:
            try: cx = round(float(c), 6)
            except Exception: cx = str(c)
            return f"x={cx}: inconclusive"

    classifications = "\n".join(clasificar_cp(c) for c in all_crit) if all_crit else "—"

    # --- Absolute extrema (sobre críticos) ---
    vals = []
    for c in all_crit:
        try:
            cx = float(c)
            fy = float(expr.subs(x, cx))
            vals.append((cx, fy))
        except Exception:
            pass

    if vals:
        vmin = min(vals, key=lambda t: t[1])
        vmax = max(vals, key=lambda t: t[1])
        absolute_extrema = {
            "min": f"({round(vmin[0], 3)}, {round(vmin[1], 3)})",
            "max": f"({round(vmax[0], 3)}, {round(vmax[1], 3)})",
        }
    else:
        absolute_extrema = {"max": None, "min": None}

    # ---------- LaTeX ----------
    original_latex = sympy_latex(expr)
    first_derivative_latex  = sympy_latex(primera_derivada)
    second_derivative_latex = sympy_latex(segunda_derivada)
    critical_points_latex   = [sympy_latex(cp) for cp in all_crit]

    return {
        "second_derivative_classification": classifications,
        "absolute_extrema": absolute_extrema,

        # LaTeX para MathQuill
        "original": original_latex,
        "first_derivative": first_derivative_latex,
        "second_derivative": second_derivative_latex,
        "critical_points": critical_points_latex,
    }


#---------------------------------
# ENDPOINT: tangentline (con LaTeX, sin inflection points)
#---------------------------------
def fmt_num(v: float, ndigits: int = 4) -> str:
    """Formatea números para mostrarlos en LaTeX (sin ceros sobrantes)."""
    s = f"{round(float(v), ndigits):.{ndigits}f}"
    s = s.rstrip("0").rstrip(".")
    return s if s else "0"

@app.post("/tangentline")
def compute_tangent_line(data: TangentLineData):
    # 1) Parsear f(x) desde LaTeX
    expr = parse_latex(clean_latex_input(data.equation.strip()))

    # 2) Datos base
    x0 = float(data.x0)
    derivative = diff(expr, x)
    m_val = float(derivative.subs(x, x0))
    y0_val = float(expr.subs(x, x0))
    tangent_expr = m_val * (x - x0) + y0_val

    # 3) Strings LaTeX “bonitos”
    fx_ltx = sympy_latex(expr)                # f(x)
    fprime_ltx = sympy_latex(derivative)      # f'(x)
    x0_ltx = fmt_num(x0)
    m_ltx = fmt_num(m_val)
    y0_ltx = fmt_num(y0_val)
    tangent_final_ltx = rf"y = ({sympy_latex(tangent_expr)})"

    # 4) Pasos didácticos (todo en LaTeX)
    steps = {
        "m": {
            # Definición + evaluación + resultado
            "definition": r"m = f'(x_0)",
            "evaluation": rf"m = \left.{fprime_ltx}\right|_{{x={x0_ltx}}} = {m_ltx}",
        },
        "y0": {
            "definition": r"y_0 = f(x_0)",
            "evaluation": rf"y_0 = \left.{fx_ltx}\right|_{{x={x0_ltx}}} = {y0_ltx}",
        },
        "tangent": {
            "general": r"y = m\,(x - x_0) + y_0",
            "substitution": rf"y = {m_ltx}\,(x - {x0_ltx}) + {y0_ltx}",
            "final": tangent_final_ltx,  # ecuación final (ya simplificada por sympy)
        },
    }

    # 5) Respuesta (LaTeX + valores numéricos)
    return {
        "original": fx_ltx,               # f(x) en LaTeX
        "derivative": fprime_ltx,         # f'(x) en LaTeX
        "x0": float(x0),                  # números crudos por si los necesitas
        "m": float(round(m_val, 4)),
        "y0": float(round(y0_val, 4)),
        "fxTangent": tangent_final_ltx,   # y = ... en LaTeX
        "steps": steps,                   # 👈 pasos listos para renderizar
    }


#--------------------------------
# ENDPOINT: inflectionpoints
#--------------------------------

x = symbols("x")

@app.post("/inflectionpoints")
def compute_inflection_points(data: DerivativeRequest):
    try:
        # 1) Parsear f(x)
        expr = parse_latex(clean_latex_input(data.equation.strip()))

        # 2) Derivadas
        fprime  = simplify(diff(expr, x))
        fsecond = simplify(diff(fprime, x))

        # 3) Candidatos a inflexión:
        #    a) ceros de f''(x)
        zeros_set = solveset(Eq(fsecond, 0), x, domain=S.Reals)
        zeros = list(zeros_set) if getattr(zeros_set, "is_FiniteSet", False) else []

        #    b) puntos donde f'' no existe
        try:
            sing_set = singularities(fsecond, x, domain=S.Reals)
            sings = list(sing_set) if getattr(sing_set, "is_FiniteSet", False) else list(sing_set)
        except Exception:
            sings = []

        # Ordenar “suavemente” por valor numérico cuando sea posible
        def _key(v):
            try:
                return float(v)
            except Exception:
                return float("inf")

        zeros = sorted(zeros, key=_key)
        sings = sorted(sings, key=_key)

        zeros_ltx = [sympy_latex(z) for z in zeros]
        sings_ltx = [sympy_latex(s) for s in sings]

        # 4) Confirmar inflexiones por cambio de signo en f''(x)
        inflection_pts_ltx = []       # [{x: "<latex>", y: "<latex>"}]
        inflection_pts_coords = []    # ["(x, y)", ...] para graficar si lo deseas

        candidates = zeros + sings
        vistos = set()
        for c in candidates:
            k = sympy_latex(c)
            if k in vistos:
                continue
            vistos.add(k)

            # Necesitamos valor numérico para probar signos a izquierda/derecha
            try:
                cnum = float(c)
            except Exception:
                continue

            d = max(1e-6, abs(cnum) * 1e-6)

            def _sign(t):
                try:
                    v = float(fsecond.subs(x, t))
                    if v > 0: return 1
                    if v < 0: return -1
                except Exception:
                    pass
                return 0

            left  = _sign(cnum - d)
            right = _sign(cnum + d)

            # Cambio de signo estricto ⇒ inflexión
            if left * right < 0:
                try:
                    y_sym = expr.subs(x, c)
                    y_num = float(expr.subs(x, cnum))

                    # Pares LaTeX
                    inflection_pts_ltx.append({
                        "x": sympy_latex(c),
                        "y": sympy_latex(y_sym),
                    })

                    # Coordenadas numéricas como string (sin helper)
                    x_str = str(round(cnum, 6)).rstrip("0").rstrip(".")
                    y_str = str(round(y_num, 6)).rstrip("0").rstrip(".")
                    if x_str == "": x_str = "0"
                    if y_str == "": y_str = "0"
                    inflection_pts_coords.append(f"({x_str}, {y_str})")
                except Exception:
                    # Si f(c) no existe, no devolvemos el punto (aunque cambie concavidad)
                    pass

        return {
            "original":           sympy_latex(expr),
            "first_derivative":   sympy_latex(fprime),
            "second_derivative":  sympy_latex(fsecond),

            # candidatos
            "second_derivative_zeros":         zeros_ltx,
            "second_derivative_singularities": sings_ltx,

            # ✅ inflection points confirmados
            "inflection_points":        inflection_pts_ltx,      # [{x:<ltx>, y:<ltx>}]
            "inflection_points_coords": inflection_pts_coords,   # ["(x, y)", ...]
        }
    except Exception as e:
        return {"error": f"Failed to compute inflection data: {str(e)}"}


#--------------------------------------
# ENDPOINT: implicit differentiation
#--------------------------------------
@app.post("/implicitdiff")
def implicit_differentiation(data: DerivativeRequest):
    try:
        x, y = symbols("x y")
        expr = parse_latex(clean_latex_input(data.equation.strip()))

        # Si no hay 'y' en la expresión, derivada normal
        if y not in expr.free_symbols:
            d_expr = diff(expr, x)
            steps = [
                "1. Differentiate with respect to x:",
                f"$\\frac{{d}}{{dx}}\\left[{sympy_latex(expr)}\\right] = {sympy_latex(d_expr)}"
            ]
            implicit_latex = sympy_latex(d_expr)
        else:
            dy = Symbol("y'", real=True)
            # Derivada total usando la regla de la cadena
            d_expr = diff(expr, x) + diff(expr, y) * dy
            # Resolver para y'
            implicit_sol = sympy.solve(Eq(d_expr, 0), dy)
            steps = [
                "1. Differentiate both sides with respect to x:",
                f"$\\frac{{d}}{{dx}}\\left[{sympy_latex(expr)}\\right]",
                "2. Apply the chain rule for terms with y:",
                "$\\frac{\\partial}{\\partial x} + \\frac{\\partial}{\\partial y} \\cdot y'",
                "3. Rearranging and solving for y':",
                f"$y' = {sympy_latex(implicit_sol[0])}" if implicit_sol else "No solution found."
            ]
            implicit_latex = sympy_latex(implicit_sol[0]) if implicit_sol else ""

    except Exception as e:
        implicit_latex = ""
        steps = [f"Error: {str(e)}"]

    return {
        "original": data.equation,   # reimprime lo que llegó
        "implicit": implicit_latex,
        "steps": steps,
    }



#-------------------------------------
# LIMITS
#-------------------------------------

#--------------------------------------
# ENDPOINT: limits (echo con notación de límite)
#--------------------------------------
@app.post("/limits")
def compute_limits(data: DerivativeRequest):
    # data.equation llega en LaTeX (desde MathQuill)
    latex_fx = data.equation.strip() or "f(x)"
    original_limit_latex = rf"\lim_{{x \to \infty}} \left({latex_fx}\right)"
    # Convertir LaTeX a expresión sympy
    expr = parse_latex(latex_fx)
    limit = sympy.limit(expr, x, sympy.oo)
    fx = sympy.latex(expr)
    return {
        "original": original_limit_latex,  # <- listo para KaTeX/MathQuill
        "limit": sympy.latex(limit),        # por ahora vacío (se calculará luego)
        "fx": fx
    }


#----------------------------------------
# DETERMINANT
#----------------------------------------
def format_number(val):
    """Convierte floats a enteros si aplica o redondea a 4 decimales"""
    try:
        val = float(val)
        if val.is_integer():
            return str(int(val))
        return str(round(val, 4))
    except:
        return str(val)

@app.post("/determinant")
def determinant(data: MatrixData):
    mat = Matrix(data.matrix)

    if mat.rows != mat.cols:
        return {
            "error": "Determinant can only be calculated for square matrices.",
            "explanation": (
                "The determinant is only defined for square matrices (n×n). "
                "Non-square matrices (n×m with n≠m) do not represent linear transformations "
                "from R^n to R^n, so their determinant is undefined."
            )
        }

    steps = []

    # Caso 2x2
    if mat.rows == 2:
        a, b, c, d = mat[0,0], mat[0,1], mat[1,0], mat[1,1]
        steps.append(r"\text{Step 1: Formula for 2x2 determinant is } \det(A) = ad - bc")
        steps.append(rf"= ({format_number(a)})({format_number(d)}) - ({format_number(b)})({format_number(c)})")
        steps.append(rf"= {format_number(a*d)} - {format_number(b*c)}")
        steps.append(rf"= {format_number(a*d - b*c)}")
        det_value = a*d - b*c

    # Caso 3x3
    elif mat.rows == 3:
        a,b,c = mat[0,0], mat[0,1], mat[0,2]
        d,e,f = mat[1,0], mat[1,1], mat[1,2]
        g,h,i = mat[2,0], mat[2,1], mat[2,2]

        steps.append(r"\text{Step 1: Apply rule of Sarrus:}")
        steps.append(r"\det(A) = (aei + bfg + cdh) - (ceg + afh + bdi)")
        steps.append(
            rf"= ({format_number(a)}\cdot{format_number(e)}\cdot{format_number(i)} + "
            rf"{format_number(b)}\cdot{format_number(f)}\cdot{format_number(g)} + "
            rf"{format_number(c)}\cdot{format_number(d)}\cdot{format_number(h)})"
            rf"-({format_number(c)}\cdot{format_number(e)}\cdot{format_number(g)} + "
            rf"{format_number(a)}\cdot{format_number(f)}\cdot{format_number(h)} + "
            rf"{format_number(b)}\cdot{format_number(d)}\cdot{format_number(i)})"
        )
        det_value = a*e*i + b*f*g + c*d*h - (c*e*g + a*f*h + b*d*i)
        steps.append(rf"= {format_number(det_value)}")

    # Caso general
    else:
        steps.append(r"\text{Step 1: Using Bareiss' algorithm (fraction-free Gaussian elimination).}")
        det_value = mat.det()
        steps.append(rf"= {format_number(det_value)}")

    return {
        "matrix": data.matrix,
        "determinant": int(det_value) if float(det_value).is_integer() else round(float(det_value), 4),
        "steps": steps
    }





#----------------------------------------
# Inverse
#----------------------------------------
@app.post("/inverse")
def inverse(data: MatrixData):
    mat = Matrix(data.matrix)

    # Matriz original formateada (siempre se devuelve)
    original_formatted = [
        [format_number(mat[i, j]) for j in range(mat.cols)]
        for i in range(mat.rows)
    ]

    # Caso: no cuadrada
    if mat.rows != mat.cols:
        return {
            "matrix": original_formatted,
            "error": "Inverse can only be calculated for square matrices.",
            "explanation": (
                "The inverse is only defined for square matrices (n×n). "
                "Non-square matrices (n×m with n≠m) do not represent linear transformations "
                "from R^n to R^n, so their inverse is undefined."
            )
        }

    def latex_matrix_rounded(mat):
        rows = []
        for i in range(mat.rows):
            row = [f"{round(float(mat[i, j]), 2):g}" for j in range(mat.cols)]
            rows.append(" & ".join(row))
        return r"\begin{bmatrix}" + r" \\".join(rows) + r"\end{bmatrix}"

    try:
        inv = mat.inv()

        # Matriz inversa formateada
        inverse_formatted = [
            [format_number(inv[i, j]) for j in range(inv.cols)]
            for i in range(inv.rows)
        ]

        latex_inverse = latex_matrix_rounded(inv)

        return {
            "matrix": original_formatted,
            "inverse": inverse_formatted,
            "latex": latex_inverse,
            "explanation": (
                "The inverse of a square matrix A is the matrix A^{-1} such that "
                "A · A^{-1} = I. It only exists if det(A) ≠ 0."
            )
        }

    except Exception:
        return {
            "matrix": original_formatted,
            "error": "This matrix is singular and does not have an inverse.",
            "explanation": (
                "A matrix is invertible if and only if its determinant is nonzero. "
                "Since det(A) = 0, the matrix is singular and has no inverse."
            )
        }




#----------------------------------------
# LINEAR EQUATION SYSTEM
#----------------------------------------
solver = GaussianLinearSystem(collect_steps=True)

@app.post("/eqsystem")
def receive_equations(data: EquationSystemData) -> Dict[str, Any]:
    """
    Recibe [{lhs, rhs}, ...], resuelve por eliminación gaussiana,
    y devuelve:
      - coeffmatrix: LaTeX de la matriz aumentada [A|b]
      - variables: orden usado (x,y,z presentes)
      - status: "Success" | "No unique solution"
      - solution: dict {x: ..., y: ..., z: ...} (si única)
      - solution_latex: vector columna en LaTeX (si única)
      - steps: lista de strings con los pasos de la eliminación (si collect_steps=True)
    """
    # Limpia el buffer de pasos por request
    if getattr(solver, "collect_steps", False):
        solver.steps = []

    # Resuelve usando la clase (acepta items con attrs/dict lhs/rhs)
    result = solver.solve_from_lhs_rhs(data.equations)

    return {
        "received_equations": [eq.dict() for eq in data.equations],
        "count": len(data.equations),
        **result,  # incluye: coeffmatrix, variables, status, solution, solution_latex, steps
    }

# -----------------------------
# Eigenvalues and Eigenvectors
# -----------------------------
from typing import Any, Dict, List
from sympy import Matrix, symbols, Eq, solve, latex as sympy_latex, N

@app.post("/eigen")
def eigen(data: MatrixData) -> Dict[str, Any]:
    A = Matrix(data.matrix)
    n = A.rows
    lam = symbols("λ")

    # Matriz original
    original_formatted = [
        [format_number(A[i, j]) for j in range(A.cols)]
        for i in range(A.rows)
    ]

    # Validación
    if A.rows != A.cols:
        return {
            "matrix": original_formatted,
            "steps": [{"text": "Error: La matriz no es cuadrada", "math": ""}],
        }

    steps: List[Dict[str, str]] = []

    # Paso 1: A - λI
    A_lambda = A - lam * Matrix.eye(n)
    steps.append({
        "text": "Step 1: Build A - λI =",
        "math": sympy_latex(A_lambda)
    })

    # Paso 2: determinante
    det_expr = A_lambda.det()
    steps.append({
    "text": "Step 2: Compute determinant det(A - λI) =",
        "math": sympy_latex(det_expr)
    })

    # Paso 3: polinomio característico = det(A - λI)
    steps.append({
        "text": "Step 3: Characteristic polynomial p(λ) =",
        "math": sympy_latex(det_expr.expand())
    })

    # Paso 4: resolver p(λ) = 0
    roots = solve(Eq(det_expr, 0), lam)
    steps.append({
        "text": "Step 4: Solve p(λ) = 0 → eigenvalues λ:",
        "math": ", ".join(sympy_latex(r) for r in roots)
    })

    # Autovectores (solo cálculo, sin pasos)
    eigenvalues_numeric: List[float] = []
    eigenvectors_numeric: List[List[float]] = []
    for val in roots:
        valN = N(val)
        try:
            vecs = (A - val * Matrix.eye(n)).nullspace()
            if vecs:
                v = vecs[0]
                vN = [float(N(x)) for x in v]
                eigenvalues_numeric.append(float(valN))
                eigenvectors_numeric.append(vN)
        except Exception:
            pass

    return {
        "matrix": original_formatted,
        "eigenvalues": eigenvalues_numeric,
        "eigenvectors": eigenvectors_numeric,
        "steps": steps,
    }



#------------------
# SVD
#------------------

def _num_to_str(x: float) -> str:
    try:
        xf = float(x)
        if float(xf).is_integer():
            return str(int(xf))
        return f"{xf:.6f}".rstrip("0").rstrip(".")
    except Exception:
        return str(x)

def _latex_matrix(M: List[List[float]]) -> str:
    if not M:
        return r"\begin{bmatrix}\end{bmatrix}"
    rows = [" & ".join(_num_to_str(v) for v in row) for row in M]
    return r"\begin{bmatrix}" + r" \\ ".join(rows) + r"\end{bmatrix}"

@app.post("/svd")
def svd(data: MatrixData) -> Dict[str, Any]:

    try:
        mat_sym = Matrix(data.matrix)
    except Exception as e:
        return {"error": f"Matriz inválida: {e}"}

    if mat_sym.rows == 0 or mat_sym.cols == 0:
        return {"error": "La matriz no puede ser vacía."}

    try:
        A = np.array(mat_sym.tolist(), dtype=np.float64)
    except Exception as e:
        return {"error": f"No se pudo convertir a float: {e}"}

    try:
        U, s, Vt = np.linalg.svd(A, full_matrices=False)
    except np.linalg.LinAlgError as e:
        return {"error": f"Falló la SVD: {e}"}

    S = np.diag(s)

  

    # Serializar a listas nativas
    U_list  = U.tolist()
    s_list  = s.tolist()
    S_list  = S.tolist()
    Vt_list = Vt.tolist()

 

    return {

    "U": U_list,

    # ✨ También frontend-style:
    "singularValues": s_list,
    "Sigma": S_list,
    "Vt": Vt_list,
   
}

#---------------------------------
# ENDPOINT: Gram-Schmidt (con pasos en LaTeX)
#---------------------------------

def _latex_vector(v: List[float]) -> str:
    """Convierte un vector (lista) en LaTeX columna."""
    if not v:
        return r"\begin{bmatrix}\end{bmatrix}"
    rows = " \\\\ ".join(str(round(x, 4)) for x in v)
    return r"\begin{bmatrix}" + rows + r"\end{bmatrix}"

@app.post("/gramschmidt")
def gramschmidt(data: GramSchmidtData) -> Dict[str, Any]:
    try:
        vectors = [np.array(v, dtype=float) for v in data.vectors]
        if not vectors:
            return {"error": "No vectors provided."}

        steps = []
        orthonormal = []

        for i, v in enumerate(vectors):
            steps.append(
                rf"\text{{Start with }} v_{i+1} = {_latex_vector(v.tolist())}"
            )
            u = v.copy()

            # Proyecciones
            for j, q in enumerate(orthonormal):
                proj = np.dot(v, q) * q
                u = u - proj
                steps.append(
                    rf"\text{{Subtract projection on }} q_{j+1}: \; u_{i+1} = {_latex_vector(u.tolist())}"
                )

            # Normalización
            norm_u = np.linalg.norm(u)
            if norm_u < 1e-10:
                raise ValueError("Linearly dependent vectors")

            q_new = u / norm_u
            orthonormal.append(q_new)
            steps.append(
                rf"\text{{Normalize: }} q_{i+1} = {_latex_vector(q_new.tolist())}"
            )

        # Construir salida en LaTeX
        latex_original = (
            r"\{ " + ",\; ".join(_latex_vector(v.tolist()) for v in vectors) + r" \}"
        )
        latex_ortonormal = (
            r"\{ " + ",\; ".join(_latex_vector(q.tolist()) for q in orthonormal) + r" \}"
        )

        return {
            "vectores": latex_original,
            "ortonormal": latex_ortonormal,
            "pasos": steps,   # 👈 cada paso ya es LaTeX puro
            "status": "Success"
        }

    except Exception as e:
        return {"error": f"Failed to compute Gram-Schmidt: {e}"}
