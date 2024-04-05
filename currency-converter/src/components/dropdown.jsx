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
   
  const isFavoriteCurrencies = (curr) => favoriteCurrencies.includes(curr);

  return (
    <div>
        <label 
          htmlFor= {title}
          className='block text-sm font-medium text-gray-700'>
            {title}
            </label>
    <div className='mt-1 relative'>
        <select value={currentCurrencies} onChange = {(e)=>setCurrencies(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200">
          {favoriteCurrencies.map((currentCurrencies)=>{
            return (
              <option className='bg-gray-300' value={currentCurrencies} key={currentCurrencies}>
              {currentCurrencies}
            </option>
            );
          })}
          <hr />
      {Array.from(new Set(allCurrencies.filter(c => !favoriteCurrencies.includes(c)))).map(currentCurrency => {
           return (
           <option value={currentCurrency} key={currentCurrency}>
             {currentCurrency}
           </option>
            );  
      })}
        </select>
        <button 
        onClick={()=>handleFavoriteCurrencies(currentCurrencies)}
        className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">

          {isFavoriteCurrencies(currentCurrencies) ? <HiStar/> : <HiOutlineStar/>}
        </button>
    </div>
    </div>
  )
}

export default CurrencyDropdown;