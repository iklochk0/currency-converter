import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendURL = 'http://localhost:4000/api';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${backendURL}/currencies`);
      const data = response.data;
      setCurrencies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConvert = async () => {
    try {
      if (!amount || isNaN(amount)) {
        setConvertedAmount('');
        return;
      }

      const response = await axios.get(
        `${backendURL}/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`
      );
      const data = response.data;
      setConvertedAmount(data.convertedAmount);
    } catch (error) {
      console.error(error);
      setConvertedAmount('');
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor="fromCurrency">From:</label>
        <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies && currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="toCurrency">To:</label>
        <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies && currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount && <p>{`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}</p>}
    </div>
  );
}

export default App;