import { useState } from "react";
//import "./App.css";

function StockForm({ onAddStock }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!symbol || quantity <= 0 || price <= 0) return;

    onAddStock({
      symbol: symbol.toUpperCase(),
      quantity: Number(quantity),
      purchasePrice: Number(price),
    });

    // Reset form
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div>
        <label>Stock Symbol</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="AAPL"
          required
        />
      </div>

      <div>
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
      </div>

      <div>
        <label>Purchase Price ($)</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />
      </div>

      <button type="submit">Add Stock</button>
    </form>
  );
}

export default StockForm;

