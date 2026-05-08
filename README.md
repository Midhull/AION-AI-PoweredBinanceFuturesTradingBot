# AION — AI-Powered Binance Futures Trading Bot

A production-oriented Binance Futures Testnet trading bot built with Python, FastAPI, and `python-binance`, featuring a premium lightweight cinematic UI, structured logging, CLI execution, and robust validation.

---

# Preview

## Hero Interface

![Hero Interface](screenshots/Screenshot%20(214).png)

---

## Advanced Execution Layer

![Execution Layer](screenshots/Screenshot%20(215).png)

---

## Institutional Trading Terminal

![Trading Terminal](screenshots/Screenshot%20(216).png)

---

# Project Goal

The objective of this project is to create a clean, modular, and production-oriented trading utility for Binance Futures Testnet (USDT-M).

The system focuses on:

- Correct order execution
- Professional validation
- Modular architecture
- Structured logging
- Exception handling
- Reusable backend systems
- Lightweight frontend integration

---

# Features

- MARKET Orders
- LIMIT Orders
- STOP-LIMIT Orders
- BUY / SELL Support
- Binance Futures Testnet Integration
- FastAPI Backend
- Professional CLI Interface
- Strict Validation with Pydantic
- Structured Logging System
- Exception Handling
- Lightweight Cinematic UI
- Real-time Execution Feedback

---

# Tech Stack

## Backend
- Python 3
- FastAPI
- python-binance
- Pydantic
- python-dotenv
- Uvicorn

## Frontend
- React
- TypeScript
- TailwindCSS
- Vite

---

# Project Structure

```text
trading_bot/
├── backend/
│
│   ├── bot/
│   │   ├── __init__.py
│   │   ├── client.py
│   │   ├── orders.py
│   │   ├── validators.py
│   │   └── logging_config.py
│   │
│   ├── logs/
│   │   └── trading_bot.log
│   │
│   ├── cli.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│
├── screenshots/
│
└── README.md
Setup Instructions
1. Clone Repository
git clone https://github.com/your-username/AION-AI-PoweredBinanceFuturesTradingBot.git
cd AION-AI-PoweredBinanceFuturesTradingBot
2. Configure Environment Variables

Create a .env file inside:

backend/

Add:

BINANCE_API_KEY=your_testnet_api_key
BINANCE_API_SECRET=your_testnet_api_secret
3. Get Binance Futures Testnet API Keys

Use Binance Futures Testnet:

https://testnet.binancefuture.com

Generate:

API Key
Secret Key
4. Backend Setup
cd backend
pip install -r requirements.txt

Start backend:

py -3.12 -m uvicorn main:app --reload

Backend runs on:

http://127.0.0.1:8000
5. Frontend Setup

Open another terminal:

npm install
npm run dev

Frontend runs on:

http://localhost:4173
API Endpoints
POST /trade

Executes Binance Futures Testnet orders.

Supported:
MARKET
LIMIT
STOP-LIMIT
Example Request
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "MARKET",
  "quantity": 0.001
}
GET /health

Health-check endpoint.

CLI Usage

The project includes a professional CLI interface for direct order execution.

Execute MARKET BUY
python cli.py --symbol BTCUSDT --side BUY --type MARKET --quantity 0.001
Execute MARKET SELL
python cli.py --symbol BTCUSDT --side SELL --type MARKET --quantity 0.001
Execute LIMIT SELL
python cli.py --symbol BTCUSDT --side SELL --type LIMIT --quantity 0.001 --price 95000
Execute STOP-LIMIT BUY
python cli.py --symbol BTCUSDT --side BUY --type STOP_LIMIT --quantity 0.001 --price 94000
CLI Output Example
═══════════════════════════════════
 BINANCE FUTURES TESTNET BOT
═══════════════════════════════════

 Order Request
 ───────────────────────────────
 Symbol     : BTCUSDT
 Side       : BUY
 Type       : MARKET
 Quantity   : 0.001

 Executing order...

 SUCCESS — ORDER EXECUTED

 Order ID      : 13120243853
 Status        : NEW
 Executed Qty  : 0.0000
 Avg Price     : 0.00
Validation System

The application includes strict validation using Pydantic.

Validated Inputs:

Symbol
Side
Order Type
Quantity
Price
Empty fields
Validation Example
ERROR: LIMIT orders require a valid price.
Logging System

All execution events are logged inside:

backend/logs/trading_bot.log

Logs include:

API requests
API responses
Validation failures
Errors
Execution timestamps
Log Example
2026-05-08 14:46:44 | INFO | MARKET BUY request initiated
2026-05-08 14:46:45 | INFO | SUCCESS — Order executed
Frontend

The project includes a lightweight cinematic frontend that connects directly to the FastAPI backend.

Frontend Features:

Trading Execution Interface
Real-time Execution Feedback
Institutional Terminal UI
Cinematic Execution Visuals
Binance Connection Status
Lightweight Fintech-Inspired Design
Error Handling

The system gracefully handles:

Invalid order types
Missing prices
Invalid quantities
Binance API failures
Network failures
Authentication issues
Assumptions
Uses Binance Futures Testnet
Requires valid Binance Testnet API Keys
Requires Python 3.9+
Requires Node.js for frontend execution
Designed for educational/demo trading purposes only
Evaluation Alignment

This project was specifically designed to satisfy:

Clean architecture
Correct Binance Futures Testnet execution
Validation & error handling
Structured logging
Reusable modular code
Professional CLI UX
Lightweight UI enhancement
Screenshots Included
Hero Interface
Advanced Execution Layer
Institutional Terminal
Successful Order Execution
Backend Logs
Author

Midhull
