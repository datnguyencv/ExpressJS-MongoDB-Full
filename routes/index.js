// routes/index.js
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const {model} = require("mongoose");

// Home Page - List all products
router.get('/', async (req, res) => {
  try {
    const products = await model('Product').find();
    res.render('index', { products });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create Page - Form to add a new product
router.get('/create', (req, res) => {
  res.render('create');
});

// Save a new product
router.post('/save', async (req, res) => {
    try {
      await model('Product').create(req.body);
      res.redirect('/');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Edit Page - Form to edit a product
router.get('/edit/:id', async (req, res) => {
  try {
    const product = await model('Product').findById(req.params.id);
    res.render('edit', { product });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a product
router.post('/update/:id', async (req, res) => {
  try {
    await model('Product').findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Detail Page - View details of a product
router.get('/detail/:id', async (req, res) => {
  try {
    const product = await model('Product').findById(req.params.id);
    res.render('detail', { product });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a product
router.get('/delete/:id', async (req, res) => {
  try {
    await model('Product').findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
