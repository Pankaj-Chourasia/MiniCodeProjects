import './App.css';
import CurrencyConverter from './components/currency-converter';

function App() {

  return ( 
  <div className='min-h-screen bg-yellow-200 flex flex-col items-center justify-center'>
   <div className='container'>
    <CurrencyConverter />
   </div>
  </div>
  )
}

export default App
