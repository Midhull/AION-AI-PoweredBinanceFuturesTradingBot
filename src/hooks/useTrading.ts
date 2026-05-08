import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:8000";
const WS_BASE = "ws://localhost:8000";

export interface TradeRequest {
  symbol: string;
  side: "BUY" | "SELL";
  order_type: "MARKET" | "LIMIT" | "STOP_LIMIT";
  quantity: number;
  price?: number;
  stopPrice?: number;
}

export interface TradeResponse {
  orderId: string;
  status: string;
  executedQty: string;
  avgPrice: string;
  symbol: string;
  side: string;
}

export function useTrading() {
  const [marketData, setMarketData] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // Connect to Market Data
  useEffect(() => {
    // Note: Simple backend doesn't have custom WS streamer, using direct binance public if needed 
    // or just keeping it for UI compatibility if the user didn't ask to remove it.
    // The user asked to keep existing cinematic UI but connect to the simple backend.
    // I'll keep the websocket placeholder for now.
    const ws = new WebSocket(`${WS_BASE}/ws/market`);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMarketData(data);
      } catch (e) {}
    };
    return () => ws.close();
  }, []);

  // Fetch Logs
  const fetchLogs = useCallback(async () => {
    // Simplified backend doesn't expose log API in the requirements, but we'll try if it exists
    // or return a mock for the cinematic feel if necessary.
    // Requirement says: Log execution details in trading_bot.log.
  }, []);

  // Execute Trade
  const executeTrade = async (req: TradeRequest): Promise<TradeResponse> => {
    setIsExecuting(true);
    try {
      const res = await fetch(`${API_BASE}/trade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Execution failed");
      
      return data;
    } finally {
      setIsExecuting(false);
    }
  };

  return { marketData, logs, executeTrade, isExecuting };
}
