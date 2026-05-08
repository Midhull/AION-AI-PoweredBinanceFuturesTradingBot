# Binance Futures Testnet Trading Bot

A clean, professional trading bot with a premium lightweight UI, designed for reliable execution on the Binance Futures Testnet.

## Project Goal
To provide a production-quality trading utility that emphasizes correctness, clean architecture, and robust logging.

## Project Structure
```
trading_bot/
├── backend/
│   ├── bot/                 # Modular core logic
│   │   ├── client.py        # Binance Client Singleton
│   │   ├── orders.py        # Order Execution Logic
│   │   ├── validators.py    # Input Validation (Pydantic)
│   │   └── logging_config.py # Professional Logging
│   ├── logs/                # Audit trails
│   ├── cli.py               # CLI Interface
│   └── main.py              # FastAPI Web Interface
├── frontend/                # Cinematic UI
└── README.md
```

## Setup Instructions

1. **Environment Configuration**:
   Create a `.env` file in the `backend/` directory:
   ```env
   BINANCE_API_KEY=your_testnet_api_key
   BINANCE_API_SECRET=your_testnet_api_secret
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

3. **Frontend Setup**:
   ```bash
   npm install
   npm run dev
   ```

## CLI Usage
The bot includes a polished CLI for direct terminal execution.

```bash
# Execute a Market BUY
python cli.py --symbol BTCUSDT --side BUY --type MARKET --quantity 0.001

# Execute a Limit SELL
python cli.py --symbol BTCUSDT --side SELL --type LIMIT --quantity 0.001 --price 95000
```

### CLI Output Example
```text
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

 Order ID      : 123456789
 Status        : FILLED
 Executed Qty  : 0.001
 Avg Price     : 94231.5
```

## Features & Validation
- **Validation**: Strict validation for symbols, sides, quantities, and prices.
- **Error Handling**: Graceful handling of Binance API errors and network failures.
- **Logging**: All events are logged with precise timestamps in `backend/logs/trading_bot.log`.

## Assumptions
- Uses Binance Futures Testnet (testnet.binancefuture.com).
- Requires valid Testnet API keys.
- Requires Python 3.9+ and Node.js for the UI.

---
© 2026 Trading Bot Systems · Production-Oriented Trading Utility
