// Import the ProfitLoss component.
// This component calculates and displays the profit/loss for a stock.
import ProfitLoss from '../ProfitLoss.jsx'

/*
  StockItem component

  This represents ONE stock inside the stock list.

  It receives a "stock" object as a prop.
  Example of stock object:
  {
    id: 12345,
    symbol: "AAPL",
    quantity: 10,
    purchasePrice: 150,
    currentPrice: 175
  }
*/
function StockItem({ stock }) {

  return (
    /*
      Wrapper div.
      This gives styling (like the grey box) using CSS class "stock-container".
    */
    <div className="stock-container">

      {/*
        We pass the stock data down to ProfitLoss component.

        This is called "passing props".

        Instead of calculating profit here,
        we let ProfitLoss handle that logic.
      */}
      <ProfitLoss
        stocksymbol={stock.symbol}
        quantity={stock.quantity}
        purchasePrice={stock.purchasePrice}
        currentPrice={stock.currentPrice}
      />

    </div>
  )
}

// Export so it can be used in StockList.jsx
export default StockItem
