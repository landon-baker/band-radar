require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const { setupCache } = require('axios-cache-adapter');
const PORT = process.env.PORT || 3000;

const cache = setupCache({
  maxAge: 100000000000000000,
  exclude: { query: false }
});

const axiosInstance = axios.create({
  adapter: cache.adapter
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/events', async (req, res) => {
  try {
    let events = await axiosInstance.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKETMASTER_API_KEY}&locale=*&size=40&page=0&sort=date,asc&source=ticketmaster&classificationName=music&dmaId=222`
    );
    events = events.data._embedded;
    res.status(200).send(events);
  } catch (err) {
    console.log('There was an error with your request', err);
  }
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
