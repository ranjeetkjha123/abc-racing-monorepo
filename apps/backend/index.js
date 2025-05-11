const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Backend API is running!');
  });
app.get('/api/offline-assets', (req, res) => {
  res.json({
    routes: ['/', '/offline', '/races', '/drivers', '/teams'],
    images: ['/placeholder.svg', '/icons/icon-192x192.png', '/icons/icon-512x512.png']
  });
});

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
