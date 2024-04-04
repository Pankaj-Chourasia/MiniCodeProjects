import React from 'react'

const CurrencyDropdown = (
    allCurrencies,
    currentCurrencies,
    setCurrencies,
    favoriteCurrencies,
    handleFavoriteCurrencies,
    title = "",
) => {
  return (
    <div>
        <label htmlFor= {title}>{title}</label>
    </div>
  )
}

export default CurrencyDropdown;