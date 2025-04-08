from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from math import pow

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

    # 👇 Normalizar longitud para el gráfico y los tooltips
    max_len = max(len(grouped_original), len(grouped_refinanced))
    grouped_original += [None] * (max_len - len(grouped_original))
    grouped_refinanced += [None] * (max_len - len(grouped_refinanced))

    return {
        "newMonthlyPayment": round(new_monthly_payment, 2),
        "monthlySavings": round(monthly_savings, 2),
        "differenceInInterest": round(difference_in_interest, 2),
        "totalCost": round(closing_costs, 2),
        "monthsToRecoupCosts": months_to_recoup,
        "cumulativeOriginal": cumulative_original,
        "cumulativeRefinanced": cumulative_refinanced,
        "groupedOriginal": grouped_original,
        "groupedRefinanced": grouped_refinanced
    }
