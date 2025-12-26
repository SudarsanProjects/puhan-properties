const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'database.sqlite');

// Home page
router.get('/', (req, res) => {
    res.render('home', { title: 'Puhan Properties - Trusted Property Dealer in Mayur Vihar' });
});

// Buy page
router.get('/buy', (req, res) => {
    res.render('buy', { title: 'Buy Property in Mayur Vihar | Puhan Properties' });
});

// Sell page
router.get('/sell', (req, res) => {
    res.render('sell', { title: 'Sell Property in Mayur Vihar | Puhan Properties' });
});

// Rent page
router.get('/rent', (req, res) => {
    res.render('rent', { title: 'Rent Property in Mayur Vihar | Puhan Properties' });
});

// Areas page
router.get('/areas', (req, res) => {
    res.render('areas', { title: 'Areas We Serve | Mayur Vihar, Ashok Nagar, Pocket 4' });
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us | Puhan Properties', message: null });
});

// Handle contact form submission
router.post('/contact', (req, res) => {
    const { name, mobile, email, message } = req.body;

    if (!name || !mobile) {
        return res.render('contact', { title: 'Contact Us | Puhan Properties', message: 'Name and Mobile are required.' });
    }

    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database', err.message);
            return res.render('contact', { title: 'Contact Us | Puhan Properties', message: 'An error occurred. Please try again later.' });
        }
    });

    const sql = `INSERT INTO enquiries (name, mobile, email, message) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, mobile, email, message], function(err) {
        if (err) {
            console.error('Error inserting data', err.message);
            return res.render('contact', { title: 'Contact Us | Puhan Properties', message: 'An error occurred. Please try again later.' });
        }
        res.render('contact', { title: 'Contact Us | Puhan Properties', message: 'Thank you for your enquiry! We will get back to you soon.' });
    });

    db.close();
});

module.exports = router;
