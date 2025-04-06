from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
