const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// This will automatically use the DATABASE_URL environment variable on Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Home page
router.get('/', (req, res) => {
    res.render('home', { title: 'Puhan Properties - Trusted Property Dealer in Mayur Vihar Phase-1 and New Ashok Nagar' });
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
router.post('/contact', async (req, res) => {
    const { name, mobile, email, message } = req.body;

    if (!name || !mobile) {
        return res.render('contact', { title: 'Contact Us | Puhan Properties', message: 'Name and Mobile are required.' });
    }

    const sql = `INSERT INTO enquiries (name, mobile, email, message) VALUES ($1, $2, $3, $4)`;
    
    try {
        await pool.query(sql, [name, mobile, email, message]);
        res.render('contact', { title: 'Contact Us | Puhan Properties', message: 'Thank you for your enquiry! We will get back to you soon.' });
    } catch (err) {
        console.error('Error inserting data', err.stack);
        res.render('contact', { title: 'Contact Us | Puhan Properties', message: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;
