import { useState } from 'react'

function StockCard() {
  const symbol = "AAPL";
  const quantity = 2;
  const purchasePrice = 123.99;
  const currentPrice = 167.15;

  const profitLoss =
    (currentPrice - purchasePrice) * quantity;

  return (
    <div className="card">
      <p>Symbol: {symbol}</p>
      <p>Quantity: {quantity}</p>
      <p>Purchase Price: {purchasePrice}</p>
      <p>Current Price: {currentPrice}</p>

      <p
        style={{
          color: profitLoss > 0 ? "green" : "red"
        }}
      >
        Profit/Loss: {profitLoss.toFixed(2)}
      </p>
    </div>
  );
}

export default StockCard;