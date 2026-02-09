/*
  ProfitLoss component
  - Displays stock details
  - Safely handles cases where the current price is not available yet
*/
function ProfitLoss({ stocksymbol, quantity, purchasePrice, currentPrice }) {
  /*
    Check if currentPrice is a valid number
    This prevents errors while data is still loading
  */
  const hasPrice = Number.isFinite(Number(currentPrice))

  /*
    Calculate profit or loss ONLY if we have a valid price
    Otherwise, default to 0
  */
  const profitLoss = hasPrice
    ? (Number(currentPrice) - Number(purchasePrice)) * Number(quantity)
    : 0

  /*
    Determine if the result is a profit or a loss
    Used to decide text color
  */
  const isProfit = profitLoss >= 0

  return (
    <>
      {/* Stock symbol */}
      <p>
        <strong>Symbol:</strong> {stocksymbol}
      </p>

      {/* Number of shares */}
      <p>
        <strong>Quantity:</strong> {quantity}
      </p>

      {/* Price at which stock was purchased */}
      <p>
        <strong>Purchase Price:</strong> {Number(purchasePrice).toFixed(2)}
      </p>

      {/* 
        Current stock price:
        - Shows price if available
        - Shows "Fetching…" if still loading
      */}
      <p>
        <strong>Current Price:</strong>{' '}
        {hasPrice ? Number(currentPrice).toFixed(2) : 'Fetching…'}
      </p>

      {/* 
        Only show profit/loss once we have a valid price
      */}
      {hasPrice && (
        <p style={{ color: isProfit ? 'green' : 'red', fontWeight: 700 }}>
          Profit/Loss: {profitLoss.toFixed(2)}
        </p>
      )}
    </>
  )
}

// Export component so it can be used in App.jsx
export default ProfitLoss
