/*
  Import React hooks needed:
  - createContext: let us create a "global store" for data
  - useContext: let components read data from that store
  - useState: stores state (stocks list, loading, error)
  - useCallback: keeps function references stable (performance + avoids re-renders)
  - useMemo: keep an object stable unless its dependencies change
  - useEffect: run code when component mounts/updates
*/
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/*
  Create a Context object.
  Context is used to share data (stocks, functions) with ANY component,
  without passing props through every level.
*/
const StockContext = createContext(null)

/*
  Alpha Vantage API base URL.
  GLOBAL_QUOTE returns current market info including latest price.
*/
const API_URL =
  'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=MJOLQ12HVIHJZUJR'

/*
  Helper function to fetch a stock's current price from Alpha Vantage.
  - symbol: stock ticker like "AAPL", "TSLA"
*/
async function getCurrentPrice(symbol) {
  // Call API endpoint with the symbol
  const res = await fetch(`${API_URL}&symbol=${encodeURIComponent(symbol)}`)
  const data = await res.json()

  /*
    Alpha Vantage sometimes returns "Note" or "Information"
    when you hit their rate limit (too many requests too quickly).
  */
  if (data?.Note || data?.Information) throw new Error('API_LIMIT')

  /*
    Alpha Vantage returns "Error Message" for invalid symbols.
  */
  if (data?.['Error Message']) throw new Error('INVALID_SYMBOL')

  // Pull the price value out of the response object
  const priceStr = data?.['Global Quote']?.['05. price']
  const price = Number(priceStr)

  /*
    If price is missing or invalid, return null.

  */
  if (!Number.isFinite(price) || price <= 0) return null

  return price
}

/*
  StockProvider is a component that "wraps" the app.
  Any child component inside it can access the context values.
*/
export function StockProvider({ children }) {
  /* 
    Global stock list stored here:
    each stock object looks like:
    { id, symbol, quantity, purchasePrice, currentPrice }
  */
  const [stocks, setStocks] = useState([])

  // For showing loading state (disable button, show spinner text, etc.)
  const [loading, setLoading] = useState(false)

  // Store error messages that can be shown in UI
  const [error, setError] = useState('')

  /*
    addStock is a function that:
    - fetches current price
    - creates a stock object
    - saves it into the stocks array

    useCallback keeps the SAME function reference between renders,
    so components that depend on it won't re-render unnecessarily.
  */
  const addStock = useCallback(async ({ symbol, quantity, purchasePrice }) => {
    setError('')      // Clear previous errors
    setLoading(true)  // Turn on loading state

    try {
      // Fetch current price from API
      const currentPrice = await getCurrentPrice(symbol)

      /*
        If API returns no valid price (null), it will show an error.
        This often happens because the API limit was hit or no data is available.
      */
      if (currentPrice === null) {
        setError(
          'No price returned. This is usually API rate limit / no data, not necessarily an invalid symbol. Try again in 30–60s.',
        )
        return false // return value can help the UI know it failed
      }

      // Build a new stock object to store in state
      const newStock = {
        id: Date.now(), // Simple unique id (timestamp)
        symbol,
        quantity,
        purchasePrice,
        currentPrice,
      }

      // Add new stock to the front of the list
      setStocks((prev) => [newStock, ...prev])

      return true
    } catch (err) {
      /*
        Handle different known error types:
        - API_LIMIT: too many requests
        - INVALID_SYMBOL: symbol doesn't exist
        - anything else: generic failure
      */
      if (err?.message === 'API_LIMIT') {
        setError('API limit hit (AlphaVantage). Wait 30–60 seconds and try again.')
      } else if (err?.message === 'INVALID_SYMBOL') {
        setError('Invalid stock symbol.')
      } else {
        setError('Failed to fetch current price. Try again.')
      }

      return false
    } finally {
      // Always stop loading, whether success or failure
      setLoading(false)
    }
  }, [])

  /*
    Clears all stored stocks and errors.
    useCallback again keeps the function reference stable.
  */
  const clearStocks = useCallback(() => {
    setStocks([])
    setError('')
  }, [])

    /*
    Refresh ALL current prices for stocks in the list.

    IMPORTANT ABOUT RATE LIMITS:
    Alpha Vantage free tier is very limited (~5 requests/min).
    If you have many stocks, refreshing can hit the limit.

    This function:
    - loops through your saved stocks
    - fetches latest price for each
    - updates the list with new currentPrice
    - waits between calls to reduce rate-limit hits

    Note: It's still possible to hit the limit if you have many stocks.
  */
  const refreshPrices = useCallback(async () => {
  // Do nothing if there are no stocks
  if (stocks.length === 0) return

  setError('')
  setLoading(true)

  try {
    const updatedStocks = []

    for (const stock of stocks) {
      const price = await getCurrentPrice(stock.symbol)

      updatedStocks.push({
        ...stock,
        // If API fails, keep the old price
        currentPrice: price ?? stock.currentPrice,
      })

      // Small delay to reduce API spam (still not perfect)
      await new Promise((r) => setTimeout(r, 12000))
    }

    setStocks(updatedStocks)
  } catch (err) {
    setError('Failed to refresh prices.')
  } finally {
    setLoading(false)
  }
}, [stocks])

  /*
    useEffect runs when the component first loads (mounts).

    Here it's "OPTIONAL" and currently does nothing because
    Alpha Vantage rate limits are tight.
    The command refreshPrices() is commented out to avoid spamming the API.
  */
  useEffect(() => {
    // don’t auto-refresh repeatedly; AlphaVantage limits are tight
    // refreshPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
    value is the object shared with all components using the context.
    useMemo prevents creating a brand-new object every render,
    which can reduce unnecessary re-renders in consumers.
  */
  const value = useMemo(
    () => ({ stocks, addStock, clearStocks, refreshPrices, loading, error, setError }),
    [stocks, addStock, clearStocks, refreshPrices, loading, error],
  )

  /*
    Provide the context to everything inside <StockProvider>...</StockProvider>
  */
  return <StockContext.Provider value={value}>{children}</StockContext.Provider>
}

/*
  Custom hook for convenience:
  Instead of writing:
    useContext(StockContext)
  everywhere, we can just write:
    useStocks()
*/
export function useStocks() {
  return useContext(StockContext)
}
