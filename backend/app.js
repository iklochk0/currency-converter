const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/currencies', async (req, res) => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
      const data = response.data;
      const currencyList = data.supported_codes.map((currency) => currency[0]);
      res.json(currencyList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/convert', async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.query;
    try {
        const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
        );
        const data = response.data;
        const convertedAmount = data.conversion_result;
        res.json({ convertedAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});