/*
  Import React hook for local component state
*/
import { useState } from 'react'

/* App styles */
import './App.css'

/* Component that displays profit/loss for each stock */
import ProfitLoss from './ProfitLoss.jsx'

/*
  Custom hook from StockContext
  Gives access to global stock data and actions
*/
import { useStocks } from './StockContext.jsx'

function App() {
  /* -------- FORM INPUT STATE -------- */
  const [stockSymbol, setStockSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')

  /*
    Pull values and functions from global StockContext
    - stocks: list of all stocks
    - addStock: function to add a stock
    - clearStocks: remove all stocks
    - loading: API loading state
    - error: global error message
    - setError: manually set error message
  */
  const {
    stocks,
    addStock,
    clearStocks,
    refreshPrices,
    loading,
    error,
    setError,
  } = useStocks()

  /*
    Handles form submission
    - Validates input
    - Calls addStock from context
  */
  const onAddStock = async (e) => {
    e.preventDefault() // Prevent page refresh
    setError('')       // Clear previous error

    // Clean and convert form inputs
    const symbol = stockSymbol.trim().toUpperCase()
    const qty = Number(quantity)
    const buy = Number(purchasePrice)

    // Validation checks
    if (!symbol) return setError('Please enter a stock symbol.')
    if (!Number.isFinite(qty) || qty <= 0)
      return setError('Please enter a valid quantity.')
    if (!Number.isFinite(buy) || buy <= 0)
      return setError('Please enter a valid purchase price.')

    /*
      Try adding the stock using context function
      addStock returns true/false based on success
    */
    const ok = await addStock({ symbol, quantity: qty, purchasePrice: buy })

    // If successful, clear the form
    if (ok) {
      setStockSymbol('')
      setQuantity('')
      setPurchasePrice('')
    }
  }

  return (
    <>
      {/* -------- HEADER -------- */}
      <div className="header">
        <img src={logo} alt="Finance Dashboard Logo" className="logo" />
        <h1>Finance Dashboard</h1>
      </div>

      {/* -------- STOCK INPUT FORM -------- */}
      <form className="container" onSubmit={onAddStock}>
        {/* Stock symbol input */}
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          placeholder="Stock Symbol"
          autoComplete="off"
        />

        {/* Quantity input */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          min="1"
        />

        {/* Purchase price input */}
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

        {/* Clear button only appears when stocks exist */}
        {stocks.length > 0 && (
          <button
            type="button"
            className="clear-btn"
            onClick={clearStocks}
          >
            Clear
          </button>
        )}
      </form>

      {/* -------- ERROR MESSAGE -------- */}
      {error && <p className="error">{error}</p>}

      {/* -------- STOCK LIST -------- */}
      <p className="stocklist">Stock List</p>

      {stocks.length === 0 ? (
        <p className="stock">No stocks added yet.</p>
      ) : (
        <div className="stock-list">
          {stocks.map((s) => (
            <div className="stock-container" key={s.id}>
              <ProfitLoss
                stocksymbol={s.symbol}
                quantity={s.quantity}
                purchasePrice={s.purchasePrice}
                currentPrice={s.currentPrice}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
