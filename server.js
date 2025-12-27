const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// This will automatically use the DATABASE_URL environment variable on Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Function to set up the database table
async function setupDatabase() {
  const setupQuery = `
    CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        mobile TEXT NOT NULL,
        email TEXT,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    const client = await pool.connect();
    await client.query(setupQuery);
    console.log('Database table "enquiries" is ready.');
    client.release();
  } catch (err) {
    console.error('Error setting up the database:', err.stack);
    // Exit the process if the database cannot be set up
    process.exit(1);
  }
}

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const pageRoutes = require('./routes/pages');
app.use('/', pageRoutes);

// Start the server after setting up the database
setupDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
