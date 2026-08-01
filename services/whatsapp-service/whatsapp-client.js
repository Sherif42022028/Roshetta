const { loadAuthState } = require('./auth-store');

async function initWhatsAppClient() {
  console.log('[WhatsApp Service] Initializing Baileys client with Postgres session...');
  try {
    const authState = await loadAuthState();
    console.log('[WhatsApp Service] Auth state loaded successfully.');
  } catch (err) {
    console.warn('[WhatsApp Service] Initial auth state empty or pending setup.');
  }
}

module.exports = { initWhatsAppClient };
