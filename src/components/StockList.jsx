// Import custom hook to access global stock data
import { useStocks } from '../StockContext.jsx'

// Import StockItem component (used to display one stock)
import StockItem from './StockItem.jsx'

/*
  StockList component

  This component is responsible for:
  - Showing the "Stock List" heading
  - Showing a message if no stocks exist
  - Displaying all stocks in a list
*/
function StockList() {

  /*
    Get the stocks array from global context.

    stocks is an array like:
    [
      { id: 1, symbol: "AAPL", quantity: 10, ... },
      { id: 2, symbol: "TSLA", quantity: 5, ... }
    ]
  */
  const { stocks } = useStocks()

  return (
    <>
      {/* Title */}
      <p className="stocklist">Stock List</p>

      {/*
        Conditional rendering:

        If there are NO stocks in the array,
        show a message.

        Otherwise, show the list.
      */}
      {stocks.length === 0 ? (

        // Message when list is empty
        <p className="stock">No stocks are available.</p>

      ) : (

        // If stocks exist, display them
        <div className="stock-list">

          {/*
            .map() loops through each stock in the array
            and returns a StockItem component for each one.
          */}
          {stocks.map((s) => (

            /*
              key={s.id} is important in React.
              It helps React track each item efficiently.
            */
            <StockItem key={s.id} stock={s} />

          ))}

        </div>
      )}
    </>
  )
}

// Export component so App.jsx can use it
export default StockList
