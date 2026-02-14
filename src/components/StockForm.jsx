// Import React hook for managing local component state
import { useState } from 'react'

// Import custom hook that gives access to global stock data/functions
import { useStocks } from '../StockContext.jsx'

function StockForm() {

  /*
    Local state for form inputs.
    These store what the user types into the input fields.
  */
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')

  /*
    Get functions and values from StockContext.
    - addStock: function that adds a stock to the global list
    - loading: true while API request is running
  */
  const { addStock, loading } = useStocks()

  /*
    This function runs when the form is submitted.
    It:
    - prevents page refresh
    - validates input
    - calls addStock
  */
  const onSubmit = async (e) => {
    e.preventDefault() // Prevent default browser form refresh

    // Clean up and prepare input values
    const symbol = stockSymbol.trim().toUpperCase()
    const qty = Number(quantity)
    const buy = Number(purchasePrice)

    /*
      Basic validation:
      If something is invalid, just stop.
      (No error message shown here — simple capstone behavior)
    */
    if (!symbol) return
    if (!Number.isFinite(qty) || qty <= 0) return
    if (!Number.isFinite(buy) || buy <= 0) return

    /*
      Call the global addStock function.
      It fetches current price from API.
      If symbol is invalid, it returns false.
    */
    const ok = await addStock({ symbol, quantity: qty, purchasePrice: buy })

    /*
      Only clear the form if the stock was successfully added.
      If invalid symbol, nothing changes.
    */
    if (ok) {
      setStockSymbol('')
      setQuantity('')
      setPurchasePrice('')
    }
  }

  return (
    /*
      The form element.
      onSubmit connects the form to our function above.
    */
    <form className="container" onSubmit={onSubmit}>

      {/* Stock symbol input (text field) */}
      <input
        type="text"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
        placeholder="Stock Symbol (e.g. AAPL)"
        autoComplete="off"
      />

      {/* Quantity input (number field) */}
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        min="1"
      />

      {/* Purchase price input (number field) */}
      <input
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        placeholder="Purchase Price"
        min="0"
        step="0.01"
      />

      {/* Submit button */}
      <button type="submit" disabled={loading}>
        {loading ? 'Fetching…' : 'Add Stock'}
      </button>

    </form>
  )
}

// Export component so it can be used in App.jsx
export default StockForm
