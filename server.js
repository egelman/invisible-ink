const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Save canvas data
app.post('/save', (req, res) => {
  const { image } = req.body;
  fs.writeFile('canvasData.txt', image, (err) => {
    if (err) {
      console.error('Failed to save canvas data:', err);
      return res.status(500).json({ error: 'Error saving canvas data' });
    }
    res.json({ message: 'Data saved successfully' });
  });
});

// Load canvas data
app.get('/load', (req, res) => {
  fs.readFile('canvasData.txt', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File doesn't exist yet, which is fine for a new setup
        return res.json({ image: null });
      }
      console.error('Failed to load canvas data:', err);
      return res.status(500).json({ error: 'Error loading canvas data' });
    }
    res.json({ image: data });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});