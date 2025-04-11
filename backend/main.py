from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from math import pow
import numpy_financial as npf
import numpy as np
from typing import Literal, Optional, List



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