const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function loadAuthState() {
  const result = await pool.query("SELECT auth_data FROM whatsapp_auth_state WHERE id = 'singleton'");
  if (result.rows.length > 0) {
    return result.rows[0].auth_data;
  }
  return null;
}

async function saveAuthState(authData) {
  await pool.query(
    `INSERT INTO whatsapp_auth_state (id, auth_data, updated_at)
     VALUES ('singleton', $1, NOW())
     ON CONFLICT (id) DO UPDATE SET auth_data = EXCLUDED.auth_data, updated_at = NOW()`,
    [JSON.stringify(authData)]
  );
}

module.exports = { loadAuthState, saveAuthState };
