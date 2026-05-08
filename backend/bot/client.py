import os
from binance.client import Client
from dotenv import load_dotenv
from bot.logging_config import logger

load_dotenv()

class BinanceClient:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BinanceClient, cls).__new__(cls)
            cls._instance._init_client()
        return cls._instance

    def _init_client(self):
        api_key = os.getenv("BINANCE_API_KEY")
        api_secret = os.getenv("BINANCE_API_SECRET")

        if not api_key or not api_secret:
            logger.error("Missing Binance API credentials in .env")
            raise ValueError("API credentials not found.")

        try:
            self.client = Client(api_key, api_secret, testnet=True)
            # Verify connectivity
            self.client.get_server_time()
            logger.info("Successfully connected to Binance Futures Testnet")
        except Exception as e:
            logger.error(f"Failed to connect to Binance: {str(e)}")
            raise e

    def get_client(self) -> Client:
        return self.client
