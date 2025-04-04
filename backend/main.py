from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExponentialData(BaseModel):
    initialValue: float
    growthRate: float
    time: float
    addConstant: bool
    constantValue: float
    frequency: str  # "año" o "mes"

@app.post("/compoundinterest")
def calcular(data: ExponentialData):
    valores = [round(data.initialValue, 2)]  # Año 0
    aportes = [round(data.initialValue, 2)]  # Aportes acumulados
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
