import { useState } from 'react'
import './App.css'
import ProfitLoss from './ProfitLoss.jsx';

function App() {
  const [stocksymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseprice, setPurchasePrice] = useState("");
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
        stocksymbol={stocksymbol}
        onChange={(e) => setStockSymbol(e.target.stocksymbol)}
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
        purchaseprice={purchaseprice}
        onChange={(e) => setPurchasePrice(e.target.purchaseprice)}
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
