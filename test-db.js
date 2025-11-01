const { Client } = require("pg");

const client = new Client({
  host: "lamyxekexiknbbulbahc.supabase.co",
  port: 5432,
  user: "postgres",
  password: "Guillain360", // or read from process.env.DATABASE_URL / .env.local
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

async function test() {
  try {
    await client.connect();
    console.log("✅ Connected to Supabase!");
    await client.end();
  } catch (err) {
    console.error("❌ Connection error:", err);
    process.exitCode = 1;
  }
}

test();