
# 📊 Interactive Math & Finance Calculator Platform

An interactive, modular platform for solving and visualizing complex mathematical and financial problems — built for aspiring quants, financial engineers, and curious minds.

---

## 🌟 Vision

To bridge mathematics, finance, and code through intuitive, educational, and powerful calculators — designed for learning, strategy development, and financial innovation.

---

## ⚙️ Tech Stack

- **Frontend**: React + Vite + TailwindCSS + KaTeX + ApexCharts
- **Backend**: FastAPI (Python), RESTful APIs
- **Deployment**: Vercel (frontend), Render/GCP (backend)
- **Design Principles**: Modular, Responsive, Scalable, Educational

---

## 🧠 Modules (Click to Jump)

| Category | Calculators |
|---------|-------------|
| 📈 Financial | [Compound Interest](#-compound-interest-calculator)<br>[Annuity](#-annuity-calculator)<br>[Fixed Rate Mortgage](#-fixed-rate-mortgage)<br>[ARM](#-adjustable-rate-mortgage)<br>[Interest-Only Mortgage](#-interest-only-mortgage)<br>[Balloon Payment Mortgage](#-balloon-payment)<br>[Jumbo Loan](#-jumbo-loan)<br>[NPV](#-net-present-value)<br>[IRR](#-internal-rate-of-return)<br>[Reverse Mortgage](#-reverse-mortgage)<br>[Refinancing Calculator](#-refinance-break-even-calculator) |
| 📊 Quant | [Monte Carlo Simulations](#-monte-carlo-simulator)<br>[Option Pricing (B&S)](#-black--scholes-calculator) |
| 📐 Calculus | [Single Variable](#-single-variable-calculus)<br>[Multivariable](#-multivariable-calculus)<br>[Definite Integrals](#-definite-integral-calculator) |
| 📏 Linear Algebra | [Matrix Operations](#-matrix-calculator)<br>[Eigenvalue Solver](#-eigenvalue-decomposer) |
| 🎲 Probability & Statistics | [Descriptive Stats](#-statistical-summary)<br>[Probability Distributions](#-distribution-visualizer) |
| 📉 Stochastic | [Brownian Motion](#-brownian-motion-simulator)<br>[Stochastic Interest Rates](#-vasicek-model) |

---

## 🔍 Calculator Documentation

### 📈 Compound Interest Calculator
- 📄 [Detailed Documentation](docs/compound-interest.md)
- ✨ Visualize how your capital grows over time!
- 🧮 Dynamic formula rendering with KaTeX
- 🔁 Annual vs Monthly contributions
- 📬 Backend API with breakdown per year

### 🧾 Annuity Calculator
- Calculates present and future value of annuities
- Supports ordinary annuities and annuities due

### 🏠 Fixed Rate Mortgage
- Calculates monthly payments, interest vs principal
- Includes amortization schedule and donut chart

### 🔄 Adjustable Rate Mortgage
- ARM types supported: 5/1, 7/1, etc.
- Shows initial monthly payment validity period

### 💸 Interest-Only Mortgage
- Calculates interest-only period payments
- Shows transition to regular payments

### 🎈 Balloon Payment
- Shows monthly payments + final balloon payoff
- Includes dual-tab visualization

### 🏦 Jumbo Loan
- High-value mortgage calculator with standard logic

### 💰 Net Present Value
- Handles single value and full cashflow sequences
- Includes KaTeX-rendered dynamic formula
- Cashflow bar chart integrated

### 📈 Internal Rate of Return
- Finds IRR from user-provided cashflows
- Annual chart visualization with ApexCharts

### 🪙 Reverse Mortgage
- Calculates loan balance over time
- Supports lump sum or monthly advances
- Debt accumulation chart

### 🔁 Refinance Break Even Calculator
- Compares original vs refinanced loans
- Highlights breakeven point
- Calculates Refinance Score based on user's goal

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: Render or Google Cloud Run
- Local dev:
  - `npm run dev` (frontend)
  - `uvicorn main:app --reload` (backend)

---

## 🧪 Testing

- Frontend: Manual and snapshot testing (Jest, coming soon)
- Backend: Pytest for logic + endpoint tests
- Planned CI/CD integration

---

## 📌 Roadmap

- 📊 AI-powered strategy generation (Q3 2025)
- 🧾 User profile & history tracking
- 🔐 OAuth & secure data storage
- 🎓 Educational overlays for each calculator
- 📱 Mobile-first UX optimizations

---

## 🧠 About the Author

Gabriel — CS undergrad, passionate about building the next generation of AI+Finance tools. On track to apply for top MSFE programs like MIT, Columbia, and CMU.

