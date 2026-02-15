// Import CSS styles for the whole app
import './App.css'

// Import logo image from assets folder
//import logo from './assets/Logo.png'

// Import form component (handles adding stocks)
import StockForm from './components/StockForm.jsx'

// Import list component (displays stocks)
import StockList from './components/StockList.jsx'

// Import useStocks to access error
import { useStocks } from './StockContext.jsx'

function App() {
  // Get error from global context
  const { error } = useStocks()

  return (
    <>
      <div className="header">
        <img
          //src={logo}
          //alt="Finance Dashboard Logo"
          //className="logo"
        />
        <h1>Finance Dashboard</h1>
      </div>

      <StockForm />

      {/* THIS DISPLAYS THE ERROR MESSAGE */}
      {error && <p className="error">{error}</p>}

      <StockList />
    </>
  )
}

export default App