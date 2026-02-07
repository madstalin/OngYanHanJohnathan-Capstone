import { useState } from 'react'
import './App.css'
import ProfitLoss from './ProfitLoss.jsx';

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const addStock = () => {
    
  }

  return (
    <>
      <div>
       <h1>Finance Dashboard</h1>
      </div>
      
      <div className="container">
        <input
        type="text"
        stockSymbol={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.stockSymbol)}
        placeholder="Stock Symbol"
        />

      <input
        type="text"
        quantity={quantity}
        onChange={(e) => setQuantity(e.target.quantity)}
        placeholder="Quantity"
        />

       <input
        type="text"
        purchasePrice={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.purchasePrice)}
        placeholder="Purchase Price"
        />

        <button onClick={addStock}>
          Add Stock
        </button>
      </div>
      
      
      <p className="stocklist">
        Stock List
      </p>

      <p className="stock">
        No stocks added yet.
      </p>
    </>
  )
}



export default App
