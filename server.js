const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use Render's port

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

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
