const express = require('express');
const { initWhatsAppClient } = require('./whatsapp-client');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'roshetta-whatsapp-service' });
});

app.post('/send-reminder', async (req, res) => {
  const { phone, message } = req.body;
  res.json({ status: 'queued', phone, message });
});

app.listen(PORT, () => {
  console.log(`WhatsApp Service running on port ${PORT}`);
  initWhatsAppClient();
});
