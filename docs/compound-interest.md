# 📈 Exponential Growth Calculator Documentation

The Compound Interest Calculator models the evolution of capital over time with compounded growth and periodic contributions, tailored for financial engineers, quants, and students. It is one of the foundational tools in our Financial Calculator module.

---

## 🧠 Formula

**General Formula**:  
**A = A₀ · (1 + r)^t + C · ((1 + r)^t - 1) / r**

Where:  
- **A** = final amount  
- **A₀** = initial investment  
- **r** = annual interest rate (decimal)  
- **t** = number of years  
- **C** = contribution per period (annual or monthly)

**If monthly frequency is selected**:  
**C = 12 · Cₘ**  
**A = A₀ · (1 + r)^t + 12 · C · ((1 + r)^t - 1) / r**

---

## ✨ Features

- Dynamic formula rendering using KaTeX  
- Controlled form with clear user inputs  
- Scrolls to formula explanation when clicking "See how it was calculated"  
- Custom formula displayed with substituted values  
- Backend provides final amount + per-year breakdown  
- Modular structure — easily extendable into more financial tools

---

## ⚙️ Tech Stack

- **Frontend**: React + Vite + TailwindCSS  
- **Formula Rendering**: KaTeX  
- **Backend**: FastAPI (Python)  
- **API**: REST (POST `/calculate-growth`)  
- **Hosting (Planned)**: Vercel (frontend), Render or GCP (backend)

---

## 🔁 Frequency Logic

Users can toggle between:
- **Annual contributions** → use `C` as provided.
- **Monthly contributions** → multiply `C` by 12 to simulate yearly effect.

The backend handles this automatically and returns both the final value and a breakdown per year.

