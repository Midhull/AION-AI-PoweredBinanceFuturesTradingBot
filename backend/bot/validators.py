from pydantic import BaseModel, Field, validator, ValidationError
from typing import Optional, Literal

class OrderSchema(BaseModel):
    symbol: str = Field(..., min_length=1)
    side: Literal["BUY", "SELL"]
    order_type: Literal["MARKET", "LIMIT", "STOP_LIMIT"]
    quantity: float = Field(..., gt=0)
    price: Optional[float] = None
    stopPrice: Optional[float] = None

    @validator("symbol")
    def validate_symbol(cls, v):
        if not v.strip():
            raise ValueError("Symbol cannot be empty.")
        return v.upper()

    @validator("price", always=True)
    def validate_price(cls, v, values):
        order_type = values.get("order_type")
        if order_type == "LIMIT" and (v is None or v <= 0):
            raise ValueError("LIMIT orders require a valid price.")
        return v

    @validator("stopPrice", always=True)
    def validate_stop_price(cls, v, values):
        order_type = values.get("order_type")
        if order_type == "STOP_LIMIT" and (v is None or v <= 0):
            raise ValueError("STOP_LIMIT orders require a valid stop price.")
        return v

def validate_order_input(data: dict):
    try:
        return OrderSchema(**data)
    except ValidationError as e:
        # Return the first clean error message
        error_msg = e.errors()[0]['msg']
        if "value_error." in error_msg:
            error_msg = error_msg.replace("value_error.", "")
        return error_msg
