// Serveur Node.js pour sécuriser les appels à l'API Notion
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const NOTION_API_KEY = "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";
const DATABASE_TASKS_ID = "220597a2d1d7808880b8c12dcbff1185";
const DATABASE_RDV_ID = "220597a2d1d780dab4b0ddac65280823";

app.use(cors());

app.get('/tasks', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_TASKS_ID}/query`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28"
    },
    body: JSON.stringify({
      filter: {
        property: "Échéance",
        date: { on_or_after: today, on_or_before: today }
      }
    })
  });
  const data = await response.json();
  res.json(data);
});

app.get('/rdvs', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_RDV_ID}/query`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28"
    },
    body: JSON.stringify({
      filter: {
        property: "Date et heure",
        date: { on_or_after: today, on_or_before: today }
      }
    })
  });
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`Serveur Notion en écoute sur le port ${PORT}`));
