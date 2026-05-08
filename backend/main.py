from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
import json
import asyncio
import websockets
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from bot.orders import execute_futures_order
from bot.validators import validate_order_input

app = FastAPI(title="AION Trading Bot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OrderRequest(BaseModel):
    symbol: str
    side: str
    order_type: str
    quantity: float
    price: Optional[float] = None
    stopPrice: Optional[float] = None

@app.post("/trade")
async def trade(request: OrderRequest):
    # 1. Validate
    validation_result = validate_order_input(request.dict())
    if isinstance(validation_result, str):
        raise HTTPException(status_code=400, detail=validation_result)
    
    # 2. Execute
    result = execute_futures_order(
        symbol=validation_result.symbol,
        side=validation_result.side,
        order_type=validation_result.order_type,
        quantity=validation_result.quantity,
        price=validation_result.price,
        stop_price=validation_result.stopPrice
    )
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result["data"]

@app.get("/health")
async def health():
    return {"status": "operational"}

@app.websocket("/ws/market")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    # Simple relay from Binance public stream to frontend
    uri = "wss://fstream.binance.com/ws/btcusdt@aggTrade"
    try:
        async with websockets.connect(uri) as binance_ws:
            while True:
                data = await binance_ws.recv()
                await websocket.send_text(data)
    except Exception:
        pass
    finally:
        try:
            await websocket.close()
        except:
            pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
