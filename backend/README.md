# AION Institutional Backend Core

This is the high-frequency quantitative execution core for the AION Trading Bot. 

## Architecture Overview

The backend is built on a **Decoupled Execution Architecture**, separating the API gateway, the exchange connection, and the execution engine.

- **FastAPI Layer**: High-performance REST and WebSocket endpoints.
- **Execution Engine**: Handles order mapping, exchange routing, and latency tracking.
- **Binance Gateway**: A singleton gateway managing connectivity and server-time synchronization.
- **AI Signal Engine**: Simulates proprietary neural signals for real-time visual feedback.
- **Institutional Logger**: Multi-sink logging system for trading, system, and stream events.

## Directory Structure

```
app/
├── api/          # Route handlers & WS logic
├── core/         # Global config, logging & security
├── models/       # Pydantic data schemas
├── services/     # Engine logic & external clients
└── utils/        # Telemetry & formatters
```

## Setup & Deployment

1. **Environment**:
   Ensure `.env` contains `BINANCE_API_KEY` and `BINANCE_API_SECRET` for the Testnet.

2. **Installation**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Execution**:
   ```bash
   python -m app.main
   ```

## API Specifications

- **POST /api/v1/trade/execute**: Send trade packets to the engine.
- **WS /ws/market**: Real-time market data stream with AI-augmented signals.
- **GET /health**: System diagnostics and uptime.

## Safety & Integrity

- **Validation**: All orders undergo strict Pydantic validation before reaching the engine.
- **Concurrency**: The engine uses asynchronous patterns to prevent blocking during peak market volatility.
- **Logging**: All executions are logged with microsecond precision for post-trade analysis.

---
© 2026 AION SYSTEMS · Institutional Quant Infrastructure
