import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import CurrencyDropdown from './dropdown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting ,setConverting] = useState(false);

    const [favoriteCurrencies, setFavoriteCurrencies] = useState(JSON.parse(localStorage.getItem('favoriteCurrencies')) || ["INR", "EUR"]);
    //! currencies ->   https://api.frankfurter.app/currencies 

    const fetchCurrencies = async() => {
        try {
            const res = await fetch(`https://api.frankfurter.app/currencies`);
            const data = await res.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.log("Error fetching :", error);
        }
    }

    useEffect(() => { 
        fetchCurrencies();
    }, []);
    console.log(currencies);

    //! Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
    const convertCurrency = async() => {
        if(!amount) return;
        setConverting(true);

        try {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            const data = await res.json();
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.log("Error fetching :", error);
        }finally { 
            setConverting(false);
        }
    }
    

    const handleFavoriteCurrencies = (currentCurrencies) => {
        let updatedFavorites = [...favoriteCurrencies];

        if(favoriteCurrencies.includes(currentCurrencies)){
            updatedFavorites = favoriteCurrencies.filter((fav) => fav !== currentCurrencies);
        }else {
            updatedFavorites.push(currentCurrencies);
        }
        setFavoriteCurrencies(updatedFavorites);
        localStorage.setItem('favoriteCurrencies', JSON.stringify(updatedFavorites)); 
    }

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
        <CurrencyDropdown 
                    favoriteCurrencies={favoriteCurrencies} 
                    allCurrencies={currencies}
                    title="From"
                    currentCurrencies={fromCurrency}
                    setCurrencies={setFromCurrency}
                    handleFavoriteCurrencies={handleFavoriteCurrencies}
                />
            <div className='flex justify-center -mb-5 sm:mb-0'>
                <button onClick={swapCurrencies} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                    <HiArrowsRightLeft className='text-xl text-gray-700'/>
                </button>
            </div>
            <CurrencyDropdown
                    favoriteCurrencies={favoriteCurrencies} 
                    allCurrencies={currencies}
                    currentCurrencies={toCurrency}
                    setCurrencies={setToCurrency}
                    title="To: "
                    handleFavoriteCurrencies={handleFavoriteCurrencies}
                />
        </div>

        <div className='mt-4'>
            <label htmlFor="amount"  className='block text-sm font-medium text-gray-700'
             >Amount: 
            </label>
            <input
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
            type="number"/>
        </div>

        <div className='flex justify-end mt-6'>
            <button
            onClick={convertCurrency} 
            className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                Convert
            </button>
        </div>

        {convertedAmount && (
        <div className='mt-4 text-lg font-medium text-right text-green-600'>
            Converted Amount: {convertedAmount}
        </div>
        )}
        <div className='flex justify-end mt-5 font-thin text-lg text-orange-500 text-sm'>
            Made by <span className='italic pl-1 font-medium underline underline-offset-4 text-red-500 decoration-green-500'>Pankaj Chourasia</span>
        </div>
    </div>
  )
}

export default CurrencyConverter;