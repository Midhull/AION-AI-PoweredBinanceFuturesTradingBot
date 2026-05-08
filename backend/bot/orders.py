from bot.client import BinanceClient
from bot.logging_config import logger
from binance.enums import *

def execute_futures_order(symbol: str, side: str, order_type: str, quantity: float, price: float = None, stop_price: float = None):
    client = BinanceClient().get_client()
    
    logger.info(f"{order_type} {side} request initiated for {symbol} (Qty: {quantity})")
    
    try:
        params = {
            "symbol": symbol,
            "side": side,
            "type": order_type,
            "quantity": quantity,
        }

        if order_type == "LIMIT":
            params["timeInForce"] = TIME_IN_FORCE_GTC
            params["price"] = price
        elif order_type == "STOP_LIMIT":
            params["timeInForce"] = TIME_IN_FORCE_GTC
            params["price"] = price
            params["stopPrice"] = stop_price

        # Execute order on Binance Futures Testnet
        response = client.futures_create_order(**params)
        
        logger.info(f"SUCCESS — Order {response['orderId']} executed on {symbol}")
        return {
            "success": True,
            "data": {
                "orderId": response["orderId"],
                "status": response["status"],
                "executedQty": response["executedQty"],
                "avgPrice": response.get("avgPrice") or response.get("price"),
                "symbol": response["symbol"],
                "side": response["side"]
            }
        }

    except Exception as e:
        error_msg = str(e)
        logger.error(f"FAILURE — Execution failed: {error_msg}")
        return {
            "success": False,
            "error": error_msg
        }
