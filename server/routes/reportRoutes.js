const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); // Mongoose model

router.post('/', async (req, res) => {
  try {
    const { type, imageUrl, lat, lng } = req.body;
    const newReport = new Report({ type, imageUrl, lat, lng });
    await newReport.save();
    res.status(201).json({ message: 'Report saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
