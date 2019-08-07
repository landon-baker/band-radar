require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const { setupCache } = require('axios-cache-adapter');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const cache = setupCache({
  maxAge: 100000000
});

const axiosInstance = axios.create({
  adapter: cache.adapter
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/example', (req, res) => {
  res.status(200).send('you hit the example route');
});

app.get('/api/events', async (req, res) => {
  try {
    let events = await axiosInstance.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKETMASTER_API_KEY}&locale=*&size=20&page=0&sort=date,asc&classificationName=music&dmaId=222`
    );
    events = events.data._embedded;
    res.status(200).send(events);
  } catch (err) {
    console.log('There was an error with your request', err);
  }
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
