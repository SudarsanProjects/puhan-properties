const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Set up SQLite database
const dbPath = path.join(__dirname, 'database', 'puhan.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Function to set up the database table
function setupDatabase() {
  const setupQuery = `
    CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mobile TEXT NOT NULL,
        email TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.run(setupQuery, (err) => {
    if (err) {
      console.error('Error setting up the database table:', err.message);
      process.exit(1);
    } else {
      console.log('Database table "enquiries" is ready.');
    }
  });
}
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const { Pool } = require('pg');

// const app = express();
// const port = process.env.PORT || 3000;

// // This will automatically use the DATABASE_URL environment variable on Render
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
// });

// // Function to set up the database table with retry logic
// async function setupDatabase() {
//   const setupQuery = `
//     CREATE TABLE IF NOT EXISTS enquiries (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         mobile TEXT NOT NULL,
//         email TEXT,
//         message TEXT,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );
//   `;
  
//   const maxRetries = 10;
//   const retryDelay = 5000; // 5 seconds

//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       const client = await pool.connect();
//       await client.query(setupQuery);
//       console.log('Database table "enquiries" is ready.');
//       client.release();
//       return; // Success, exit the function
//     } catch (err) {
//       console.error('Error setting up the database (attempt ' + (i + 1) + '):', err.message);
//       if (i < maxRetries - 1) {
//         console.log(`Retrying in ${retryDelay / 1000} seconds...`);
//         await new Promise(res => setTimeout(res, retryDelay));
//       } else {
//         console.error('All database connection attempts failed.');
//         process.exit(1);
//       }
//     }
//   }
// }

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
setupDatabase();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
