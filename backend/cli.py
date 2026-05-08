import argparse
import sys
from bot.orders import execute_futures_order
from bot.validators import validate_order_input

def run_cli():
    parser = argparse.ArgumentParser(description="Binance Futures Testnet Trading Bot CLI")
    parser.add_argument("--symbol", type=str, required=True, help="Trading symbol (e.g., BTCUSDT)")
    parser.add_argument("--side", type=str, required=True, choices=["BUY", "SELL"], help="Order side")
    parser.add_argument("--type", type=str, required=True, choices=["MARKET", "LIMIT", "STOP_LIMIT"], help="Order type")
    parser.add_argument("--quantity", type=float, required=True, help="Order quantity")
    parser.add_argument("--price", type=float, help="Limit price (required for LIMIT/STOP_LIMIT)")
    parser.add_argument("--stop-price", type=float, help="Stop price (required for STOP_LIMIT)")

    args = parser.parse_args()

    # Preparation
    print("\n" + "═" * 35)
    print(" BINANCE FUTURES TESTNET BOT")
    print("═" * 35 + "\n")
    print(" Order Request")
    print(" " + "─" * 31)
    print(f" Symbol     : {args.symbol}")
    print(f" Side       : {args.side}")
    print(f" Type       : {args.type}")
    print(f" Quantity   : {args.quantity}")
    if args.price: print(f" Price      : {args.price}")
    if args.stop_price: print(f" Stop Price : {args.stop_price}")
    print("\n Executing order...\n")

    # 1. Validate
    data = {
        "symbol": args.symbol,
        "side": args.side,
        "order_type": args.type,
        "quantity": args.quantity,
        "price": args.price,
        "stopPrice": args.stop_price
    }
    
    validation_result = validate_order_input(data)
    if isinstance(validation_result, str):
        print(f" ERROR: {validation_result}\n")
        sys.exit(1)

    # 2. Execute
    result = execute_futures_order(
        symbol=validation_result.symbol,
        side=validation_result.side,
        order_type=validation_result.order_type,
        quantity=validation_result.quantity,
        price=validation_result.price,
        stop_price=validation_result.stopPrice
    )

    if result["success"]:
        d = result["data"]
        print(" SUCCESS — ORDER EXECUTED\n")
        print(f" Order ID      : {d['orderId']}")
        print(f" Status        : {d['status']}")
        print(f" Executed Qty  : {d['executedQty']}")
        print(f" Avg Price     : {d['avgPrice']}\n")
    else:
        print(f" FAILURE — {result['error']}\n")

if __name__ == "__main__":
    run_cli()
