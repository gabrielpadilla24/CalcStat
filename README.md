# 🧮 CalcStat — The Ultimate Interactive Statistics & Financial Engineering Platform

CalcStat is a **modern, web-based scientific calculator suite** built to unify advanced **mathematical, statistical, and financial computation** into one seamless platform.  
It is designed for **students, researchers, and quantitative finance professionals** who need **interactive visualizations**, **dynamic formula rendering**, and **backend-powered computations** in real time.

---

## 🚀 Overview

CalcStat combines the power of **FastAPI** (Python backend) and **React + TailwindCSS** (frontend) to deliver a responsive, modular, and extensible calculator ecosystem.  
It supports **multiple specialized domains**, including:

- 📈 **Financial Calculators** — mortgages, refinancing, NPV, IRR, savings, and investment comparisons.  
- 🧠 **Probability & Statistics Calculators** — probability distributions, regression, and expected value tools.  
- ∫ **Calculus Calculators** — symbolic derivatives, detailed step-by-step solutions, and formula visualization.  
- 🎲 **Stochastic Calculus & Quant Tools** — Brownian motion simulators, martingale testers, and Black-Scholes PDEs.  
- 💡 **Quant Calculators** — tools for quantitative finance, backtesting models, and risk metrics.

CalcStat is **openly extensible**, enabling future integrations for AI-assisted computation, symbolic algebra engines, and interactive data visualization modules.

---

## 🧠 Core Philosophy

> “Mathematics should be both powerful and intuitive.”

CalcStat aims to make **advanced quantitative reasoning accessible** through clean design and interactivity:
- Every module combines **mathematical rigor** with **intuitive user experience**.
- Each formula is rendered dynamically with **KaTeX** for full mathematical clarity.
- All calculations are performed securely on the **FastAPI backend**, ensuring accuracy and scalability.

---

## 🧩 Architecture

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React + Vite + TailwindCSS | Modular, responsive UI; form handling, visualization, and formula rendering. |
| **Backend** | FastAPI (Python) | High-performance REST API for real-time computation and mathematical models. |
| **Data Models** | Pydantic | Input validation, typing, and schema enforcement for API endpoints. |
| **Visualization** | ApexCharts + KaTeX | Interactive plots and symbolic formula rendering. |
| **Deployment** | Vercel (frontend) + Render (backend) | Fully cloud-hosted with custom domain integration (`calcstat.com`). |

---

## 🧮 Major Modules

### 1. Financial Calculator
Includes multiple sub-tools:
- **Fixed-Rate Mortgage (FRM)** with amortization schedule, pie and bar charts.
- **Adjustable-Rate Mortgage (ARM)** with dynamic rate periods.
- **Interest-Only Loans**, **Balloon Payments**, and **Jumbo Loans**.
- **Refinance Calculator** with *Refinance Score* and break-even analysis.
- **Savings & Investment Calculators** for compound growth and comparison of return rates.

### 2. Probability & Statistics Calculator
- Discrete & continuous **probability distributions** (Binomial, Poisson, Normal, etc.).
- **Regression** with intercept, fitted values, and coefficient estimation.
- **Expected Value**, **Variance**, and **Hypothesis Testing**.
- All computations handled in Python with SciPy, NumPy, and StatsModels.

### 3. Calculus Calculator
- **Symbolic derivatives** using `sympy`, with automatic rule detection (product, chain, quotient).
- **Step-by-step explanations** and **live LaTeX formula updates**.
- Integration-ready with MathLive for real-time graphing.

### 4. Stochastic Calculus Calculator
- **Brownian Motion Simulator**
- **Quadratic Variation**
- **Martingale Tester**
- **Girsanov Theorem Tool**
- **Black–Scholes PDE Analyzer** with visual payoff representations.

### 5. Quant Calculator
- In-progress module focusing on **Quantitative Finance**, **AI-generated strategies**, and **Monte Carlo simulations**.
- Future integration with **backtesting engines** and **price action research tools**.

---

## 🧱 Backend Design (FastAPI)

All endpoints follow a consistent pattern:
```python
@app.post("/npv")
def npv_endpoint(data: NPVData):
    try:
        return FinancialCalculator.compute_npv(data)
    except Exception as e:
        return {"error": str(e)}
````

Each calculator has its own Pydantic model:

```python
class NPVData(BaseModel):
    rate: float
    cashflows: List[float]
```

### Key Features

* Input validation via **Pydantic models**
* Clean modular design per category
* Rich mathematical computation via:

  * `NumPy`
  * `SymPy`
  * `SciPy`
  * `StatsModels`
  * `Math` library

---

## 🎨 Frontend Design (React + TailwindCSS)

* **Clean architecture** using folders:

  ```
  src/
  ├─ components/
  ├─ pages/
  ├─ hooks/
  ├─ utils/
  └─ assets/
  ```
* **Dynamic form rendering** with controlled components.
* **Custom hooks** for API communication.
* **Responsive layout** for all devices.
* **Dark / Light theme toggle**.
* Integrated **auto-scroll** behavior to show formulas and charts only when triggered.

---

## 📊 Visual Components

* Interactive charts powered by **ApexCharts**:

  * Pie, bar, and line charts.
  * Tabs for comparing multiple payment modes.
* Mathematical expressions rendered dynamically with **KaTeX**.
* Formula visualization adapts in real time as users change inputs.

---

## 🌐 Deployment & Domain

* Frontend deployed on **Vercel** → [`https://calcstat.com`](https://calcstat.com)
* Backend deployed on **Render** with FastAPI REST endpoints.
* Domain purchased and managed via **Namecheap** with verified DNS and HTTPS.

---

## 🧰 Tech Stack Summary

| Category            | Tools                                                            |
| ------------------- | ---------------------------------------------------------------- |
| **Frontend**        | React, Vite, TailwindCSS, TypeScript, ApexCharts, KaTeX          |
| **Backend**         | FastAPI, Python 3.11, Pydantic, NumPy, SciPy, SymPy, StatsModels |
| **Database**        | (optional) PostgreSQL integration for persistent data (future)   |
| **Deployment**      | Vercel (Frontend) + Render (Backend)                             |
| **Version Control** | Git + GitHub                                                     |
| **Hosting**         | Custom Domain via Namecheap                                      |

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/yourusername/calcstat.git
cd calcstat
```

### 🔹 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` and start using the calculators.


---



## 🧾 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute with attribution.

---

## 👤 Author

**Gabriel Padilla**
🎓 Computer Science @ Universidad de los Andes
🌍 Creator of CalcStat — combining AI, finance, and mathematical computation
🔗 [LinkedIn](https://www.linkedin.com/in/gabriel-padilla-314973232/) | [Website](https://calcstat.com)

---

## 💬 Acknowledgements

CalcStat was built with the vision of making **advanced quantitative reasoning accessible** for everyone.
Special thanks to the open-source community behind **FastAPI**, **React**, **TailwindCSS**, and **SciPy** for their exceptional tools.

---

> *“Where clarity meets computation.”*
> — **CalcStat**


