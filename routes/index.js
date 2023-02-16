const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
    res.render('index.hbs');
});

router.get('/about', (req, res) => {
    res.render('About.hbs');
});

router.get('/productos', (req, res) => {
    res.render('productos.hbs');
});

module.exports = router;