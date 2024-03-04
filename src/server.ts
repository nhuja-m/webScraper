import express, { Request, Response } from 'express';
const puppeteerFunctions = require('./Puppeteer.ts'); // Import your Puppeteer functions

require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 3001; // Backend server port

// Enable CORS for all routes
app.use(cors());

// Body parser middleware, if needed (for POST requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/data', (req, res) => {
  // Logic to fetch and send data
  res.json({ message: "Data fetched successfully" });
});

app.post('/api/store-url', (req, res) => {
  const { url } = req.body;
  
  // Print the URL to the server's console
  console.log('Received URL:', url);

  // Send a response back to the frontend
  res.json({ message: 'URL received and stored successfully', url });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// app.post('/api/visit-url', async (req, res) => {
//   try {
//     const { url } = req.body;

//     // Assuming you have a function that handles the entire scraping process
//     const result = await puppeteerFunctions.scrapeUrl(url); // Replace with your actual function

//     res.json({ message: 'URL visited and scraped successfully', result });
//   } catch (error) {
//     console.error('Error visiting URL:', error);
//     res.status(500).json({ message: 'Error visiting URL', error: error.message });
//   }
// });

app.post('/api/visit-url', async (req: Request, res: Response) => {
  const { url } = req.body;

  try {
    const result = await puppeteerFunctions.scrapeUrl(url);
    res.json({ message: 'URL visited and scraped successfully', result });
  } catch (error) {
    console.error('Error visiting URL:', error);
    res.status(500).json({ message: 'Error visiting URL', error: (error as Error).message });
  }
});