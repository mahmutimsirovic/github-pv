const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/api/profile/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.get('/api/repos/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
