const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch and send data
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.nepalipaisa.com/api/GetStockLive'
    );
    const data = response.data.result.stocks;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' }); //git commit -m "Commit message"
  }
});
// Route to serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to serve another page
app.get('/summary', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'summary.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
