//import { useState } from "react";
import "./App.css";
import { useState } from "react";

function FinanceDashboard() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState([]);

  const addStock = () => {
    if (!symbol || !quantity || !price) return;

    const newStock = {
      symbol: symbol.toUpperCase(),
      quantity: Number(quantity),
      price: Number(price),
    };

    setStocks([...stocks, newStock]);

    // reset inputs
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px" }}>
      <h1>Finance Dashboard</h1><br />

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <input
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={addStock}>Add Stock</button>
      </div>

      <h2>Stock List</h2><br />

      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index}>
              {stock.symbol} — {stock.quantity} shares @ ${stock.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FinanceDashboard;
