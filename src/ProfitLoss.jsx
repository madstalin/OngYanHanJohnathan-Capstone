import { useState } from 'react'

const ProfitLoss = (props) => {
        const { fromStockSymbol, toStockSymbol  } = props

    return (
        <p>{fromStockSymbol}</p>    
    )

}

export default ProfitLoss
