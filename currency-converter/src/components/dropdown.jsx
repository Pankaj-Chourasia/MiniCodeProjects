import React from 'react';
import {HiOutlineStar, HiStar} from "react-icons/hi2";

const CurrencyDropdown = ({
    allCurrencies,
    currentCurrencies,
    setCurrencies,
    favoriteCurrencies,
    handleFavoriteCurrencies,
    title = "",
}) => {
  return (
    <div>
        <label 
          htmlFor= {title}
          className='block text-sm font-medium text-gray-700'>
            {title}
            </label>
    <div className='mt-1 relative'>
        <select value={currentCurrencies} onChange = {(e)=>setCurrencies(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200">
          {/* render favoriteCurrencies */}
          <hr />
          {allCurrencies.map((currentCurrencies) => {
            return (
              <option value={currentCurrencies} key={currentCurrencies}>
              {currentCurrencies}
            </option>
            );
          })}
        </select>

        <button 
        onClick={()=>handleFavoriteCurrencies(currentCurrencies)}
        className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">
          <HiOutlineStar />
        </button>
    </div>
    </div>
  )
}

export default CurrencyDropdown;